import { IPFSChat__factory } from "./contracts";
import { BigNumber, ethers } from "ethers";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAsyncEffect from "./useAsyncEffect";

export const addresses: Record<string, string> = {
  "31337": "0x1291Be112d480055DaFd8a610b7d1e203891C274",
};
export const ethereum = (window as unknown as { ethereum: any }).ethereum;
export const provider = new ethers.providers.Web3Provider(ethereum);
export const useIPFSChat = () => {
  const chainId = useChainId();
  const ipfsChatAddress = addresses[chainId]
    ? addresses[chainId]
    : addresses["31337"];
  const ipfsChat = useMemo(
    () => IPFSChat__factory.connect(ipfsChatAddress, provider.getSigner()),
    [ipfsChatAddress]
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
    setMessages(
      events
        .map((event) => ({
          from: event.args[0],
          cid: event.args[2],
          blockNumber: event.blockNumber,
        }))
        .sort((a, b) => b.blockNumber - a.blockNumber)
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
      if (_address.toLowerCase() === address.toLowerCase()) {
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
  return useCallback(
    async (to: string, message: string) => {
      const tx = await ipfsChat.sendMessageTo(message, to);
      const receipt = await tx.wait();
      return receipt;
    },
    [ipfsChat]
  );
};
export const useSetPublicKey = () => {
  const ipfsChat = useIPFSChat();
  return useCallback(
    async (publicKey: string) => {
      const tx = await ipfsChat.setPublicKey(publicKey);
      const receipt = await tx.wait();
      return receipt;
    },
    [ipfsChat]
  );
};
export const useGetFeeForRecipient = () => {
  const ipfsChat = useIPFSChat();
  return useCallback(
    async (recipient: string) => {
      return ipfsChat.messagingFeeFor(recipient);
    },
    [ipfsChat]
  );
};
export const useFee = (address: string) => {
  const ipfsChat = useIPFSChat();
  const globalFee = useGlobalFee();
  const globalFeeRef = useRef(BigNumber.from(0));
  globalFeeRef.current = globalFee || BigNumber.from(0);
  const [fee, setFee] = useState<BigNumber>();
  useAsyncEffect(async () => {
    const data = await ipfsChat.messagingFeeFor(address);
    setFee(data);
  }, [address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (_address, _fee, event) => {
      if (_address.toLowerCase() === address.toLowerCase()) {
        setFee((_fee as BigNumber).add(globalFeeRef.current));
      }
    };
    ipfsChat.on("NewMessagingFee", listener);
    return () => {
      ipfsChat.removeListener("NewMessagingFee", listener);
    };
  }, [address, ipfsChat]);
  return fee;
};
export const useMyFee = () => {
  const address = useAccount();
  return useFee(address);
};
export const useGlobalFee = () => {
  const ipfsChat = useIPFSChat();
  const [fee, setFee] = useState<BigNumber>();
  useAsyncEffect(async () => {
    const data = await ipfsChat.globalMessagingFee();
    setFee(data);
  }, []);
  useEffect(() => {
    const listener: ethers.providers.Listener = (_fee, event) => {
      setFee(_fee);
    };
    ipfsChat.on("NewGlobalMessagingFee", listener);
    return () => {
      ipfsChat.removeListener("NewGlobalMessagingFee", listener);
    };
  }, [ipfsChat]);
  return fee;
};
export const useSetFee = () => {
  const ipfsChat = useIPFSChat();
  return useCallback(
    async (newFee: BigNumber) => {
      const tx = await ipfsChat.setMessagingFee(newFee);
      const receipt = await tx.wait();
      return receipt;
    },
    [ipfsChat]
  );
};
export const useSetWhitelistFee = () => {
  const ipfsChat = useIPFSChat();
  return useCallback(
    async (sender: string, newFee: BigNumber) => {
      const tx = await ipfsChat.setWhiteListFee(sender, newFee);
      const receipt = await tx.wait();
      return receipt;
    },
    [ipfsChat]
  );
};
