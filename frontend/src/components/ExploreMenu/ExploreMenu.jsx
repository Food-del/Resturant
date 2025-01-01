import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Manu</h1>
      <p className='explore-menu-text'>Discover a world of flavors with our carefully curated menu! From appetizers to desserts, every dish is crafted to delight your taste buds. Explore a variety of cuisines, seasonal specials, and signature dishes that you'll love. Dive into our menu and find your next favorite meal.</p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='menu-item' />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}


export default ExploreMenu