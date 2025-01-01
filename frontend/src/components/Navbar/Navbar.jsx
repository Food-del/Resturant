import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

  const [menu,setMenu] = useState("Home");
  
  return (
    <div className='navbar'>
      <img src={assets.logoes} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to="/"onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}><NavLink to="/menu">Menu</NavLink></li>
        <li onClick={()=>setMenu("Reservation")} className={menu==="Reservation"?"active":""}><NavLink to="/reservation">Reservation</NavLink></li>
        <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.bag_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar