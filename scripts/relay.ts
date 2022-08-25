// import { Relayer } from 'defender-relay-client';
// import { Contract, ContractFactory } from 'ethers';
// import { ethers } from "hardhat";
  
import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers';
import { ethers } from 'ethers';
import Nft from "../artifacts/contracts/Nft.sol/Nft.json";

async function run() {
  // const contract: Contract = await ethers.getContractAt(
  //   "Nft",
  //   "0x67e394ACcD2E91101ed1Bf7c912fb05e6fA40D77"
  // );

  // const relayer = new Relayer(
  //   {
  //     apiKey: 'Gt7X79CnUThX8y2Jynr8Tz5Tp6dNUqkq',
  //     apiSecret: 'AWnzhzesdjNajowxcSzq6qirgSt1QZwbZYbFPmCXthVXTUD3mtrWpZvht48g4bMj'
  //   }
  // );

const credentials = { 
  apiKey: 'Gt7X79CnUThX8y2Jynr8Tz5Tp6dNUqkq', 
  apiSecret: 'AWnzhzesdjNajowxcSzq6qirgSt1QZwbZYbFPmCXthVXTUD3mtrWpZvht48g4bMj' 
};

const provider = new DefenderRelayProvider(credentials);
const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });

const contract = new ethers.Contract('0x026D03E69eE36e5868B5ced777ED4cA263aA48ef', Nft.abi, signer);
// const tx = await erc20.transfer(beneficiary, 1e18.toString());
// const mined = await tx.wait();

// console.log(signer);

const tx = await contract.mint('0x1BA8f5D548Bf698d5b33d0BD5628C2EB76253264', 1);
const mined = await tx.wait();

console.log(`${JSON.parse(mined)}`)
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
