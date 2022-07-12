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
setIPFSChatAddress("0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1");
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
