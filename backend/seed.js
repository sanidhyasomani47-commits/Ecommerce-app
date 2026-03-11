import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Load Mongoose model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true }
});
const Product = mongoose.models.product || mongoose.model("product", productSchema);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, { resource_type: 'image' });
        return result.secure_url;
    } catch (err) {
        console.error("Cloudinary upload failed for", imagePath, err);
        throw err;
    }
}

const seed = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    
    const assetsText = fs.readFileSync(path.join(__dirname, '../frontend/src/assets/assets.js'), 'utf-8');
    
    const startIndex = assetsText.indexOf('export const products = [');
    let productsText = assetsText.substring(startIndex + 'export const products = '.length);
    
    const endIndex = productsText.lastIndexOf(']');
    productsText = productsText.substring(0, endIndex + 1);
    
    productsText = productsText.replace(/image:\s*\[([^\]]+)\]/g, (match, group) => {
        const parts = group.split(',').map(p => {
          let name = p.trim();
          return `"${name}.png"`;
        });
        return `image: [${parts.join(', ')}]`;
    });
    
    // Evaluate in safe scope, using an explicit return for an arrow function would evaluate it as object.
    const getProducts = new Function(`return ${productsText}`);
    let products = getProducts();
    
    console.log(`Found ${products.length} products to seed.`);
    
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        
        const exists = await Product.findOne({ date: p.date });
        if (exists) {
            console.log(`Product ${i+1}/${products.length}: ${p.name} already exists. Skipping.`);
            continue;
        }
        
        const uploadedUrls = [];
        for (const imgName of p.image) {
            const imgPath = path.join(__dirname, '../frontend/src/assets', imgName);
            if (fs.existsSync(imgPath)) {
                console.log(`  Uploading ${imgName}...`);
                const url = await uploadImage(imgPath);
                uploadedUrls.push(url);
            } else {
                console.warn(`  Image ${imgName} not found at ${imgPath}`);
            }
        }
        
        const newProduct = new Product({
            name: p.name,
            description: p.description,
            price: p.price,
            image: uploadedUrls,
            category: p.category,
            subCategory: p.subCategory,
            sizes: p.sizes,
            bestseller: p.bestseller,
            date: p.date // Use original date
        });
        
        if (!exists) await newProduct.save();
        else {
             await Product.updateOne({ name: p.name }, newProduct);
        }
        console.log(`Added/Updated ${i+1}/${products.length}: ${p.name}`);
    }
    
    console.log("Seeding complete.");
    mongoose.disconnect();
}

seed().catch(console.error);
