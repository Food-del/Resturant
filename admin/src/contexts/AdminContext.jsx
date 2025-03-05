import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AdminContext = createContext(null);


const AdminContextProvider = (props)=>{
    const url ="http://localhost:4000" 
    const [focus,setFocus] =useState(true)

    const [list,setList] =useState([]);
    const fetchList = async () => {
     const response = await axios.get(`${url}/api/food/list`)
   
     if(response.data.success){
       setList(response.data.data);
     }else{
       toast.error("Error") 
     }
   }
   
       
    const contextValue = {
      focus,
      setFocus,
      fetchList,
      list
    }

    return (
            <AdminContext.Provider value={contextValue}>
                {props.children}
            </AdminContext.Provider>
        )
}

export default AdminContextProvider