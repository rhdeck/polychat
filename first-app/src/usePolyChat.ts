import { PolyChat__factory } from "./contracts";
import { BigNumber, ethers } from "ethers";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAsyncEffect from "./useAsyncEffect";

export const addresses: Record<string, string> = {
  "31337": "0x1291Be112d480055DaFd8a610b7d1e203891C274",
};
export const ethereum = (window as unknown as { ethereum: any }).ethereum;
export const provider = new ethers.providers.Web3Provider(ethereum);
export const usePolyChat = () => {
  const chainId = useChainId();
  const polyChatAddress = addresses[chainId]
    ? addresses[chainId]
    : addresses["31337"];
  const polyChat = useMemo(
    () => PolyChat__factory.connect(polyChatAddress, provider.getSigner()),
    [polyChatAddress]
  );
  return polyChat;
};
export const useMessages = (address: string) => {
  const [messages, setMessages] = useState<
    { from: string; cid: string; blockNumber: number }[]
  >([]);
  const polyChat = usePolyChat();
  useAsyncEffect(async () => {
    const filter = polyChat.filters.Message(undefined, address, undefined);
    const events = await polyChat.queryFilter(filter);
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
    polyChat.on("Message", listener);
    return () => {
      polyChat.removeListener("Message", listener);
    };
  }, [address, polyChat]);
  return messages;
};
export const useMyMessages = () => {
  const address = useAccount();
  return useMessages(address);
};
export const usePublicKey = (address: string) => {
  const polyChat = usePolyChat();
  const [publicKey, setPublicKey] = useState<string>();
  useAsyncEffect(async () => {
    const data = await polyChat.publicKeyOf(address);
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
    polyChat.on("NewPublicKey", listener);
    return () => {
      polyChat.removeListener("NewPublicKey", listener);
    };
  }, [address, polyChat]);
  return publicKey;
};
export const useMyPublicKey = () => {
  const address = useAccount();
  return usePublicKey(address);
};

export const useSendMessage = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (to: string, message: string) => {
      const tx = await polyChat.sendMessageTo(message, to);
      const receipt = await tx.wait();
      return receipt;
    },
    [polyChat]
  );
};
export const useSetPublicKey = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (publicKey: string) => {
      const tx = await polyChat.setPublicKey(publicKey);
      const receipt = await tx.wait();
      return receipt;
    },
    [polyChat]
  );
};
export const useGetFeeForRecipient = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (recipient: string) => {
      return polyChat.messagingFeeFor(recipient);
    },
    [polyChat]
  );
};
export const useFee = (address: string) => {
  const polyChat = usePolyChat();
  const globalFee = useGlobalFee();
  const globalFeeRef = useRef(BigNumber.from(0));
  globalFeeRef.current = globalFee || BigNumber.from(0);
  const [fee, setFee] = useState<BigNumber>();
  useAsyncEffect(async () => {
    const data = await polyChat.messagingFeeFor(address);
    setFee(data);
  }, [address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (_address, _fee, event) => {
      if (_address.toLowerCase() === address.toLowerCase()) {
        setFee((_fee as BigNumber).add(globalFeeRef.current));
      }
    };
    polyChat.on("NewMessagingFee", listener);
    return () => {
      polyChat.removeListener("NewMessagingFee", listener);
    };
  }, [address, polyChat]);
  return fee;
};
export const useMyFee = () => {
  const address = useAccount();
  return useFee(address);
};
export const useGlobalFee = () => {
  const polyChat = usePolyChat();
  const [fee, setFee] = useState<BigNumber>();
  useAsyncEffect(async () => {
    const data = await polyChat.globalMessagingFee();
    setFee(data);
  }, []);
  useEffect(() => {
    const listener: ethers.providers.Listener = (_fee, event) => {
      setFee(_fee);
    };
    polyChat.on("NewGlobalMessagingFee", listener);
    return () => {
      polyChat.removeListener("NewGlobalMessagingFee", listener);
    };
  }, [polyChat]);
  return fee;
};
export const useSetFee = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (newFee: BigNumber) => {
      const tx = await polyChat.setMessagingFee(newFee);
      const receipt = await tx.wait();
      return receipt;
    },
    [polyChat]
  );
};
export const useSetWhitelistFee = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (sender: string, newFee: BigNumber) => {
      const tx = await polyChat.setWhiteListFee(sender, newFee);
      const receipt = await tx.wait();
      return receipt;
    },
    [polyChat]
  );
};
