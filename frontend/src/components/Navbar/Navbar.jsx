import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("Home");
  const {getTotalCartAmount} =useContext(StoreContext)


  return (
    <div className='navbar'>
      <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}><img src={assets.logoes} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/"onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}><NavLink to="/menu">Menu</NavLink></li>
        <li onClick={()=>setMenu("Reservation")} className={menu==="Reservation"?"active":""}><NavLink to="/reservation">Reservation</NavLink></li>
        <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img  src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'onClick={()=>setMenu("Cart")} className={menu==="Cart"?"active":""}><img src={assets.bag_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=>setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar