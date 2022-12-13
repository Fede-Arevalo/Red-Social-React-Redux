import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/register" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Login />} />
          <Route path="/register" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
