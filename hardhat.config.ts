import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import "@nomicfoundation/hardhat-toolbox";
// import '@openzeppelin/hardhat-defender';
// import  "@openzeppelin/hardhat-upgrades";
import dotenv from 'dotenv';

const EMPTY_PRIVATE_KEY = "0000000000000000000000000000000000000000000000000000000000000000";

dotenv.config();

const {
  ETHERSCAN_API_KEY,
  RINKEBY_PROVIDER_BASE_URL,
  PROVIDER_API_KEY,
  DEPLOYER_PRIVATE_KEY_1,
  RELAYER_API_KEY,
  RELAYER_API_SECRET
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    rinkeby: {
      url: `${RINKEBY_PROVIDER_BASE_URL}${PROVIDER_API_KEY}`,
      accounts: [
        DEPLOYER_PRIVATE_KEY_1 || ""
      ]
    }
  }  
};

export default config;
