import React from 'react'
import './ExploreMenu.css'
import { StoreContext } from '../../Context/StoreContext';
import { useContext } from 'react';

const ExploreMenu = ({category,setCategory}) => {
  const {categoryList} =useContext(StoreContext)
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Discover a world of flavors with our carefully curated menu! From appetizers to desserts, every dish is crafted to delight your taste buds. Explore a variety of cuisines, seasonal specials, and signature dishes that you'll love. Dive into our menu and find your next favorite meal.</p>
      <div className="explore-menu-list">
        {console.log(categoryList)}
        {categoryList.map((item,index)=>{
          return (
            <div onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} key={index} className='explore-menu-list-item'>
              <img className={category===item.name?"active":""} src={"http://localhost:4000/images/"+item.image} alt='menu-item' />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}


export default ExploreMenu