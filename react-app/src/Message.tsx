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
const Message: FC<{
  ipfsPath: string;
  blockNumber: number;
  from: string;
  publicKey: string;
}> = ({ ipfsPath, blockNumber, from, publicKey }) => {
  const account = useAccount();
  const navigate = useNavigate();
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
              <span className="">From:</span>{" "}
              <span
                className="cursor-pointer hover:text-purple-800"
                onClick={() => {
                  copy(from);
                  toast("Copied to clipboard");
                }}
              >
                {from.substring(0, 6)}...
                {from.substring(from.length - 4, from.length)}{" "}
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
            <p className="text-sm text-gray-500">Block {blockNumber}</p>
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
    return (
      <div className="m-2 p-2 border-2 border-pink-800 bg-pink-100 rounded-md prose lg:prose-xl">
        <SanitizeHTML html={decrypted.toString()} />
      </div>
    );
  } else if (blob) {
    return (
      <div>
        <button
          className="p-2  border-purple-800 rounded-md bg-pink-200 text-purple-900 font-medium border-2 hover:text-gray-800 hover:bg-pink-400 transition"
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
