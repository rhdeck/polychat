import { HardhatUserConfig } from "hardhat/config";
import dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygonMumbai: {
      url: process.env.ALCHEMY_MUMBAI,
      accounts: [process.env.PK || ""],
    },
    polygon:{
      url: process.env.ALCHEMY_POLYGON,
      accounts: [process.env.PK || ""],
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_API || "",
      polygon: process.env.POLYGON_API || "",
    },
  }

};

export default config;
