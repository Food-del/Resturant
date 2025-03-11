import React from 'react'
import './Navbar.css'
import {assets} from "../../assets/assets"
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  let lastScrollY = window.scrollY;

  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > lastScrollY) {
              setHidden(true); // Hide navbar when scrolling down
          } else {
              setHidden(false); // Show navbar when scrolling up
          }
          lastScrollY = window.scrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${hidden ? "hide" : ""}`}>
        <img className="logo" src={assets.logo} alt="" />
        <img className="profile" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar