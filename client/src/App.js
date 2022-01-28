import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Login from "./pages/Login";
import { SoundHub } from "./components/Hub/SoundHub";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SoundHub></SoundHub>
    </div>
  );
};

export default App;
