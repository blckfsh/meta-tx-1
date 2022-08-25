import { Contract, ContractFactory } from 'ethers';
import { ethers } from "hardhat";

import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
// import { ethers } from 'ethers';
import constructorArguments from "../utls/constructor-args";
import { isAddress } from 'ethers/lib/utils';
import dotenv from 'dotenv';

const NAME: string = 'Loy Token';
const SYMBOL: string = 'LOY';

async function main() {
  console.log('Deploying contract...');

  const credentials: any = { apiKey: process.env.RELAYER_API_KEY, apiSecret: process.env.RELAYER_API_SECRET };

  const provider = new DefenderRelayProvider(credentials)
  const relaySigner = new DefenderRelaySigner(credentials, provider, {
    speed: 'fast',
  })

  const Forwarder = await ethers.getContractFactory('MinimalForwarder')
  const forwarder = await Forwarder.connect(relaySigner)
    .deploy()
    .then((f) => f.deployed())

  const Nft: ContractFactory = await ethers.getContractFactory('Nft');

  const nft: Contract = await Nft.deploy(forwarder.address, NAME, SYMBOL);
  await nft.deployed();

  console.log('Forwarder is: ' + forwarder.address);
  console.log('Nft Contract Deployed To: ', nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
