import React from 'react'
import './Reservation.css'

const Reservation = () => {
  return (
    <div className="res-container">
      <div className="res-header">
        <div className="booknow-header">
          <h1>RESERVE TABLE NOW </h1>
        </div>
        <div className="sub-header">
          <h3>Reserve Your Table Now And Have Great Meal!</h3>
        </div>
      </div>
      <div className="detail-form">
        <form >
        <div className="detail-row">
          <div className="feilds">
            <label htmlFor="Res_name">Your full name?</label>
            <input type="text" placeholder="FirstName - LastName" required id="Res_Name"/>
          </div>
          <div className="feilds">
            <label htmlFor="Res_email">Your email address?</label>
            <input type="text" placeholder="Write your email hear..." required id="Res_email"/>
          </div>
        </div>
        <div className="detail-row">
        <div className="feilds">
            <label htmlFor="Res_name">How many people?</label>
            <select name="Num_of_Guest" id="num_of_guest">
              <option value="one">1 People</option>
              <option value="two">2 People</option>
              <option value="three">3 People</option>
              <option value="four">4 People</option>
              <option value="five">5 People</option>
              <option value="six">6 People</option>
            </select>
          </div>
          <div className="feilds">
            <label htmlFor="Res_time">What time?</label>
            <input type="time"  required id="Res_time"/>
          </div>
        </div>
        <div className="detail-row">
        <div className="feilds">
            <label htmlFor="Res_date">What is the date?</label>
            <input type="date"  required id="Res_date"/>
          </div>
          <div className="feilds">
            <label htmlFor="Res_num">Your phone number?</label>
            <input type="number" placeholder="Write your number hear..." required id="Res_num"/>
          </div>
        </div>
        <button className="btn" type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Reservation