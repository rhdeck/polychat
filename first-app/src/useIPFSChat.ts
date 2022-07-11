import { IPFSChat__factory } from "./contracts";
import { ethers } from "ethers";
import { useAccount } from "@raydeck/usemetamask";
import { useState } from "react";
import useAsyncEffect from "./useAsyncEffect";
let ipfsChatAddress = "0x";
export const setIPFSChatAddress = (address: string) => {
  ipfsChatAddress = address;
};
export const useIPFSChat = () => {
  const ipfsChat = IPFSChat__factory.connect(
    ipfsChatAddress,
    ethers.getDefaultProvider()
  );
  return ipfsChat;
};
export const useMessages = (address: string) => {
  const [messages, setMessages] = useState<{ from: string; cid: string }[]>([]);
  const ipfsChat = useIPFSChat();
  useAsyncEffect(async () => {
    const filter = ipfsChat.filters.Message(undefined, address, undefined);
    const events = await ipfsChat.queryFilter(filter);
    setMessages(
      events.map((event) => ({ from: event.topics[0], cid: event.topics[2] }))
    );
  }, [ipfsChat, address]);
  return messages;
};
export const useMyMessages = () => {
  const address = useAccount();
  return useMessages(address);
};
export const usePublicKey = (address: string) => {
  const ipfsChat = useIPFSChat();
  const [publicKey, setPublicKey] = useState<string>();
  useAsyncEffect(async () => {
    const data = await ipfsChat.publicKeyOf(address);
    setPublicKey(data);
  }, [ipfsChat, address]);
  return publicKey;
};
export const useMyPublicKey = () => {
  const address = useAccount();
  return usePublicKey(address);
};
