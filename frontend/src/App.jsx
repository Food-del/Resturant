import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Reservation from './pages/Reservation/Reservation'
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/reservation' element={<Reservation />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App