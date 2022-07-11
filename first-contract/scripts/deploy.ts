import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";

async function main() {
  console.log(hre.ethers)
  const contract = await hre.ethers.getContractFactory("IPFS_Chat");
  const Contract = await contract.deploy();
  await Contract.deployed();
  console.log("contract address is ", Contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
