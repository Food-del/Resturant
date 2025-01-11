import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src={assets.logoes} alt="" className='footer-content-left-logo'/> */}
                <p>Follow Us:

Stay connected with us on social media for updates, special offers, and more!.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-1234984982</li>
                    <li>contact@fooddelivery@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copy-right'>© 2025 Food Delivery. All Rights Reserved.</p>
    </div>
  )
}

export default Footer