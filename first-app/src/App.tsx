import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Hi there
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </header>
    </div>
  );
}
const Home = () => {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Link className="App-link" to="/about">
        Learn More
      </Link>
    </div>
  );
};
const About = () => {
  return (
    <div>
      this is what i am about <Link to="/">Back to Home</Link>
    </div>
  );
};

export default App;
