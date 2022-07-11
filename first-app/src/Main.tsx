import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Editor from "./Editor";
import Home from "./Home";

const Main: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Editor />} />
      </Routes>
    </div>
  );
};
export default Main;
