import { ethers } from "hardhat";

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = ethers.utils.parseEther("1");
  const [sender_1, recepient_1] = await ethers.getSigners();
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();

  await lock.deployed();
  console.log("contract address is ", lock.address);

  const addPublicKey = async()=>{
  const adding_key =  await lock.connect(recepient_1).setPublicKey("0x0");
  const adding_key_receipt = await adding_key.wait();
  // console.log("adding public key", adding_key);
  }
  await addPublicKey();

  const sendMessage = async (message: string, address: string) => {
  
    return lock.connect(sender_1).sendMessageTo(message, address);
  }
  const msg_txn = await sendMessage("hello", recepient_1.address);
  const receipt =  await msg_txn.wait();
  // console.log("receipt is ", receipt);
  // console.log("Lock with 1 ETH deployed to:", lock.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
