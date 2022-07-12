import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMain } from "./Main";
import Message from "./Message";
import { useMyMessages, useMyPublicKey } from "./usePolyChat";

export default function Messages() {
  const { setTitle } = useMain();
  useEffect(() => {
    setTitle("My Messages");
  }, [setTitle]);
  const messages = useMyMessages();
  const publicKey = useMyPublicKey();
  return (
    <div>
      {publicKey && (
        <div>
          <Link
            type="button"
            to="/compose"
            className="p-2 bg-blue-600 text-white hover:text-gray-200 rounded-md border-1 "
          >
            Compose new message
          </Link>
        </div>
      )}
      {!publicKey && <div>You have no messages</div>}
      {messages.length && (
        <ul className="divide-y divide-gray-200">
          {messages.map(({ blockNumber, cid, from }) => (
            <Message
              ipfsPath={cid}
              blockNumber={blockNumber}
              from={from}
              publicKey={publicKey!}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
