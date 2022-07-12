import { useAccount } from "@raydeck/usemetamask";
import { FC, useEffect, useState } from "react";
import { decrypt } from "./crypt";
import { useIPFS } from "./useIPFS";
import { SanitizeHTML } from "./Sanitize";
const Message: FC<{ ipfsPath: string }> = ({ ipfsPath }) => {
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
