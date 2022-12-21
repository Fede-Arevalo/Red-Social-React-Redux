import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import PostDetail from "./components/PostDetail/PostDetail";
import Search from "./components/Search/Search";
import Admin from "./components/Admin/Admin";
import AddPost from "./components/AddPost/AddPost";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:_id" element={<PostDetail />} />
          <Route path="/search/:postName" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addPost" element={<AddPost />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
