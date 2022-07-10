import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";
import { Link, Routes, Route } from "react-router-dom";
import {
  MetamaskDisconnected,
  MetamaskConnected,
  MetamaskNotInstalled,
  useAccount,
} from "@raydeck/usemetamask";
import {
  eth_getEncryptionPublicKey,
  eth_requestAccounts,
} from "@raydeck/metamask-ts";
import { encrypt, decrypt } from "./crypt";
import copy from "clipboard-copy";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
  const [decryptedText, setDecryptedText] = useState("");
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
          const data = Buffer.from(text);
          const buf = encrypt(data, publicKey);
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
          const out = await decrypt(data, account);
          const sourceText = out.toString("utf8");
          setDecryptedText(sourceText);
        }}
      >
        Decrypt
      </button>
      <p>Decrypted text is {decryptedText}</p>
    </div>
  );
};
const About = () => {
  const [text, setText] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });
  return (
    <div>
      this is what i am about <Link to="/">Back to Home</Link>
      <ReactQuill
        theme="snow"
        defaultValue={"Hello there"}
        onChange={setText}
      />
      <div>{text}</div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default App;
