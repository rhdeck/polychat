import { wallet_switchEthereumChain } from "@raydeck/metamask-ts";
import { useChainId } from "@raydeck/usemetamask";
import { Fragment } from "react";
import { addresses } from "./usePolyChat";
import Logo from "./logo.png";
const chainNames: Record<number, string> = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  31337: "hardhat",
  137: "Polygon Mainnet",
  80001: "Polygon Mumbai",
};

export default function WrongChain() {
  const chainId = useChainId();
  if (!addresses[parseInt(chainId, 16).toString(10)]) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center align-center bg-gradient-to-r from-pink-600 to-blue-900 ">
        <h1 className="flex flex-row justify-center text-5xl font-extrabold m-5">
          <img src={Logo} className="h-16" />
          <span className="text-purple-300">Poly</span>Chat
        </h1>
        <p className="flex flex-row justify-center text-2xl font-bold m-5 text-purple-300">
          Select to a supported network
        </p>

        {Object.entries(addresses).map(([chainId, address]) => (
          <div className="flex flex-row justify-center">
            <button
              className="bg-black bg-opacity-60 text-white hover:text-gray-200 hover:bg-opacity-80 font-bold py-2 px-4 border-1 rounded-md transition transition-opacity flex items-center justify-center"
              onClick={() => {
                wallet_switchEthereumChain(
                  "0x" + parseInt(chainId, 10).toString(16)
                );
              }}
            >
              Switch to {chainNames[parseInt(chainId)]}
            </button>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
