import { eth_getEncryptionPublicKey } from "@raydeck/metamask-ts";
import { useAccount } from "@raydeck/usemetamask";
import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { decrypt, encrypt } from "./crypt";
import copy from "clipboard-copy";
const Home: FC = () => {
  const account = useAccount();
  const [publicKey, setPublicKey] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const generatePublicKey = useCallback(async () => {
    const publicKey = await eth_getEncryptionPublicKey(account);
    setPublicKey(publicKey);
  }, [account]);
  const [text, setText] = useState("");
  return (
    <div className="bg-red-500">
      <p>My account is {account}.</p>
      <Link className="App-link" to="/about">
        Learn More
      </Link>
      <button onClick={generatePublicKey}>Generate a public key</button>
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
export default Home;
