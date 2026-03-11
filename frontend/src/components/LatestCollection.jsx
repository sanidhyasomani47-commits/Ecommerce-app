import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './title'
import Productitems from './Productitems'

function LatestCollection() {
    const {products}=useContext(ShopContext)
    const [latestProducts,setlatestProducts]=useState([])

  useEffect(() => {
  if (products && products.length > 0) {
    setlatestProducts(products.slice(0,10))
  }
}, [products])
    
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text base text-gray-700'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, itaque adipisci distinctio enim magnam excepturi asperiores velit, id eum animi vitae quo ipsam provident beatae. Quisquam repudiandae provident doloremque non?
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((items,index)=>(
               <Productitems key={index} id={items._id} image={items.image} name={items.name} price={items.price}/>
          ))
        }
      </div>
       </div>
  )
}

export default LatestCollection