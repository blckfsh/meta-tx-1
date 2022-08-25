import { CreateRelayerRequest, RelayClient } from 'defender-relay-client';
// import { ethers, OpenzeppelinDefender } from "hardhat";
import dotenv from 'dotenv';

async function run() {
    dotenv.config();
    console.log("Creating Relayer ID...");
    const credentials: any = { apiKey: process.env.RELAYER_API_KEY, apiSecret: process.env.RELAYER_API_SECRET };    
    // const provider = new DefenderRelayProvider(credentials);
    // const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

    const relayClient = new RelayClient(credentials);

    // create relay using defender client
    const requestParams: CreateRelayerRequest = {
        name: 'Rinkeby 1',
        network: 'rinkeby',
        minBalance: BigInt(1e17).toString()
        // policies: {
        //     whitelistReceivers: ['0x1BA8f5D548Bf698d5b33d0BD5628C2EB76253264'],
        // },
    };    

    // const {address:addressRelay} = await OpenzeppelinDefender.RelayClient.create(requestParams);

    // console.log(addressRelay);

    // console.log(await relayClient);
    const relayer = await relayClient.create(requestParams);

    console.log('Relayer ID: ', relayer.relayerId);

    // console.log(await relayClient.list());
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

