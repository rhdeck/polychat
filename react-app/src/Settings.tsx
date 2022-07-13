import {
  eth_getEncryptionPublicKey,
  onAccountsChanged,
} from "@raydeck/metamask-ts";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import { utils } from "ethers";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useMain } from "./Main";
import Logo from "./logo.png";
import {
  useGlobalFee,
  useMyFee,
  useMyPublicKey,
  useSetFee,
  useSetPublicKey,
} from "./usePolyChat";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { isValidAttribute } from "dompurify";
const Settings: FC = () => {
  const { setTitle } = useMain();
  const address = useAccount();
  const publicKey = useMyPublicKey();
  useEffect(() => {
    if (publicKey) setTitle("Settings");
    else setTitle("Welcome");
  }, [setTitle, publicKey]);
  const setPublicKey = useSetPublicKey();
  const writePublicKey = useCallback(async () => {
    const _publicKey = await eth_getEncryptionPublicKey(address);
    if (publicKey !== _publicKey) {
      const tx = await setPublicKey(_publicKey);
      toast("Public key updated, pending confrmation on the blockchain");
      await tx.wait();
      toast("Public Key saved to the smart contract");
    }
  }, [setPublicKey, address, publicKey]);
  const setFee = useSetFee();
  const myFee = useMyFee();
  const globalFee = useGlobalFee();

  const myDisplayFee =
    myFee && globalFee
      ? parseFloat(utils.formatEther(myFee.sub(globalFee)))
      : 0;
  const [formShow, setFormShow] = useState(false);
  const chainId = useChainId();
  return (
    <Fragment>
      {publicKey && (
        <Fragment>
          <div className="rounded-md bg-pink-200 p-4 border-1.5 border-pink-500 m-5">
            <span className="font-bold">Public Key</span> is all set:{" "}
            <span
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => {
                copy(publicKey);
                toast("Copied public key to clipboard");
              }}
            >
              {publicKey.substring(0, 4)}...
              {publicKey.substring(publicKey.length - 4, publicKey.length)}
              <ClipboardCopyIcon className="h-5 w-5 inline mx-2" />
            </span>
            <button
              className="ml-2 rounded-md bg-blue-600 p-1 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
              onClick={writePublicKey}
            >
              Reset
            </button>
          </div>
        </Fragment>
      )}
      {!publicKey && (
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
                  First, Save your Public Key
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    PolyChat is an end-to-end encrpyted messaging system that
                    pays you to receive messages.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex justify-center">
              <button
                className="ml-2 rounded-md bg-blue-600 p-2 text-sm font-semibold text-gray-200 hover:text-white transition hover:scale-105"
                onClick={writePublicKey}
              >
                Step 1: Register My Public Key
              </button>
            </div>
          </div>
        </div>
      )}
      {publicKey && (
        <Fragment>
          {!formShow && !myDisplayFee && (
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
                      Get Paid For Your Messages
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        PolyChat is an end-to-end encrpyted messaging system
                        that pays you to receive messages.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center">
                  <button
                    className="ml-2 rounded-md bg-blue-600 p-2 text-sm font-semibold text-gray-200 hover:text-white transition hover:scale-105"
                    onClick={() => {
                      setFormShow(true);
                    }}
                  >
                    Step 2: Set My Communication Fee
                  </button>
                </div>
              </div>
            </div>
          )}
          {!formShow && !!myDisplayFee && (
            <div className="rounded-md border-1.5 p-4 bg-pink-200 m-5">
              <span className="font-bold">My Inbox Fee</span> charged for
              receiving a message:{" "}
              <span className="font-bold text-purple-800">
                {myDisplayFee.toFixed(3)}
                {" MATIC"}
              </span>
              <button
                className="ml-2 rounded-md bg-blue-600 p-1 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
                onClick={() => setFormShow(true)}
              >
                Change
              </button>
            </div>
          )}
          {formShow && (
            <Formik
              initialValues={{ fee: myDisplayFee.toFixed(3) }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values.fee);
                const tx = await setFee(
                  utils.parseUnits(values.fee.toString(), 18)
                );
                setFormShow(false);
                toast(
                  "Set the fee to " +
                    values.fee.toString() +
                    " MATIC pending confirmation on chain"
                );
                setSubmitting(false);
                await tx.wait();
                toast("Fee change confirmed on chain");
              }}
              validate={(values) => {
                //check thenumber
                const num = parseFloat(values.fee);
                if (num < 0) {
                  return { fee: "Fee must be greater than 0" };
                } else if (isNaN(num)) {
                  return { fee: "Fee must be a number" };
                }
              }}
              validateOnMount
            >
              {({ isValid, isSubmitting, dirty }) => (
                <Form>
                  <div className="flex flex-col items-center justify-center h-full">
                    <p>
                      My Fee for Receiving a messsage (in native token, rounded
                      to the nearest Finney)
                    </p>
                    <div>
                      <Field
                        name="fee"
                        type="number"
                        step="0.001"
                        min="0"
                        label="Messaging Fee"
                        className="w-40 p-2 rounded-md border-1.5 border-gray-400"
                      />
                      <button
                        disabled={!isValid || isSubmitting || !dirty}
                        className={
                          isValid && !isSubmitting && dirty
                            ? "ml-2 rounded-md bg-blue-600 p-2 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
                            : "ml-2 rounded-md bg-gray-600 p-2 text-xs font-semibold text-gray-200 "
                        }
                      >
                        Confirm
                      </button>
                      <button
                        type="reset"
                        onClick={() => setFormShow(false)}
                        className="ml-2 rounded-md bg-red-800 p-2 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                    <ErrorMessage
                      name="fee"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default Settings;
