import { eth_getEncryptionPublicKey } from "@raydeck/metamask-ts";
import { useAccount } from "@raydeck/usemetamask";
import { utils } from "ethers";
import { Field, Form, Formik } from "formik";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useMain } from "./Main";
import {
  useGlobalFee,
  useMyFee,
  useMyPublicKey,
  useSetFee,
  useSetPublicKey,
} from "./useIPFSChat";

const Settings: FC = () => {
  const { setTitle } = useMain();
  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);
  const address = useAccount();
  const publicKey = useMyPublicKey();
  const setPublicKey = useSetPublicKey();
  const writePublicKey = useCallback(async () => {
    const _publicKey = await eth_getEncryptionPublicKey(address);
    if (publicKey !== _publicKey) {
      await setPublicKey(_publicKey);
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
  return (
    <Fragment>
      {publicKey && (
        <div>
          {" "}
          Public Key is all set:{" "}
          <span className="text-gray-500">
            {publicKey.substring(0, 4)}...
            {publicKey.substring(publicKey.length - 4, publicKey.length)}
          </span>
        </div>
      )}
      {!publicKey && (
        <button
          className="ml-2 rounded-md bg-blue-600 p-1 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
          onClick={writePublicKey}
        >
          Add Public Key
        </button>
      )}
      {!formShow && (
        <div>
          My Fee charged for receiving a message: {myDisplayFee}{" "}
          <button
            className="ml-2 rounded-md bg-blue-600 p-1 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
            onClick={() => setFormShow(true)}
          >
            Change
          </button>
        </div>
      )}
      {myFee && globalFee && formShow && (
        <Formik
          initialValues={{ fee: myDisplayFee }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(values.fee);
            await setFee(utils.parseUnits(values.fee.toString(), 18));
            setFormShow(false);
            setSubmitting(false);
          }}
          validateOnMount
        >
          {({}) => (
            <Form>
              <p>
                My Fee for Receiving a messsage (in native token, rounded to the
                nearest Finney)
              </p>
              <Field
                name="fee"
                type="number"
                step="0.001"
                min="0"
                label="Messaging Fee"
              />
              <button className="ml-2 rounded-md bg-blue-600 p-2 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105">
                Confirm
              </button>
              <button
                type="reset"
                onClick={() => setFormShow(false)}
                className="ml-2 rounded-md bg-red-800 p-2 text-xs font-semibold text-gray-200 hover:text-white transition hover:scale-105"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      )}
    </Fragment>
  );
};
export default Settings;
