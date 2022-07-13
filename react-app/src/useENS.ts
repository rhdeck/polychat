import { ethers } from "ethers";
import { EnsProvider } from "@ethersproject/providers";
import { useCallback, useState } from "react";

export const ethereum = (window as unknown as { ethereum: any }).ethereum;
let _provider: EnsProvider = ethers.getDefaultProvider("mainnet");
export const getProvider = () => _provider;
export const setProvider = (provider: EnsProvider) => {
  _provider = provider;
};
export const useENS = (provider?: EnsProvider) => {
  const _provider = provider || getProvider();
  if (!_provider)
    throw new Error(
      "useENS requires a valid ENS-compatible (e.g. mainnet) provider"
    );
  const [knownNames, setKnownNames] = useState<Record<string, string | null>>(
    {}
  );
  const [knownAvatars, setKnownAvatars] = useState<
    Record<string, string | null>
  >({});
  const testName = useCallback(
    async (name: string) => {
      name = name.toLowerCase();
      if (knownNames[name]) return knownNames[name];
      if (name.endsWith(".eth")) {
        // const address = await _provider.resolveName(name);
        const resolver = await _provider.getResolver(name);
        if (resolver) {
          const address = await resolver.getAddress();
          console.log("I would update knownnames with ", name, address);
          setKnownNames((oldList) => ({ ...oldList, [name]: address }));
          //@TODO add support for avatars
          return address;
        }
      }
      return undefined;
    },
    [provider]
  );
  return {
    testName,
    knownNames,
    // knownAvatars
  };
};
