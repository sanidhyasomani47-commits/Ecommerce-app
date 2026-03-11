import { cloudinary } from '../config/cloudinary.js'
import productModel from '../models/productModel.js'

// function for add product
const addProduct = async (req, res) => {
    try {
    //     console.log("Files:", req.files)
    //     console.log("Body:", req.body)

    //     // Basic validation
    //     if (!req.body) {
    //         return res.json({ success: false, message: "Request body is missing" })
    //     }

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // Extracting images from request files if they exist
        // Safe access to req.files
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // Map through the images and upload each to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        const productData = {
  name,
  description,
  category,
  price: Number(price),
  subCategory,
  bestseller: bestseller === "true" ? true : false,
  sizes: JSON.parse(sizes),
  image: imagesUrl,
  date: Date.now()
}
const product=new productModel(productData)
await product.save()
        // Log the final text data and the array of Cloudinary URLs
        console.log(productData)

        // Add logic here to save product to database using the extracted data and imagesUrl

        res.json({ success: true, message: "Product added successfully" })
    } 
    catch (error) {
        // Error handling logic
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
   const product=await productModel.find({})
   res.json({success:true,product})
    } catch (error) {
       console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
         await productModel.findByIdAndDelete(req.body.id)
         res.json({success:true,message:"product removed"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
  
}

// function for single product info
const singleProduct = async (req, res) => {
      try {
         const product=await productModel.findById(req.body.id)
         res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }