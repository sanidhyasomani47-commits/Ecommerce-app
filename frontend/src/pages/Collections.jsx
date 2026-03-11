import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/title'
import Productitems from '../components/Productitems'

function Collections() {
  const {products,search,showSearch}=useContext(ShopContext)
  const [showFilter,setshowfilter]=useState(true)
  const [filterProduct,setfilterProduct]=useState([])
  const [category,setCategory]=useState([])
  const [subCategory,setsubCategory]=useState([])
  const [sortType,setsortType]=useState('relavent')
  const togglecategory=(e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(item=>item!==e.target.value))
        }
        else{
          setCategory(prev=>[...prev,e.target.value])
        }
  }
  
   const togglesubcategory=(e)=>{
        if(subCategory.includes(e.target.value)){
            setsubCategory(prev=>prev.filter(item=>item!==e.target.value))
        }
        else{
          setsubCategory(prev=>[...prev,e.target.value])
        }
  }
  const applyfilter=()=>{
    let productcopy=products.slice()
    if(search && showSearch){
      productcopy=productcopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
     productcopy= productcopy.filter(item=>category.includes(item.category))
    }
     if(subCategory.length>0){
     productcopy= productcopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setfilterProduct(productcopy)
  }

  const sortProduct=()=>{
    let fpCopy=filterProduct.slice()
    switch(sortType){
      case 'low-high':
        setfilterProduct(fpCopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setfilterProduct(fpCopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        applyfilter()
        break;

    }
  }
  
  useEffect(()=>{
      setfilterProduct(products)
  },[products])

   useEffect(()=>{
     applyfilter()
  },[category,subCategory,search,showSearch,products])
   useEffect(()=>{
     sortProduct()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter */}
      <div className='min-w-60'>
        <p onClick={()=>setshowfilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt='dropdown'/>
        </p>
        {/* category filter */}
              <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? 'block' : 'hidden'} sm:block`}>
                  
          <p className='mb-3 text-sm font font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' onChange={togglecategory} value={'Men'}/>Men
            </p>
              <p className='flex gap-2'>
              <input className='w-3' type='checkbox' onChange={togglecategory} value={'Women'}/>Women
            </p>
              <p className='flex gap-2'>
              <input className='w-3' type='checkbox' onChange={togglecategory} value={'Kids'}/>Kids
            </p>
          </div>
        </div>
          {/* subcategory filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' onChange={togglesubcategory} value={'Topwear'}/>Topwear
            </p>
              <p className='flex gap-2'>
              <input className='w-3' type='checkbox' onChange={togglesubcategory} value={'Bottomwear'}/>Bottomwear
            </p>
              <p className='flex gap-2'>
              <input className='w-3' type='checkbox' onChange={togglesubcategory} value={'Winterwear'}/>Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
              <Title text1={'ALL'} text2={'COLLECTION'}/>
              {/* Product Sort */}
              <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low-High</option>
                <option value="high-low">Sort by: High-Low</option>
              </select>
              
          </div>
           {/* map  product */}
     <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
      {
        filterProduct.map((items,index)=>(
          <Productitems key={index} id={items._id} image={items.image} name={items.name} price={items.price} />
        ))
      }
     </div>
      </div>
    
    </div>
  )
}

export default Collections