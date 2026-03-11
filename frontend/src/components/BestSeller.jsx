import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './title'
import Productitems from './Productitems'

function BestSeller() {
    const {products}=useContext(ShopContext)
    const [BestSeller,SetBestSeller]=useState([])

    useEffect(()=>{
       const bestproducts=products.filter((items)=>items.bestseller)
       SetBestSeller(bestproducts.slice(0,5))
    },[products])
  return (
       <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"BEST"} text2={"SELLER"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text base text-gray-700'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, itaque adipisci distinctio enim magnam excepturi asperiores velit, id eum animi vitae quo ipsam provident beatae. Quisquam repudiandae provident doloremque non?
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          BestSeller.map((items,index)=>(
               <Productitems key={index} id={items._id} image={items.image} name={items.name} price={items.price}/>
          ))
        }
      </div>
       </div>
  )
}

export default BestSeller