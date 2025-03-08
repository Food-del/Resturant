// import React from 'react'
// import './Reservation.css'

// const Reservation = () => {


  
//   return (
//     <div className="res-container">
//       <div className="res-header">
//         <div className="booknow-header">
//           <h1>RESERVE TABLE NOW </h1>
//         </div>
//         <div className="sub-header">
//           <h3>Reserve Your Table Now And Have Great Meal !</h3>
//         </div>
//       </div>
//       <div className="detail-form">
//         <form >
//         <div className="detail-row">
//           <div className="fields">
//             <label htmlFor="Res_first_name">First Name</label>
//             <input type="text" placeholder="First Name" required id="Res_first_name"/>
//           </div>
//           <div className="fields">
//             <label htmlFor="Res_last_name">Last Name</label>
//             <input type="text" placeholder="Last Name"  id="Res_last_name"/>
//           </div>
//         </div>
//         <div className="detail-row">
//         <div className="fields">
//             <label htmlFor="Res_name">No. of people</label>
//             <select name="Num_of_Guest" id="num_of_guest"  required defaultValue="">
//               <option value="" disabled >select</option>
//                 <option value="1">1 Person</option>
//                 <option value="2">2 People</option>
//                 <option value="3">3 People</option>
//                 <option value="4">4 People</option>
//                 <option value="5">5 People</option>
//                 <option value="6">6 People</option>
//                 <option value="7">7 People</option>
//                 <option value="8">8 People</option>
//             </select>
//           </div>
//           <div className="fields">
//             <label htmlFor="Res_time">Time</label>
//             <select name="Time" id="time" required defaultValue="">
//               <option value="" disabled>select</option>
//               <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
//               <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
//               <option value="09:00 PM - 10:00 PM">09:00 PM - 10:00 PM</option>
//               <option value="10:00 PM - 11:00 PM">10:00 PM - 11:00 PM</option>
//               <option value="11:00 PM - 12:00 AM">11:00 PM - 12:00 AM</option>
//             </select>
//             {/* <input type="time"  required id="Res_time"/> */}
//           </div>
//         </div>
//         <div className="detail-row">
//         <div className="fields">
//             <label htmlFor="Res_date">Date</label>
//             <input type="date"  required id="Res_date"/>
//           </div>
//           <div className="fields">
//             <label htmlFor="Res_num">Mobile No.</label>
//             <input type="number" placeholder="Write your number hear..." required id="Res_num"/>
//           </div>
//         </div>
//         <div className="note">
//           <p className="info-text">
//               *Food delivery and dining at restaurants are available only in Ahmedabad.
//             </p><br/>
//           <h3 className='info-amount'>Amount: ₹ 100</h3><br/>
//           <p className='info-text'>The Reservation amount will be deducted from your bill at Resturant.</p>
//           <p className='info-text'>*No refund in case of cancelation.</p><br/>
//           </div>
//         <button className="btn" type='submit'>Submit</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Reservation

import React, { useContext, useState,useEffect } from 'react'
import './Reservation.css';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'

const Reservation = () => {
  const{user,isLogged,url,token}=useContext(StoreContext)
  // const[f_name,setFirstName] = useState("");
  // const[l_name,setLastName] = useState("");
  // const[people,setPeople] = useState("");
  // const[time,setTime] = useState("");
  // const[date,setDate] = useState("");
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    people:"",
    time:"",
    date:"",
    amt:100,
    mobileno:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "mobileno") {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to tomorrow

    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1); // Set max date to one month later

    setMinDate(tomorrow.toISOString().split('T')[0]);
    setMaxDate(oneMonthLater.toISOString().split('T')[0]);
    
  
  }, []);


  const ReservationConfirm = async (event) =>{
    event.preventDefault();
    // console.log(url);
    
    let response = await axios.post(url+"/api/reservation/reserve",data,{headers:{token}})
    // console.log(response);
    
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("errrrrrr")
    }
  }


  // const handleMobileInput = (e) => {
  //   let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
  //   if (value.length > 10) value = value.slice(0, 10); // Restrict to 10 digits
  //   setMobileNumber(value);
  // };
  
  return (
    <div className="res-container">
      <div className="res-header">
        <div className="booknow-header">
          <h1>RESERVE TABLE NOW</h1>
        </div>
        <div className="sub-header">
          <h3>Reserve Your Table Now And Have Great Meal!</h3>
        </div>
      </div>
      <div className="detail-form">
        <form onSubmit={  ReservationConfirm }>
          <div className="detail-row">
            <div className="fields">
              <label htmlFor="Res_first_name">First Name</label>
              <input onChange={onChangeHandler} value={data.firstname} type="text" placeholder="First Name" name='firstname' required id="Res_first_name" />
            </div>
            <div className="fields">
              <label htmlFor="Res_last_name">Last Name</label>
              <input onChange={onChangeHandler} value={data.lastname} type="text" placeholder="Last Name" name='lastname' id="Res_last_name" required/>
            </div>
          </div>
          <div className="detail-row">
            <div className="fields">
              <label htmlFor="Res_name">No. of people</label>
              <select onChange={onChangeHandler} value={data.people} name="people" id="num_of_guest" required>
                <option value="" disabled>select</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
                <option value="6">6 People</option>
                <option value="7">7 People</option>
                <option value="8">8 People</option>
              </select>
            </div>
            <div className="fields">
              <label htmlFor="Res_time">Time</label>
              <select name="time" onChange={onChangeHandler} value={data.time} id="time" required defaultValue="">
                <option value="" disabled>select</option>
                <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                <option value="08:00 PM - 09:00 PM">08:00 PM - 09:00 PM</option>
                <option value="09:00 PM - 10:00 PM">09:00 PM - 10:00 PM</option>
                <option value="10:00 PM - 11:00 PM">10:00 PM - 11:00 PM</option>
                <option value="11:00 PM - 12:00 AM">11:00 PM - 12:00 AM</option>
              </select>
            </div>
          </div>
          <div className="detail-row">
            <div className="fields">
              <label htmlFor="Res_date">Date</label>
              <input onChange={onChangeHandler} value={data.date} type="date" required id="Res_date" name='date' min={minDate} max={maxDate} />
            </div>
            <div className="fields">
            <label htmlFor="Res_num">Mobile No.</label>
              <input onChange={onChangeHandler} value={data.mobileno}
                type="text" name='mobileno'
                placeholder="Enter 10-digit mobile number" 
                required 
                id="Res_num" 
                maxLength="10" 
              />
            </div>
          </div>
          <div className="note">
            <p className="info-text">
              *Food delivery and dining at restaurants are available only in Ahmedabad.
            </p>
            <br />
            <h3 className="info-amount" name='amt' >Amount: ₹ 100</h3>
            <br />
            <p className="info-text">The Reservation amount will be deducted from your bill at the restaurant.</p>
            <p className="info-text">*No refund in case of cancellation.</p>
            <br />
          </div>
          <button className="btn" type="submit">
            Reserver Table
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
