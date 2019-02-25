#!/bin/bash

echo
echo "Goodchar Network end-to-end test"
echo
CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
: ${CHANNEL_NAME:="goodcharchannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="node"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=10

CC_SRC_PATH="github.com/chaincode/goodchar_cc/go/"
if [ "$LANGUAGE" = "node" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/goodchar_cc/node/"
fi

if [ "$LANGUAGE" = "java" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/goodchar_cc/java/"
fi

echo "Channel name : "$CHANNEL_NAME

# import utils
. scripts/utils.sh

createChannel() {
	setGlobals 0 1

	            set -x
		peer channel create -o orderer.goodchar.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx >&log.txt
		res=$?
                set +x
	
	cat log.txt
	verifyResult $res "Channel creation failed"
	echo "===================== Channel '$CHANNEL_NAME' created ===================== "
	echo
}

joinChannel () {
	for org in 1 2 3; do
	    for peer in 0 1; do
		joinChannelWithRetry $peer $org
		echo "===================== peer${peer}.LocalNGO${org} joined channel '$CHANNEL_NAME' ===================== "
		sleep $DELAY
		echo
	    done
	done
}

## Create channel
echo "Creating channel..."
createChannel

## Join all the peers to the channel
echo "Having all peers join the channel..."
joinChannel

## Set the anchor peers for each org in the channel
echo "Updating anchor peers for LocalNGO1..."
updateAnchorPeers 0 1
echo "Updating anchor peers for LocalNGO2..."
updateAnchorPeers 0 2
echo "Updating anchor peers for gc..."
updateAnchorPeers 0 3

## Install chaincode on peer0.LocalNGO1, peer0.LocalNGO2, peer0.gc
echo "Install chaincode on peer0.LocalNGO1..."
installChaincode 0 1
echo "Install chaincode on peer0.LocalNGO2..."
installChaincode 0 2
echo "Install chaincode on peer0.gc..."
installChaincode 0 3

# Instantiate chaincode on peer0.LocalNGO2
echo "Instantiating chaincode on peer0.LocalNGO2..."
instantiateChaincode 0 2

# Query chaincode on peer0.LocalNGO1
echo "Querying chaincode on peer0.LocalNGO1..."
chaincodeQuery 0 1 d1

# Invoke chaincode on peer0.LocalNGO1 and peer0.LocalNGO2
echo "Sending invoke transaction on peer0.LocalNGO1 peer0.LocalNGO2..."
chaincodeInvoke 0 1 0 2

## Install chaincode on peer1.LocalNGO2
echo "Installing chaincode on peer1.LocalNGO2..."
installChaincode 1 2

# Query on chaincode on peer1.LocalNGO2, check if the result is d2
echo "Querying chaincode on peer1.LocalNGO2..."
chaincodeQuery 1 2 d2

echo
echo "========= Goodchar Network execution completed =========== "
echo

exit 0
