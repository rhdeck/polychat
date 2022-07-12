import { ethers } from "hardhat";

async function main() {
  const IPFSChat = await ethers.getContractFactory("IPFSChat");
  const ipfsChat = await IPFSChat.deploy();
  await ipfsChat.deployed();
  console.log("contract address is ", ipfsChat.address);

  // const [sender_1, recipient_1] = await ethers.getSigners();
  // const adding_key = await ipfsChat.connect(recipient_1).setPublicKey("0x0");
  // const adding_key_receipt = await adding_key.wait();
  // const message = "hello there";
  // const msg_txn = await ipfsChat
  //   .connect(sender_1)
  //   .sendMessageTo(message, recipient_1.address);
  // const receipt = await msg_txn.wait();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
