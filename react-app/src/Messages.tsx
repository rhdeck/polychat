import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMain } from "./Main";
import Message from "./Message";
import { useMyMessages, useMyPublicKey } from "./usePolyChat";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import Logo from "./logo.png";
export default function Messages() {
  const { setTitle } = useMain();

  const messages = useMyMessages();
  const publicKey = useMyPublicKey();
  useEffect(() => {
    if (publicKey) setTitle("My Messages");
  }, [setTitle, publicKey]);
  return (
    <div>
      {!publicKey && <Welcome />}
      {!!publicKey && !messages.length && <div>You have no messages</div>}
      {!!messages.length && (
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
const Welcome: FC = () => {
  const navigate = useNavigate();
  const { setTitle } = useMain();
  useEffect(() => {
    setTitle("Welcome");
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-pink-100">
            <img
              src={Logo}
              className="h-6 w-6 text-pink-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Welcome to PolyChat
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                PolyChat is an end-to-end encrpyted messaging system that pays
                you to receive messages.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => navigate("/settings")}
          >
            Let's Get Set Up
          </button>
        </div>
      </div>
    </div>
  );
};
