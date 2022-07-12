import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Editor from "./Editor";
import Home from "./Home";
import Messages from "./Messages";

const Main: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/tests" element={<Home />} />
        <Route path="/" element={<Messages />} />
        {/* <Route path="/message/:cid" element={<Message />} /> */}
        <Route path="/compose" element={<Editor />} />
      </Routes>
    </div>
  );
};
export default Main;
