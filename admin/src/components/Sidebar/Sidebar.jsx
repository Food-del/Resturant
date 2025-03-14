import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import {assets} from "../../assets/assets"
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
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
    <div className='sidebar'>
      <div className={`sidebar-options ${hidden ? "hide" : ""}`}>
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Dish</p>
        </NavLink>
        <NavLink to='/addcategory' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Category</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.list} alt="" />
          <p>List Dishes</p>
        </NavLink>
         <NavLink to='/categorylist' className="sidebar-option">
          <img src={assets.list} alt="" />
          <p>List Categories</p>
        </NavLink> 
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <NavLink to='/reservations ' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Reservations</p>
        </NavLink>
        <NavLink to='/feedback ' className="sidebar-option">
          <img src={assets.feedback} alt="" />
          <p>Feedbacks</p>
        </NavLink>
      </div>

    </div>
  )
}

export default Sidebar