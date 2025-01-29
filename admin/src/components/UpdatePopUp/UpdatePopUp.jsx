import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets.js'
import './UpdatePopUp.css'

const UpdatePopUp = ({setUpdatePopUp,item,url}) => {
  const [catList, setCatList] = useState([]);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
  })



  
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${url}/api/food/add`);
      if (response.data.success) {
        setCatList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch categories.");
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };
  
  

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchCategory();
  }, [url])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const extension = image.name.split('.').pop().toLowerCase();
    if (extension === "jpeg" || extension === "jpg") {
      const formData = new FormData();
      formData.set("name", data.name)
      formData.set("description", data.description)
      formData.set("price", Number(data.price))
      formData.set("category", data.category)
      formData.set("image", image)

      const response = await axios.post(`${url}/api/food/update`,{formData,id:item._id})
     
      if (response.data.success) {
        setUpdatePopUp(false)
      } else {
        toast.error(response.data.message)
      }
    } else {
      toast.error("Select JPG or JPEG file")
    }
  }


  return (
    <div className='update'>
    <div className='update-container'>
    <img  className="close" onClick={() => setUpdatePopUp(false)} src={assets.cross_icon} alt="" />
          <form onSubmit={onSubmitHandler} className="flex-col">
            <div className="update-img-uplode flex-col">
              <p>Uplode Image</p>
              <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" accept=".jpg" id="image" hidden required  />
            </div>
            <div className="update-product-name flex-col">
              <p>Dish name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="update-product-description flex-col">
              <p>Dish description</p>
              <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>
            <div className="update-category-price">
              <div className="update-category flex-col">
                <p>Dish Category</p>
                  {/* <select onChange={onChangeHandler}  name="category">
                  {catList.map((item,index)=>(
                      !item.name ?null: <option key={index} value={item.name}>{item.name}</option>
                    ))}
                    { /*<option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Deserts">Deserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Noodles">Noodles</option> */
                    //</select> */}
                }
                <select onChange={onChangeHandler} id="slt" name="category" value={data.category}  required>
                  <option value="" disabled selected>
                    Select Category
                  </option>
                  {catList.map((cat, index) =>
                    cat.name ? (
                      <option key={index} value={cat.name}>
                        {cat.name}
                      </option>
                    ) : null
                  )
                    }
              
                </select>
              </div>
              <div className="update-price flex-col">
                <p>Dish price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='₹20' />
              </div>
            </div>
            <button className='update-button' type='submit'>Update</button>
          </form>
          </div>
        </div>
        
  )
}

export default UpdatePopUp