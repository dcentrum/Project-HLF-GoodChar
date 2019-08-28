# Project-HLF-GoodChar
GoodChar: Track every penny/asset at the last mile digitally and record the donated asset transactions immutably by using HyperLedger Fabric functionalities.
Main features which we have are:
1. Get consensus from the donee(needy person) through BioMetric, QR Code scan and computer vision and save the metadata info on CouchDB by getting consensus from the StakeHolders involved.
2. Transaction of every donated Asset recorded immutably
3. Consortium of the NGO’s to be formed for a Charity Network'
Check out Goodchar.pdf for more info.

HLF folder contains the GoodChar Fabric Network
Middleware folder contains the files which EnrollUsers, SetPermissions and sets permissions.
goodchar-mw conatins the API Router which routes the request to the required Backend blockchain network.

Steps to Start the Goodchar Network
1. Install HyperLedger Fabric 1.3 version by following the guidelines given in the following getting started link https://hyperledger-fabric.readthedocs.io/en/release-1.3/getting_started.html
2. Add fabric-samples\bin to PATH variable
    sample command below, but varies based on user name and OS where fabric-samples is installed:
    PATH=/Users/<UserName>/fabric-samples/bin:$PATH:.
3. Clone the GoodChar Github project.
4. Navigate to HLF folder and run the bash command "./start.sh" in the terminal
5. Navigate to Middleware folder and run the below commands in the terminal
    1. npm install
    2. node enrolladmin.js
    3. node registeruser.js


