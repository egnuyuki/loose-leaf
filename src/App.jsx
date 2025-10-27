import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import List from "./pages/List";
import Create from "./pages/Create";
import Note from "./pages/Note";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Layout>
  );
}

export default App;
