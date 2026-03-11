import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext()

const ShopContextProvider=(props)=>{
    const backendurl=import.meta.env.VITE_BACKEND_URL

    const currency="$"
    const delivery_fee=10
    const [search,setSearch]=useState('')
    const [showSearch,setshowSearch]=useState(true)
    const [cartitem,setcartitem]=useState({})
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const navigate=useNavigate()
    const addtocart=async(itemid,size)=>{
        let cartData=structuredClone(cartitem)
        if(!size){
            toast.error("Select Product Size")
            return
        }
        if(cartData[itemid]){
            if(cartData[itemid][size]){
                cartData[itemid][size]+=1;
            }
            else{
                cartData[itemid][size]=1
                
            }
        }
        else{
            cartData[itemid]={}
            cartData[itemid][size]=1
        }
        setcartitem(cartData)

        if(token){
            try {
                const response=await axios.post(backendurl+'api/cart/add',{itemid,size},{headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }
   const gettotalcount=()=>{
    let totalcount=0;
    for(const items in cartitem){
        for(const item in cartitem[items] ){
            if(cartitem[items][item]>0){
                totalcount+=cartitem[items][item]
            }
        }
    }
    return totalcount;
   }

   const updatequantity=async(itemid,size,quantity)=>{
         const cartdata=structuredClone(cartitem)
         cartdata[itemid][size]=quantity;
         setcartitem(cartdata)
   }
   const getCartAmount=()=>{
    let totalamount=0;
    for(const items in cartitem){
        let iteminfo=products.find((product)=>product._id===items);
        for(const item in cartitem[items]){
            if(cartitem[items][item]>0){
                try{
                totalamount+=iteminfo.price*cartitem[items][item]
                }
                catch(error){
                console.log(error)
                toast.error(error.message)
                }
            }
        }
    }
    return totalamount;
   }
   const getProductsData = async () => {
  try {

    const response = await axios.get(backendurl + 'api/product/list')
    
    if(response.data.success){
      setProducts(response.data.product)
    } else {
      toast.error(response.data.message)
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
const getUserCart=async(token)=>{
   try {
        const response=await axios.post(backendurl+'api/cart/get',{},{headers:{token}})
        if(response.data.success){
          setcartitem(response.data.cartData)
        }
        else{
            toast.error(response.data.message)
        }
   } catch (error) {
    console.log(error)
     toast.error(error.message)
   }
}
useEffect(()=>{
getProductsData()
},[])
useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
},[])
        const value={
       products,currency,delivery_fee,search,
       setSearch,showSearch,setshowSearch,cartitem,addtocart,gettotalcount,
       updatequantity,getCartAmount,navigate,backendurl,token,setToken,setcartitem

    }
    return(
        <ShopContext.Provider  value={value}>
           {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider