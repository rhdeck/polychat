import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

const Editor: FC = () => {
  const [text, setText] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
  });
  return (
    <div>
      this is what i am about <Link to="/">Back to Home</Link>
      <div>{text}</div>
      <EditorContent
        editor={editor}
        defaultValue={text}
        onBlur={(e) => setText(editor?.getHTML() || "")}
      />
    </div>
  );
};

export default Editor;
