import { eth_requestAccounts } from "@raydeck/metamask-ts";
import { FC } from "react";

const Disconnected: FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center align-center bg-gradient-to-r from-pink-600 to-blue-900 ">
      <div className="flex flex-row justify-center">
        <button
          className="bg-black text-white hover:text-gray-200 hover:bg-opacity-80 font-bold py-2 px-4 border-2 rounded-md transition transition-opacity flex items-center justify-center"
          onClick={async () => {
            const accounts = await eth_requestAccounts();
            console.log("I haz accounts", accounts);
          }}
        >
          Connect to Metamask
        </button>
      </div>
    </div>
  );
};
export default Disconnected;
