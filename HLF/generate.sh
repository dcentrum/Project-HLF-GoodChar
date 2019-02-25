#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}
export VERBOSE=false



function generateCerts() {
  which cryptogen
  if [ "$?" -ne 0 ]; then
    echo "cryptogen tool not found. exiting"
    exit 1
  fi
  echo
  echo "##########################################################"
  echo "##### Generate certificates using cryptogen tool #########"
  echo "##########################################################"

  if [ -d "crypto-config" ]; then
    rm -Rf crypto-config
  fi
  set -x
  cryptogen generate --config=./crypto-config.yaml
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate certificates..."
    exit 1
  fi
  echo
}

# Generate orderer genesis block, channel configuration transaction and
# anchor peer update transactions
function generateChannelArtifacts() {
  which configtxgen
  if [ "$?" -ne 0 ]; then
    echo "configtxgen tool not found. exiting"
    exit 1
  fi

  echo "##########################################################"
  echo "#########  Generating Orderer Genesis block ##############"
  echo "##########################################################"
  # Note: For some unknown reason (at least for now) the block file can't be
  # named orderer.genesis.block or the orderer will fail to launch!
  set -x
  configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate orderer genesis block..."
    exit 1
  fi
  echo
  echo "#################################################################"
  echo "### Generating channel configuration transaction 'channel.tx' ###"
  echo "#################################################################"
  set -x
  configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate channel configuration transaction..."
    exit 1
  fi

  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for LocalNGO1MSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/LocalNGO1MSPanchors.tx -channelID $CHANNEL_NAME -asOrg LocalNGO1MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for LocalNGO1MSP..."
    exit 1
  fi

  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for LocalNGO2MSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate \
    ./channel-artifacts/LocalNGO2MSPanchors.tx -channelID $CHANNEL_NAME -asOrg LocalNGO2MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for LocalNGO2MSP..."
    exit 1
  fi

  echo
  echo "#################################################################"
  echo "#######    Generating anchor peer update for gcMSP   ##########"
  echo "#################################################################"
  set -x
  configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate \
    ./channel-artifacts/gcMSPanchors.tx -channelID $CHANNEL_NAME -asOrg gcMSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for gcMSP..."
    exit 1
  fi

  echo
}
  
# Obtain the OS and Architecture string that will be used to select the correct
# native binaries for your platform, e.g., darwin-amd64 or linux-amd64
OS_ARCH=$(echo "$(uname -s | tr '[:upper:]' '[:lower:]' | sed 's/mingw64_nt.*/windows/')-$(uname -m | sed 's/x86_64/amd64/g')" | awk '{print tolower($0)}')
# timeout duration - the duration the CLI should wait for a response from
# another container before giving up
CLI_TIMEOUT=10
# default for delay between commands
CLI_DELAY=3
# channel name defaults to "goodcharchannel"
CHANNEL_NAME="goodcharchannel"
# use this as the default docker-compose yaml definition
COMPOSE_FILE=docker-compose-cli.yaml
#
COMPOSE_FILE_COUCH=docker-compose-couch.yaml

# use golang as the default language for chaincode
LANGUAGE=node
# default image tag
IMAGETAG="1.3.0"

  generateCerts
  replacePrivateKey
  generateChannelArtifacts


