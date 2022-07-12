import { ethers } from "hardhat";

async function main() {
  const PolyChat = await ethers.getContractFactory("PolyChat");
  const polyChat = await PolyChat.deploy();
  await polyChat.deployed();
  console.log("contract address is ", polyChat.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
