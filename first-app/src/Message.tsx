import { useAccount } from "@raydeck/usemetamask";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { decrypt } from "./crypt";
import { useIPFS } from "./useIPFS";

const Message: FC<{ ipfsPath: string }> = ({ ipfsPath }) => {
  //   const { cid: ipfsPath } = useParams();
  console.log("ipfsath", ipfsPath);
  const cid = ipfsPath ? ipfsPath.replace("ipfs://", "") : undefined;
  console.log("Cid is", cid);
  const blob = useIPFS(cid);
  const account = useAccount();
  const [decrypted, setDecrypted] = useState<Buffer | undefined>();
  if (decrypted) {
    return (
      <div dangerouslySetInnerHTML={{ __html: decrypted.toString("utf8") }} />
    );
  } else if (blob) {
    return (
      <button
        onClick={() => {
          decrypt(blob, account).then(setDecrypted);
        }}
      >
        Decrypt
      </button>
    );
  } else {
    return <div>Loading...</div>;
  }
};
export default Message;
