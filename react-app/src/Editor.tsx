import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  useFormikContext,
} from "formik";
import { encrypt } from "./crypt";
import { provider, useGetFeeForRecipient, usePolyChat } from "./usePolyChat";
import { upload } from "./ipfs";
import { BigNumber, ethers, utils } from "ethers";
import useAsyncEffect from "./useAsyncEffect";
import { useMain } from "./Main";
import { textSpanContainsPosition } from "typescript";
import { useENS } from "./useENS";
import { toast } from "react-toastify";
const symbol = "MATIC";
const Editor: FC = () => {
  const { to } = useParams();

  const polyChat = usePolyChat();
  const navigate = useNavigate();
  const getMessagingFee = useGetFeeForRecipient();
  const [messagingFee, setMessagingFee] = useState(BigNumber.from(0));
  const [_to, setTo] = useState("");
  useAsyncEffect(async () => {
    if (!_to) {
      setMessagingFee(BigNumber.from(0));
      return;
    }
    const fee = await getMessagingFee(_to);
    setMessagingFee(fee);
  }, [_to, getMessagingFee]);
  const { setTitle } = useMain();
  useEffect(() => {
    setTitle("Send a Message");
  }, [setTitle]);
  const { knownNames, testName } = useENS();
  return (
    <div>
      <Formik
        isInitialValid={false}
        validateOnMount={true}
        initialValues={{ html: "<p>Hello World!</p>", to: to || "" }}
        onSubmit={async (values, { setSubmitting }) => {
          const to = knownNames[values.to] || values.to;
          setSubmitting(true);
          const publicKey = await polyChat.publicKeyOf(to);
          const blob = encrypt(Buffer.from(values.html, "utf8"), publicKey);
          const cid: string = await upload(blob);
          const messagingFee = await getMessagingFee(to);
          const txn = await polyChat.sendMessageTo("ipfs://" + cid, to, {
            value: messagingFee,
          });
          // await txn.wait();
          setSubmitting(false);
          toast(`Queued message to ${values.to}`);
          navigate("/");
          await txn.wait();
          toast("Message committed to the blockchain");
        }}
        validate={(values) => {
          const errors: Record<string, string | undefined> = {
            html: undefined,
            to: undefined,
          };
          if (!values.to) {
            errors.to = "Please enter a recipient";
          } else if (
            !ethers.utils.isAddress(values.to) &&
            !knownNames[values.to]
          ) {
            errors.to = "Please enter a valid address";
          } else {
            setTo(values.to);
          }
          if (values.to.endsWith(".eth")) {
            testName(values.to);
          }
          if (!values.html || values.html === "<p></p>") {
            errors.html = "Please enter a message";
          }

          if (Object.values(errors).some((v) => v)) return errors;
          return undefined;
        }}
      >
        {({ values, isSubmitting, isValid }) => (
          <Form>
            <div className="m-4">
              <div className="text-sm text-gray-600 font-medium">
                To Address (or ENS .eth name)
              </div>
              <Field
                name="to"
                className="p-2 border border-gray-800 rounded-md w-80 text-xs"
              />
              {knownNames[values.to] && (
                <div className="text-xs text-purple-800 font-medium">
                  Resolving to {knownNames[values.to]}
                </div>
              )}
              <ErrorMessage
                component="div"
                className="block text-xs text-red-600"
                name="to"
              />
            </div>
            <div className="m-4">
              <div className="text-sm text-gray-600 font-medium">Message</div>
              <div className="text-xs text-gray-600  p-2 bg-pink-200 rounded-md">
                Compose your message in the gray box below. Feel free to do
                control/command+b or control/command+i to make bold or italic
                text.
              </div>
              <TipTapEditor />
              <ErrorMessage
                component="div"
                className="block text-xs text-red-600"
                name="html"
              />
            </div>
            <div className="m-4">
              <button
                disabled={isSubmitting || !isValid}
                className={
                  isSubmitting || !isValid
                    ? "p-2 bg-gray-600 text-white  border-gray-800 border-1 rounded-md transition 5"
                    : "p-2 bg-blue-600 text-white hover:text-gray-200 border-gray-800 border-1 rounded-md transition hover:scale-105"
                }
              >
                Send message: {utils.formatEther(messagingFee)} {symbol}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const TipTapEditor = () => {
  const { setFieldValue, isValid } = useFormikContext();
  const isValidRef = useRef(isValid);
  isValidRef.current = isValid;
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl my-5 focus:outline-none bg-gray-100 text-black bg-opacity-80 p-4 rounded-md w-full",
      },
    },
    autofocus: true,
    onUpdate: (content) => {
      if (!isValidRef.current) {
        setFieldValue("html", content);
      }
    },
  });
  return (
    <EditorContent
      editor={editor}
      onBlur={(e) => setFieldValue("html", editor?.getHTML() || "")}
    />
  );
};

export default Editor;
