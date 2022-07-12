import { eth_getEncryptionPublicKey } from "@raydeck/metamask-ts";
import { useAccount } from "@raydeck/usemetamask";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import Message from "./Message";
import { useMyMessages, useMyPublicKey, useSetPublicKey } from "./useIPFSChat";

export default function Example() {
  const messages = useMyMessages();
  const address = useAccount();
  const publicKey = useMyPublicKey();
  const setPublicKey = useSetPublicKey();
  const writePublicKey = useCallback(async () => {
    const publicKey = await eth_getEncryptionPublicKey(address);
    await setPublicKey(publicKey);
  }, [setPublicKey, address]);
  return (
    <div>
      {publicKey && (
        <button onClick={writePublicKey}>Public Key is {publicKey}</button>
      )}
      {!publicKey && <button onClick={writePublicKey}>Add Public Key</button>}
      <Link type="button" to="/compose">
        Compose new message
      </Link>
      <ul role="list" className="divide-y divide-gray-200">
        {messages.map(({ blockNumber, cid, from }) => (
          <li key={cid} className="py-4">
            <div className="flex space-x-3">
              {/* <img
                className="h-6 w-6 rounded-full"
                src={activityItem.person.imageUrl}
                alt=""
              /> */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{from}</h3>
                  <p className="text-sm text-gray-500">{blockNumber}</p>
                </div>
                <p className="text-sm text-gray-500">{cid}</p>
                <Message ipfsPath={cid} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
