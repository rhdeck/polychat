import { Fragment } from "react";
import {
  MetamaskDisconnected,
  MetamaskConnected,
  MetamaskNotInstalled,
} from "@raydeck/usemetamask";
import Disconnected from "./Disconnected";
import GetMetamask from "./GetMetamask";
import Main from "./Main";
import { ToastContainer } from "react-toastify";
import { setIPFSChatAddress } from "./useIPFSChat";
setIPFSChatAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3");
export default function App() {
  return (
    <Fragment>
      <MetamaskNotInstalled>
        <GetMetamask />
      </MetamaskNotInstalled>
      <MetamaskDisconnected>
        <Disconnected />
      </MetamaskDisconnected>
      <MetamaskConnected>
        <Main />
      </MetamaskConnected>
      <ToastContainer />
    </Fragment>
  );
}
