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
import "react-toastify/dist/ReactToastify.css";
import WrongChain from "./WrongChain";
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
        <WrongChain />
        <Main />
      </MetamaskConnected>
      <ToastContainer />
    </Fragment>
  );
}
