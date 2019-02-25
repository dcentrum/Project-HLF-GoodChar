#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

# This is a collection of bash functions used by different scripts

ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/goodchar.com/orderers/orderer.goodchar.com/msp/tlscacerts/tlsca.goodchar.com-cert.pem
PEER0_LocalNGO1_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/localngo1.goodchar.com/peers/peer0.localngo1.goodchar.com/tls/ca.crt
PEER0_LocalNGO2_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/localngo2.goodchar.com/peers/peer0.localngo2.goodchar.com/tls/ca.crt
PEER0_gc_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/gc.goodchar.com/peers/peer0.gc.goodchar.com/tls/ca.crt


# verify the result of the end-to-end test
verifyResult() {
  if [ $1 -ne 0 ]; then
    echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
    echo
    exit 1
  fi
}

# Set OrdererOrg.Admin globals
setOrdererGlobals() {
  CORE_PEER_LOCALMSPID="OrdererMSP"
  CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/goodchar.com/orderers/orderer.goodchar.com/msp/tlscacerts/tlsca.goodchar.com-cert.pem
  CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/goodchar.com/users/Admin@goodchar.com/msp
}

setGlobals() {
  PEER=$1
  ORG=$2
  if [ $ORG -eq 1 ]; then
    CORE_PEER_LOCALMSPID="LocalNGO1MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_LocalNGO1_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/localngo1.goodchar.com/users/Admin@localngo1.goodchar.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.localngo1.goodchar.com:7051
    else
      CORE_PEER_ADDRESS=peer1.localngo1.goodchar.com:7051
    fi
  elif [ $ORG -eq 2 ]; then
    CORE_PEER_LOCALMSPID="LocalNGO2MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_LocalNGO2_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/localngo2.goodchar.com/users/Admin@localngo2.goodchar.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.localngo2.goodchar.com:7051
    else
      CORE_PEER_ADDRESS=peer1.localngo2.goodchar.com:7051
    fi

  elif [ $ORG -eq 3 ]; then
    CORE_PEER_LOCALMSPID="gcMSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_gc_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/gc.goodchar.com/users/Admin@gc.goodchar.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.gc.goodchar.com:7051
    else
      CORE_PEER_ADDRESS=peer1.gc.goodchar.com:7051
    fi
  else
    echo "================== ERROR !!! ORG Unknown =================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

updateAnchorPeers() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG

    set -x
    peer channel update -o orderer.goodchar.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/${CORE_PEER_LOCALMSPID}anchors.tx >&log.txt
    res=$?
    set +x
  
  cat log.txt
  verifyResult $res "Anchor peer update failed"
  echo "===================== Anchor peers updated for org '$CORE_PEER_LOCALMSPID' on channel '$CHANNEL_NAME' ===================== "
  sleep $DELAY
  echo
}

## Sometimes Join takes time hence RETRY at least 5 times
joinChannelWithRetry() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG

  set -x
  peer channel join -b $CHANNEL_NAME.block >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.LocalNGO${ORG} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    joinChannelWithRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.LocalNGo${ORG} has failed to join channel '$CHANNEL_NAME' "
}

installChaincode() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG
  VERSION=${3:-1.0}
  set -x
  peer chaincode install -n gccc -v ${VERSION} -l ${LANGUAGE} -p ${CC_SRC_PATH} >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode installation on peer${PEER}.LocalNGO${ORG} has failed"
  echo "===================== Chaincode is installed on peer${PEER}.LocalNGO${ORG} ===================== "
  echo
}

instantiateChaincode() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG
  VERSION=${3:-1.0}

  # while 'peer chaincode' command can get the orderer endpoint from the peer
  # (if join was successful), let's supply it directly as we know it using
  # the "-o" option
    set -x
    peer chaincode instantiate -o orderer.goodchar.com:7050 -C $CHANNEL_NAME -n gccc -l ${LANGUAGE} -v ${VERSION} -c '{"Args":[]}' -P "AND ('LocalNGO1MSP.peer','LocalNGO2MSP.peer','gcMSP.peer')" >&log.txt
    res=$?
    set +x
  
  cat log.txt
  verifyResult $res "Chaincode instantiation on peer${PEER}.LocalNGO${ORG} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode is instantiated on peer${PEER} of 'LocalNGO1', 'LocalNGO2' and 'gc' on channel '$CHANNEL_NAME' ===================== "
  echo
}

upgradeChaincode() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG

  set -x
  peer chaincode upgrade -o orderer.goodchar.com:7050 --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n gccc -v 2.0 -c '{"Args":["init","a","90","b","210"]}' -P "AND ('LocalNGO1MSP.peer','LocalNGO2MSP.peer','gcMSP.peer')"
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode upgrade on peer${PEER}.LocalNGO${ORG} has failed"
  echo "===================== Chaincode is upgraded on peer${PEER}.LocalNGO${ORG} on channel '$CHANNEL_NAME' ===================== "
  echo
}

