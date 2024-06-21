import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateProject from "./components/CreateProject";
import LoadProject from "./components/LoadProject";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/load" element={<LoadProject />} />
      </Routes>
    </Router>
  );
}

export default App;
