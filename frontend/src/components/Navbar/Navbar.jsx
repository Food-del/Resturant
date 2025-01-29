import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("Home");
  const {getTotalCartAmount,token,setToken} =useContext(StoreContext)
  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
   
  }

  return (
    <div className='navbar'>
      <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}><img src={assets.logoes} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/"onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>HOME</Link>
        <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}><NavLink to="/menu">MENU</NavLink></li>
        <li onClick={()=>setMenu("Reservation")} className={menu==="Reservation"?"active":""}><NavLink to="/reservation">RESERVATION</NavLink></li>
        <a href='#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>CONTACT US</a>
      </ul>
      <div className="navbar-right">
        <img  src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'onClick={()=>setMenu("Cart")} className={menu==="Cart"?"active":""}><img src={assets.bag_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='nav-profile-dropdown'>
          <li><img src={assets.profile_drop} alt="" /><p>Profile</p></li>
          <hr />
          <li><img src={assets.bag} alt="" /><p>Orders</p></li>
          <hr />
          <li><img src={assets.res_drop} alt="" /><p>Reservation</p></li>
          <hr />
          <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

          </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar