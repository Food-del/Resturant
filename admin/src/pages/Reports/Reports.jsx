import React from 'react'
import { useState } from 'react'
import './Report.css'
import { useEffect } from 'react'
import axios from 'axios'
const Reports = ({url}) => {
  const[showSecList,setShowSecList] =useState(true)
  const[model,setModel]=useState()
  const[startingDate,setStartDate]=useState()
  const[endingDate,setEndDate]=useState()
  const[all,setAll]=useState(false)
  const[data,setData]=useState([])
  const[isDateRequired, setIsDateRequired] = useState(true);
  const[isSubmit,setIsSubmit]= useState(false)
  const[isModelSelct,setIsModelSelect]=useState("")
  const handleSelectModel = (event) => {
    const selectedValue = event.target.value;
 

   if(selectedValue ==="foodModel"){
    setShowSecList(false)
    setIsDateRequired(false);
   }else{
    setShowSecList(true)
    setIsDateRequired(true);
   }
   setModel(selectedValue)
  };

  const handleSelectRange = (event) => {
    const selectedRange = event.target.value;
    let startDate, endDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedRange === "lastMonth") {
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        setAll(false)
    } else if (selectedRange === "ThisMonth") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setAll(false)
    } else if (selectedRange === "ThisWeek") {
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Get Sunday of the week
        startDate = firstDayOfWeek;
        today.setHours(23, 59, 59, 999); 
        endDate = new Date(today);
        setAll(false)
    } else if (selectedRange === "today") {
        startDate = new Date(today);
        today.setHours(23, 59, 59, 999); 
        endDate = new Date(today);
        
        console.log(endDate)
        setAll(false)
    } else {
     setAll(true)
     startDate = null;
     endDate = null;
    }
    setStartDate(startDate)
    setEndDate(endDate)
    
   };


   const onSubmitHandler = async(e)=>{

   e.preventDefault()
    if(model) {
        //  console.log(model)
        //  console.log(startingDate)
        // console.log(endingDate)
            const params = {
            model: model,
            all: all,
        };
        // ✅ Only send startDate & endDate if "All" is NOT selected
        if (!all) {
            params.startDate = startingDate;
            params.endDate = endingDate;
        }
        try {
            const res = await axios.get(`${url}/api/report/getreport`, { params });
            //console.log(res.data.data);
            if(res.data.success){
            setData(res.data.data)
            setIsSubmit(true)
            setIsModelSelect(model)
            
            }
        } catch (error) {
            console.error("Error fetching reports:", error.response?.data || error.message);
        }

    }  
   }
   useEffect(() => {
  console.log(data)
   }, [data])
   



  return (
    <div className='outer'>
        <h2 className='header' >Reports</h2>
        <form  onSubmit={onSubmitHandler}>
        <div className='head'>
            
            <div className='list'>
                <label htmlFor="main-list">Filter by</label>
                <select onChange={(e)=>handleSelectModel(e)} id="main-list" name="main-list"  required>
                  <option value="" disabled selected> Select Option</option>
                  <option value="userModel" >Customers Details</option>
                  <option value="foodModel" >Current Menu</option>
                  <option value="ReservationModel">Reservations Details</option>
                  <option value="orderModel">Orders Details</option>
                  <option value="Payments">Payments Details</option>
                  <option value="FeedbackModel">All Reviews</option>
                 </select>
            </div>
            <div className={showSecList?'list':'hide'}>
                <label htmlFor="second-list">Date range</label>
                <select onChange={handleSelectRange} id="second-list" name="second-list"  required={isDateRequired}>
                  <option value="" disabled selected>Select Time</option>
                  <option value="lastMonth">Last Month</option>
                  <option value="ThisMonth">This Month</option>
                  <option value="ThisWeek">This Week</option>
                  <option value="today">Today</option>
                  <option value="All">All</option>
                 </select>
            </div>
            <button>Generate</button> 
        </div>
        </form>

        {isSubmit?(
           <div className='body'>
            <div className='list-data'>
               <div className='data-heading'>
                {isModelSelct==="userModel" &&(
                    <>
                    <b>Caustomer Name</b> <b>Email</b> <b>Phone no.</b> <b>Area</b> <b>City</b>
                    </>
                )}
                {isModelSelct==="orderModel" &&(
                    <>
                    <b>Customer</b> <b>Items</b> <b>Date</b> <b>Amount</b> <b>Area</b>
                    </>
                    
                )}
                {isModelSelct==="foodModel" &&(
                    <>
                    <b>Dish Name</b>  <b>Price</b> <b>Category</b> <b>Status</b> <b>Description</b>
                    </>
                )}
                {isModelSelct==="ReservationModel" &&(
                    <>
                    <b>Caustomer Name</b> <b>People</b> <b>Time</b> <b>Date</b> <b>Status</b>
                    </>
                )}
                {isModelSelct==="FeedbackModel" &&(
                    <>
                    <b>Caustomer Name</b> <b>Date</b> <b>Time</b> <b>Is Public</b> <b>Review</b>
                    </>
                )}
                {isModelSelct==="Payments" &&(
                    <>
                    <b>Caustomer Name</b> <b>Email</b> <b>Amount</b> <b>Status</b> <b>Type</b>
                    </>
                )}
                
               </div>
               <div>
               {data.length > 0 ? (
                  data.map((item) => {
                    switch (isModelSelct) {
                      case "userModel":
                        return (
                          <div key={item.id} className="dataList-user">
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                            <p>{item.phoneNo}</p>
                            <p>{item.areaId?.area || "N/A"}</p>
                            <p>{item.city}</p>
                          </div>
                        );
                    
                      case "foodModel":
                        return (
                          <div key={item.id} className="dataList-food">
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{item.category?.name || "N/A"}</p>
                            <p>{item.status ? "Available" : "Out of Stock"}</p>
                            <p>{item.description.length>15?item.description.substring(0,15)+"...":item.description}</p>
                          </div>
                        );
                    
                      case "ReservationModel":
                        return (
                          <div key={item.id} className="dataList-res">
                            <p>{item.First_Name+" "+item.Last_name}</p>
                            <p>{item.People}</p>
                            <p>{item.Time}</p>
                            <p>{new Date(item.Date).toLocaleDateString('en-GB')}</p>
                            <p>{item.Status}</p>
                          </div>
                        );

                      case "orderModel":
                        return (
                          <div key={item.id} className="dataList-odr">
                            <p>{item.address?.name}</p>
                            <p>
                            {item.items.map((subItem, index) => (
                                subItem.name + " x (" + subItem.quantity + ") " 
                                
                                 ))}
                                 </p>
                            <p>{new Date(item.date).toLocaleDateString('en-GB')}</p>
                            <p>{item.amount}</p>
                            <p>{item.address?.areaName}</p>
                          </div>
                        );

                      case "Payments":
                         return (
                           <div key={item.id} className="dataList-pay">
                             <p>{item.user?.name}</p>
                             <p>{item.user?.email}</p>
                             <p>{item.amount}</p>
                             <p>{item.status}</p>
                             <p>{item.type}</p>
                           </div>
                        );
                      case "FeedbackModel":
                        return (
                          <div key={item.id} className="dataList-fed">
                            <p>{item.userName}</p>
                            <p>{new Date(item.feedbackDT).toLocaleDateString('en-GB')}</p>
                            <p>{new Date(item.feedbackDT).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
                            <p>{item.isPublic === true?"Yes":"No"}</p>
                            <p>{item.feedbackText.length>15?item.feedbackText.substring(0,15)+"...":item.feedbackText}</p>
                          </div>
                        );
                      default:
                        return (
                          <div key={item.id} className="dataList">
                            <p>No data available</p>
                          </div>
                        );
                    }
                  })
                ) : (
                  <p>No Data Available</p>
                )}
                
              </div>
              
            </div>
        </div>
        
                ):null }
    </div>
  )
}

export default Reports