import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
// import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import {
  MetamaskDisconnected,
  MetamaskConnected,
  MetamaskNotInstalled,
  useAccount,
} from "@raydeck/usemetamask";
import {
  eth_decrypt,
  eth_getEncryptionPublicKey,
  eth_requestAccounts,
} from "@raydeck/metamask-ts";
import { encryptSafely } from "@metamask/eth-sig-util";
import copy from "clipboard-copy";
// import { Buffer } from "buffer";
console.log(Buffer);
function App() {
  return (
    <Fragment>
      <MetamaskNotInstalled>Metamask is not installed!!!</MetamaskNotInstalled>
      <MetamaskDisconnected>
        Metamask is not on this chain!!
        <button
          onClick={async () => {
            const accounts = await eth_requestAccounts();
            console.log("I haz accounts", accounts);
          }}
        >
          Connect to Metamask
        </button>
      </MetamaskDisconnected>
      <MetamaskConnected>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </MetamaskConnected>
    </Fragment>
  );
}
const Home = () => {
  const account = useAccount();
  const [publicKey, setPublicKey] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  useEffect(() => {
    (async () => {
      const publicKey = await eth_getEncryptionPublicKey(account);
      setPublicKey(publicKey);
    })();
  }, [account]);
  const [text, setText] = React.useState("");
  return (
    <div className="bg-red-500">
      <img src={logo} className="animate-spin" alt="logo" />
      <p>My account is {account}.</p>
      <Link className="App-link" to="/about">
        Learn More
      </Link>
      <p>My public key is {publicKey}</p>
      <textarea
        className="font-sm rounded-md border-2 border-blue-900 block "
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        className="bg-blue-500 p-2 rounded-md border-2 border-blue-900"
        onClick={() => {
          console.log(text);
          const data = Buffer.from(text).toString("base64");
          const enc = encryptSafely({
            publicKey,
            data,
            version: "x25519-xsalsa20-poly1305",
          });
          console.log("mny enc is ", enc);
          const buf = Buffer.concat([
            Buffer.from(enc.ephemPublicKey, "base64"),
            Buffer.from(enc.nonce, "base64"),
            Buffer.from(enc.ciphertext, "base64"),
          ]);
          setCipherText(buf.toString("base64"));
        }}
      >
        CHeck me out!!
      </button>
      <p onClick={() => copy(cipherText)}>Ciphertext is {cipherText}</p>
      <textarea
        onChange={(e) => setEncryptedText(e.target.value)}
        value={encryptedText}
      />
      <button
        onClick={async () => {
          console.log("ciphertext", encryptedText);
          const data = Buffer.from(encryptedText, "base64");
          const structuredData = {
            version: "x25519-xsalsa20-poly1305",
            ephemPublicKey: data.slice(0, 32).toString("base64"),
            nonce: data.slice(32, 56).toString("base64"),
            ciphertext: data.slice(56).toString("base64"),
          };
          const json = JSON.stringify(structuredData);
          const jsonBuf = Buffer.from(json, "utf8");
          const ct = "0x" + jsonBuf.toString("hex");
          const clearText = await eth_decrypt(ct, account);
          console.log("clear text is ", clearText);
          const obj: { data: string; padding?: string } = JSON.parse(clearText);
          const sourceText = Buffer.from(obj.data, "base64").toString("utf8");
          console.log("source text was", sourceText);
        }}
      >
        Decrypt
      </button>
    </div>
  );
};
const About = () => {
  return (
    <div>
      this is what i am about <Link to="/">Back to Home</Link>
    </div>
  );
};

export default App;
