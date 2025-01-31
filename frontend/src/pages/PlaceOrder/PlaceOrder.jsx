import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
const PlaceOrder = () => {
 
  const {getTotalCartAmount}= useContext(StoreContext) 
  return (
    <form className='place-order'>
      <div className="place-order-left">
         <p className="title">Delivery Information</p>
         <div className="multi-fields">
           <input type="text" placeholder="First Name"/>
           <input type="text" placeholder="Last Name"/>
         </div>
        <input type="email" placeholder='Email address'/>
        <input type="text" placeholder='Street'/>
        <div className="multi-fields">
           <input type="text" placeholder="Area"/>
           <input type="number" placeholder="Pin-Code"/>
         </div>
         <input type="number" placeholder='Your Phone-No'/>
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
          <button >PROCEED TO PAYMENT</button>
         </div>
      </div>
    </form>
  )
}

export default PlaceOrder