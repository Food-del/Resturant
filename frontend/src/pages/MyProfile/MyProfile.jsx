import React, { useContext, useEffect,useState } from 'react'
import './MyProfile.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyProfile = () => {

  const {url,token} = useContext(StoreContext)
  const [data,setData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.post(url + "/api/user/userdata", (req.body.userId));
      // const response = await axios.post(
      //   url + "/api/user/userdata",  
      //   { userId },  
      //   { headers: { token } }  
      // );
       
      console.log("API Response:", response.data); // Log full response
      setData(response.data?.data || {}); // Handle undefined case
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  useEffect(()=>{
    if(token){
      fetchUserData();
    }
  },[token])

  return (
    <div>My Profile</div>
  )
}

export default MyProfile