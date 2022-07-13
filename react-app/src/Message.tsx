import { useAccount } from "@raydeck/usemetamask";
import { FC, useEffect, useState } from "react";
import { decrypt } from "./crypt";
import { useIPFS } from "./useIPFS";
import { SanitizeHTML } from "./Sanitize";
import { ethers } from "ethers";
import useAsyncEffect from "./useAsyncEffect";
import copy from "clipboard-copy";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ethereum, provider } from "./usePolyChat";
const Message: FC<{
  ipfsPath: string;
  blockNumber: number;
  from: string;
  publicKey: string;
}> = ({ ipfsPath, blockNumber, from, publicKey }) => {
  const [ens, setEns] = useState<string>();
  const account = useAccount();
  const navigate = useNavigate();
  console.log({ from });
  useAsyncEffect(async () => {
    console.log("getting name from", from);
    const name = await provider.lookupAddress(from);
    console.log("Got name of", name, from);
    if (name) setEns(name);
  }, []);
  return (
    <li key={ipfsPath} className="py-4">
      <div className="flex space-x-3">
        {/* <img
      className="h-6 w-6 rounded-full"
      src={activityItem.person.imageUrl}
      alt=""
    /> */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium ">
              From:{" "}
              <span
                className="cursor-pointer hover:text-purple-800"
                onClick={() => {
                  copy(from);
                  toast("Copied to clipboard");
                }}
              >
                {ens || from}{" "}
                {from.toLowerCase() === account.toLowerCase() && (
                  <span className="text-gray-500 font-xs">(Me)</span>
                )}
              </span>
              <button
                className="ml-2 rounded-md bg-blue-600 p-1 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
                onClick={
                  publicKey ? () => navigate("/compose/" + from) : undefined
                }
              >
                Reply
              </button>
            </h3>
            <p className="text-sm text-gray-500">{blockNumber}</p>
          </div>

          <MessageBody ipfsPath={ipfsPath} />
        </div>
      </div>
    </li>
  );
};
const MessageBody: FC<{ ipfsPath: string }> = ({ ipfsPath }) => {
  //   const { cid: ipfsPath } = useParams();
  console.log("ipfsath", ipfsPath);
  const cid = ipfsPath ? ipfsPath.replace("ipfs://", "") : undefined;
  console.log("Cid is", cid);
  const blob = useIPFS(cid);
  const account = useAccount();
  const [decrypted, setDecrypted] = useState<Buffer | undefined>();
  useEffect(() => {
    if (!decrypted) {
      const local = localStorage.getItem("decrypted_" + ipfsPath);
      if (local) {
        setDecrypted(Buffer.from(local, "base64"));
      }
    }
    if (decrypted) {
      localStorage.setItem(
        "decrypted_" + ipfsPath,
        decrypted.toString("base64")
      );
    }
  }, [ipfsPath, decrypted]);
  if (decrypted) {
    return <SanitizeHTML html={decrypted.toString()} />;
  } else if (blob) {
    return (
      <div>
        <button
          className="p-2 border-1.5 border-gray-800 rounded-md bg-pink-200 text-purple-800 hover:text-gray-500 transition"
          onClick={() => {
            decrypt(blob, account).then(setDecrypted);
          }}
        >
          Message Encrypted - Click To Decrypt Locally
          <p className="text-xs text-gray-600">Source: {ipfsPath}</p>
        </button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
export default Message;
