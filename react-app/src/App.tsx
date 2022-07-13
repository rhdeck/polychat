import { Fragment, useEffect, useRef } from "react";
import {
  MetamaskDisconnected,
  MetamaskConnected,
  MetamaskNotInstalled,
  useChainId,
} from "@raydeck/usemetamask";
import Disconnected from "./Disconnected";
import GetMetamask from "./GetMetamask";
import Main from "./Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WrongChain from "./WrongChain";

export default function App() {
  const chainIdRef = useRef("");
  const chainId = useChainId();
  useEffect(() => {
    if (chainId) {
      if (!chainIdRef.current) {
        chainIdRef.current = chainId;
      } else {
        window.location.reload();
      }
    }
  }, [chainId]);

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
