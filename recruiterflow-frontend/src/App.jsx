import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

import Navbar from "./components/Navbar";
import Form from "./components/Form";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
};

export default App;
