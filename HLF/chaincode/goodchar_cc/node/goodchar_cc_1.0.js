
'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {

    async Init(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);
        
        let donations = [];
        donations.push({
            campId: 'c1',
            projectId: 'p1',
            volunteerId: 'v1',
            doneeId: 'd1',
            assetId: 'a1',
            doneeScanId: 'scan1'
        });
        donations.push({
            campId: 'c2',
            projectId: 'p2',
            volunteerId: 'v2',
            doneeId: 'd2',
            assetId: 'a2',
            doneeScanId: 'scan2'
        });

        for (let i = 0; i < donations.length; i++) {
            //donations[i].docType = 'donation';
            await stub.putState(donations[i].doneeId, Buffer.from(JSON.stringify(donations[i])));
            console.info('Added <--> ', donations[i]);
        }

        console.info('========= instantiated goodchar chaincode =========');
        return shim.success();
    }

    async Invoke(stub) {
        console.info('Transaction ID: ' + stub.getTxID());
        let ret = stub.getFunctionAndParameters();
        console.info(ret);

        let method = this[ret.fcn];
        if (!method) {
            console.error('no function of name ' + ret.fcn + ' found');
            throw Error('received unknown function ' + ret.fcn + ' invocation');
        }

        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.console.error(err);
        }
    }

    async CreateTransaction(stub, args) {
        let campId = args[0];
        let projectId = args[1];
        let volunteerId = args[2];
        let doneeId = args[3];
        let assetId = args[4];
        let doneeScanId = args[5];

        // Check if donee already exists
        let doneeState = await stub.getState(doneeId);
        if (doneeState.toString()) {
            throw new Error('This donee already exists: ' + doneeId);
        }

        // Create donation object and marshal to JSON
        let donation = {};
        donation.campId = campId;
        donation.projectId = projectId;
        donation.volunteerId = volunteerId;
        donation.assetId = assetId;
        donation.doneeScanId = doneeScanId;

        // Save donee to state
        try {
            await stub.putState(doneeId, Buffer.from(JSON.stringify(donation)));
            console.info(doneeId + ' successfully saved to state DB');
        } catch (err) {
            console.log(err);
        }
    }

    async QueryDonee(stub, args) {
        console.info('Querying Donee with donee id :: ' + args[0]);
        let doneeId = args[0];

        let doneeIdAsBytes = await stub.getState(doneeId); //get the donee ID from chaincode state
        if (!doneeIdAsBytes || doneeIdAsBytes.toString().length <= 0) {
            throw new Error(doneeId + ' does not exist: ');
        }
        console.log(doneeIdAsBytes.toString());
        return doneeIdAsBytes;
    }

};

shim.start(new Chaincode());