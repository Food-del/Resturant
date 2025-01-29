import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import AddCategory from './pages/AddCategory/AddCategory'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UpdatePopUp from './components/UpdatePopUp/UpdatePopUp'

const App = () => {
 const [updatePopUp,setUpdatePopUp] =useState(false)
 const [data,setData] =useState({})
 const url ="http://localhost:4000" 

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        {updatePopUp?<UpdatePopUp setUpdatePopUp={setUpdatePopUp} item={data} url={url}/>:<></> }
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/addcategory" element={<AddCategory url={url}/>}/>
          <Route path="/list" element={<List url={url} setUpdatePopUp={setUpdatePopUp} setData={setData}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
          
        </Routes>
      </div>
    </div>
  )
}

export default App
