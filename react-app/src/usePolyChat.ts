import { PolyChat__factory } from "./contracts";
import { BigNumber, ethers } from "ethers";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAsyncEffect from "./useAsyncEffect";

export const addresses: Record<string, string> = {
  // "1337": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  "80001": "0x48e10f8a98152b46e552961aCf5B7A1B67504D29",
  "137": "0xFD17de2f833d59646a3263cbdA2Ea5bba4CD60E4",
};
export const ethereum = (window as unknown as { ethereum: any }).ethereum;
export const provider = ethereum
  ? new ethers.providers.Web3Provider(ethereum)
  : undefined;
export const usePolyChat = () => {
  const chainId = useChainId();
  const chainIdDec = parseInt(chainId, 16).toString(10);
  const polyChatAddress = addresses[chainIdDec]
    ? addresses[chainIdDec]
    : addresses["137"];
  const polyChat = useMemo(
    () =>
      provider &&
      PolyChat__factory.connect(polyChatAddress, provider.getSigner()),
    [polyChatAddress]
  );

  if (!polyChat) throw new Error("polyChat is not defined");
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
    const publicKey = ethers.utils.base64.encode(data);
    setPublicKey(publicKey);
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
      return tx;
      // const receipt = await tx.wait();
      // return receipt;
    },
    [polyChat]
  );
};
export const useSetPublicKey = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (publicKey: string) => {
      const bytes = ethers.utils.base64.decode(publicKey);
      const decodedPublicKey = ethers.utils.hexlify(bytes);
      const tx = await polyChat.setPublicKey(decodedPublicKey);
      return tx;
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
      return tx;
      // const receipt = await tx.wait();
      // return receipt;
    },
    [polyChat]
  );
};
export const useSetWhitelistFee = () => {
  const polyChat = usePolyChat();
  return useCallback(
    async (sender: string, newFee: BigNumber) => {
      const tx = await polyChat.setWhiteListFee(sender, newFee);
      return tx;
      // const receipt = await tx.wait();
      // return receipt;
    },
    [polyChat]
  );
};
export const useWhiteListSenders = (address: string) => {
  const polyChat = usePolyChat();
  const [senders, setSenders] = useState<Record<string, BigNumber>>({});
  useAsyncEffect(async () => {
    let key = "";
    let index = 0;
    do {
      key = await polyChat.messagingFeeSenders(address, index);
      const data = await polyChat.messagingFeeFor(key);
      const _key = key;
      setSenders((oldData) => ({ ...oldData, [_key]: data }));
      index++;
    } while (key);
  }, [polyChat, address]);
  useEffect(() => {
    const listener: ethers.providers.Listener = (_to, _from, _fee, event) => {
      if (_to.toLowerCase() == address.toLowerCase()) {
        setSenders((oldData) => ({ ...oldData, [_from]: _fee }));
      }
    };
    polyChat.on("NewWhitelistMessagingFee", listener);
    return () => {
      polyChat.removeListener("NewWhitelistMessagingFee", listener);
    };
  }, [polyChat, address]);
  return senders;
};
export const useMyWhitelistSenders = () => {
  const address = useAccount();
  return useWhiteListSenders(address);
};
