import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {
 
  const {getTotalCartAmount,token,food_list,cartItems,url}= useContext(StoreContext) 

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    area:"",
    city:"",
    zipcode:"",
    phone:""
  })

const onChangeHandler = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}

  // useEffect(()=>{
  //   console.log(data);
    
  // },[data])

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+50,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    console.log(getTotalCartAmount);
    
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
         <p className="title">Delivery Information</p>
         <div className="multi-fields">
           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name"/>
           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name"/>
         </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
           <input required name='area'onChange={onChangeHandler} value={data.area} type="text" placeholder="Area"/>
           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="number" placeholder="Pin-Code"/>
         </div>
         <div className="multi-fields">
           <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
           <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone-No' minLength="10" maxLength="10" pattern="^\d{10}$" onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}/>
          </div>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Delivery Fee</b>
            <b>₹ {getTotalCartAmount()===0?0:50}</b>
          </div>
          <hr />

          <div className="cart-total-details">
            <p>Total</p>
            <p>₹ {getTotalCartAmount()===0?0:getTotalCartAmount()+50}</p>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
         </div>
      </div>
    </form>
  )
}

export default PlaceOrder