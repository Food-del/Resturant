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
          <h3>Reserve Your Table Now And Have Great Meal !</h3>
        </div>
      </div>
      <div className="detail-form">
        <form >
        <div className="detail-row">
          <div className="feilds">
            <label htmlFor="Res_name">Full name</label>
            <input type="text" placeholder="FirstName - LastName" required id="Res_Name"/>
          </div>
          <div className="feilds">
            <label htmlFor="Res_email">Email address</label>
            <input type="text" placeholder="Write your email hear..." required id="Res_email"/>
          </div>
        </div>
        <div className="detail-row">
        <div className="feilds">
            <label htmlFor="Res_name">No. of people</label>
            <select name="Num_of_Guest" id="num_of_guest">
              <option value="select" selected>select</option>
              <option value="one">1 People</option>
              <option value="two">2 People</option>
              <option value="three">3 People</option>
              <option value="four">4 People</option>
              <option value="five">5 People</option>
              <option value="six">6 People</option>
              <option value="seven">7 People</option>
              <option value="eight">8 People</option>
            </select>
          </div>
          <div className="feilds">
            <label htmlFor="Res_time">Time</label>
            <input type="time"  required id="Res_time"/>
          </div>
        </div>
        <div className="detail-row">
        <div className="feilds">
            <label htmlFor="Res_date">Date</label>
            <input type="date"  required id="Res_date"/>
          </div>
          <div className="feilds">
            <label htmlFor="Res_num">Mobile No.</label>
            <input type="number" placeholder="Write your number hear..." required id="Res_num"/>
          </div>
        </div>
        <div className="note">
          <p className="info-text">
              *Food delivery and dining at restaurants are available only in Ahmedabad.
            </p><br/>
          </div>
        <button className="btn" type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Reservation