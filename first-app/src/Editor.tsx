import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { encrypt } from "./crypt";
import { useIPFSChat } from "./useIPFSChat";
import { upload } from "./ipfs";
const Editor: FC = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none bg-red-100 text-black bg-opacity-80",
      },
    },
  });
  const ipfsChat = useIPFSChat();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{ html: "<p>Hello World!</p>", to: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          //What to do?
          //Encrypt the message
          //get the public key
          const publicKey = await ipfsChat.publicKeyOf(values.to);
          console.log("Encrypting with public key", publicKey);
          const blob = encrypt(Buffer.from(values.html, "utf8"), publicKey);
          //Upload the message
          console.log("got a blob", blob.toString("base64"));
          const cid: string = await upload(blob);
          console.log("Uploaded to ipfs with blob", cid);
          const txn = await ipfsChat.sendMessageTo("ipfs://" + cid, values.to);
          await txn.wait();
          setSubmitting(false);
          navigate("/");
        }}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form>
            <Fragment>
              <h2>To Address</h2>
              <Field
                name="to"
                className="p-2 border-2 border-gray-800 rounded-md"
              />
              <h2>Body</h2>
              <EditorContent
                editor={editor}
                onBlur={(e) => setFieldValue("html", editor?.getHTML() || "")}
              />
              <h2>Sample</h2>
              <div dangerouslySetInnerHTML={{ __html: values.html }} />
            </Fragment>
            <button onClick={submitForm}>Send message</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Editor;
