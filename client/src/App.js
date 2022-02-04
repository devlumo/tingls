import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";
import SideNav from "./components/SideNav/SideNav";
import Login from "./pages/Login";
import { SoundHub } from "./components/Hub/SoundHub";
import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <SideNav />
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
