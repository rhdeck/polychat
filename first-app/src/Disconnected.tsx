import { eth_requestAccounts } from "@raydeck/metamask-ts";
import { FC } from "react";

const Disconnected: FC = () => {
  return (
    <div>
      Metamask is not on this chain!!
      <button
        onClick={async () => {
          const accounts = await eth_requestAccounts();
          console.log("I haz accounts", accounts);
        }}
      >
        Connect to Metamask
      </button>
    </div>
  );
};
export default Disconnected;