chaincodeQuery() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG
  EXPECTED_RESULT=$3
  echo "===================== Querying on peer${PEER}.LocalNGO${ORG} on channel '$CHANNEL_NAME'... ===================== "
  local rc=1
  local starttime=$(date +%s)

  # continue to poll
  # we either get a successful response, or reach TIMEOUT
  while
    test "$(($(date +%s) - starttime))" -lt "$TIMEOUT" -a $rc -ne 0
  do
    sleep $DELAY
    echo "Attempting to Query peer${PEER}.LocalNGO${ORG} ...$(($(date +%s) - starttime)) secs"
    set -x
    peer chaincode query -C $CHANNEL_NAME -n gccc -c '{"Args":["QueryDonee","d1"]}' >&log.txt
    #peer chaincode query -C $CHANNEL_NAME -n gccc -c '{"Args":["query","Kumar"]}' >&log.txt
    res=$?
    set +x
    test $res -eq 0 && VALUE=$(cat log.txt | awk '/Query Result/ {print $NF}')

    test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
    # removed the string "Query Result" from peer chaincode query command
    # result. as a result, have to support both options until the change
    # is merged.
    test $rc -ne 0 && VALUE=$(cat log.txt | egrep '^[0-9]+$')
    test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
  done
  echo
  cat log.txt
  if test $res -eq 0; then
    echo "===================== Query successful on peer${PEER}.LocalNGO${ORG} on channel '$CHANNEL_NAME' ===================== "
  else
    echo "!!!!!!!!!!!!!!! Query result on peer${PEER}.LocalNGO${ORG} is INVALID !!!!!!!!!!!!!!!!"
    echo "================== ERROR !!! FAILED to execute End-2-End Scenario =================="
    echo
    exit 1
  fi
}

# fetchChannelConfig <channel_id> <output_json>
# Writes the current channel config for a given channel to a JSON file
fetchChannelConfig() {
  CHANNEL=$1
  OUTPUT=$2

  setOrdererGlobals

  echo "Fetching the most recent configuration block for the channel"
    set -x
    peer channel fetch config config_block.pb -o orderer.goodchar.com:7050 -c $CHANNEL --cafile $ORDERER_CA
    set +x
  
  echo "Decoding config block to JSON and isolating config to ${OUTPUT}"
  set -x
  configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config >"${OUTPUT}"
  set +x
}

# signConfigtxAsPeerOrg <org> <configtx.pb>
# Set the peerOrg admin of an org and signing the config update
signConfigtxAsPeerOrg() {
  PEERORG=$1
  TX=$2
  setGlobals 0 $PEERORG
  set -x
  peer channel signconfigtx -f "${TX}"
  set +x
}

# createConfigUpdate <channel_id> <original_config.json> <modified_config.json> <output.pb>
# Takes an original and modified config, and produces the config update tx
# which transitions between the two
createConfigUpdate() {
  CHANNEL=$1
  ORIGINAL=$2
  MODIFIED=$3
  OUTPUT=$4

  set -x
  configtxlator proto_encode --input "${ORIGINAL}" --type common.Config >original_config.pb
  configtxlator proto_encode --input "${MODIFIED}" --type common.Config >modified_config.pb
  configtxlator compute_update --channel_id "${CHANNEL}" --original original_config.pb --updated modified_config.pb >config_update.pb
  configtxlator proto_decode --input config_update.pb --type common.ConfigUpdate >config_update.json
  echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . >config_update_in_envelope.json
  configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope >"${OUTPUT}"
  set +x
}

# parsePeerConnectionParameters $@
# Helper function that takes the parameters from a chaincode operation
# (e.g. invoke, query, instantiate) and checks for an even number of
# peers and associated org, then sets $PEER_CONN_PARMS and $PEERS
parsePeerConnectionParameters() {
  # check for uneven number of peer and org parameters
  if [ $(($# % 2)) -ne 0 ]; then
    exit 1
  fi

  PEER_CONN_PARMS=""
  PEERS=""
  while [ "$#" -gt 0 ]; do
    PEER="peer$1.localngo$2"
    PEERS="$PEERS $PEER"
    PEER_CONN_PARMS="$PEER_CONN_PARMS --peerAddresses $PEER.goodchar.com:7051"
    if [ -z "$CORE_PEER_TLS_ENABLED" -o "$CORE_PEER_TLS_ENABLED" = "true" ]; then
      TLSINFO=$(eval echo "--tlsRootCertFiles \$PEER$1_LocalNGO$2_CA")
      PEER_CONN_PARMS="$PEER_CONN_PARMS $TLSINFO"
      echo "$TLSINFO"
    fi
    # shift by two to get the next pair of peer/org parameters
    shift
    shift
  done
  # remove leading space for output
  PEERS="$(echo -e "$PEERS" | sed -e 's/^[[:space:]]*//')"
}

# chaincodeInvoke <peer> <org> ...
# Accepts as many peer/org pairs as desired and requests endorsement from each
chaincodeInvoke() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and org parameters "

  # while 'peer chaincode' command can get the orderer endpoint from the
  # peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  echo "$PEER_CONN_PARMS"
  
  echo
    set -x
    peer chaincode invoke -o orderer.goodchar.com:7050 -C $CHANNEL_NAME -n gccc $PEER_CONN_PARMS -c '{"Args":["CreateTransaction","c3","p3","v3","d3","a3","scan3"]}' >&log.txt
    res=$?
    set +x
  
  cat log.txt
  verifyResult $res "Invoke execution on $PEERS failed "
  echo "===================== Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME' ===================== "
  echo
}
