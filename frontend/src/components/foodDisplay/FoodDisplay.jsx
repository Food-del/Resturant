// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../Context/StoreContext';
// import FoodItem from '../FoodItem/FoodItem';

// const FoodDisplay = (category) => {

//     const {food_list} = useContext(StoreContext);

//   return (
//     <div className='food-display' id='food-display'>
//         <h2>Top Dishes</h2>
//         <div className="food-display-list">
//             {food_list.map((item,index)=>{
//                 if(category==="All" || category === item.category){
//                     return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
//                 }
//             })}
//         </div>
//     </div>
//   )
// }

// export default FoodDisplay
import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category = "All" }) => {
    const { food_list,categoryList} = useContext(StoreContext);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    const cnt = categoryList.find(obg=>obg._id===item.category)
                   
                    if((category === "All" && item.status===true && cnt.status===true) || (category === item.category && item.status === true && cnt.status===true)){
                        return (<FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    )}
                    else{
                            null}
})}
            </div>
        </div>
    );
};

export default FoodDisplay;
