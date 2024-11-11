import React, { useState, useEffect } from "react";
import cook from "../assets/cooking.png";
import plus from "../assets/plus.png";
import profile from "../assets/profile.png";
import NavBar from "./NavBar";
import About from "./about.jsx";
import Category from "./Category.jsx";
import UploadPage from "./UploadPage.jsx";
import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import "../home.css";

function MainScreen() {
  const [user, setUser] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  const handleCategoryClick = () => {
    setShowCategory(!showCategory);
    setShowUploadPage(false);
  };

  const categoryHandled = (category) => {
    setSelectedCategory(category);
    setShowCategory(false);
    setShowUploadPage(true);
  };

  return (
    <div className="main-screen home">
      <NavBar onPlusClick={handleCategoryClick} />

      <div className="content">
        {showCategory ? (
          <Category clickHandle={categoryHandled} />
        ) : showUploadPage ? (
          <UploadPage selectedCategory={selectedCategory} />
        ) : (
          <>
            {user ? (
              <h1>Welcome, {user.uid}! Select a category to start uploading.</h1>
            ) : (
              <h1>You are not signed in</h1>
            )}
          </>
        )}
      </div>
      <About />
    </div>
  );
}

export default MainScreen;
