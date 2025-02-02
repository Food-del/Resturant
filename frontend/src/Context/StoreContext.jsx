import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoredContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [categoryList,setCategoryList] =useState([]);
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const deleteFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:0}))
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0 ;
        for(const item in  cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;

    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }    

    const loadCartdata = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }


    const fetchCategoryList = async ()=>{
        try {
            const response = await axios.get(url + "/api/food/add")
            setCategoryList(response.data.data)
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            await fetchCategoryList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartdata(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])



    const contextValue = {
        food_list,
        categoryList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        deleteFromCart,
        url,
        token,
        setToken,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoredContextProvider;