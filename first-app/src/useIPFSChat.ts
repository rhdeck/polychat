import { IPFSChat__factory } from "./contracts";
import { ethers } from "ethers";
import { useAccount } from "@raydeck/usemetamask";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAsyncEffect from "./useAsyncEffect";
let ipfsChatAddress = "0x";
export const setIPFSChatAddress = (address: string) => {
  ipfsChatAddress = address;
};
const ethereum = (window as unknown as { ethereum: any }).ethereum;
// export { ethereum } from "@raydeck/metamask-ts";
export const useIPFSChat = () => {
  const ipfsChat = useMemo(
    () =>
      IPFSChat__factory.connect(
        ipfsChatAddress,
        new ethers.providers.Web3Provider(ethereum).getSigner()
        // new ethers.providers.AlchemyProvider(
        //   undefined,
        //   "9JQtGHY92X8gSWdkMMmAS_nL0aB31bO-"
        // )
        // new ethers.providers.Web3Provider((window as any).ethereum as any, "any")
      ),
    []
  );
  return ipfsChat;
};
export const useMessages = (address: string) => {
  const [messages, setMessages] = useState<
    { from: string; cid: string; blockNumber: number }[]
  >([]);
  const ipfsChat = useIPFSChat();
  useAsyncEffect(async () => {
    const filter = ipfsChat.filters.Message(undefined, address, undefined);
    const events = await ipfsChat.queryFilter(filter);
    console.log("I have events", events);
    setMessages(
      events.map((event) => ({
        from: event.args[0],
        cid: event.args[2],
        blockNumber: event.blockNumber,
      }))
    );
  }, [address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (from, to, cid, event) => {
      if (to.toLowerCase() === address.toLowerCase) {
        setMessages((messages) => [
          ...messages,
          { from, cid, blockNumber: event.blockNumber },
        ]);
      }
    };
    ipfsChat.on("Message", listener);
    return () => {
      ipfsChat.removeListener("Message", listener);
    };
  }, [address, ipfsChat]);
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
  }, [address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (
      _address,
      _publicKey,
      event
    ) => {
      console.log("My event is", _address, _publicKey, event);
      console.log(
        "Comparing ",
        { _address, address },
        _address.toLowerCase() == address.toLowerCase()
      );
      if (_address.toLowerCase() == address.toLowerCase()) {
        console.log("Setting public key to ", _publicKey);
        setPublicKey(_publicKey);
      }
    };
    ipfsChat.on("NewPublicKey", listener);
    return () => {
      ipfsChat.removeListener("NewPublicKey", listener);
    };
  }, [address, ipfsChat]);
  return publicKey;
};
export const useMyPublicKey = () => {
  const address = useAccount();
  return usePublicKey(address);
};

export const useSendMessage = () => {
  const ipfsChat = useIPFSChat();
  return useCallback(async (to: string, message: string) => {
    const tx = await ipfsChat.sendMessageTo(message, to);
    const receipt = await tx.wait();
    return receipt;
  }, []);
};
export const useSetPublicKey = () => {
  const ipfsChat = useIPFSChat();
  return useCallback(async (publicKey: string) => {
    const tx = await ipfsChat.setPublicKey(publicKey);
    const receipt = await tx.wait();
    return receipt;
  }, []);
};
