const express = require("express");
const app = express();
const cors = require("cors");
const {initializeDatabase} = require("./db/db.connect");
const Product = require("./models/product.model");

app.use(express.json());
app.use(cors());

initializeDatabase();

//1.read all products

async function readAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

// POST call to create receipe

app.get("/api/products", async (req, res) => {
  try {
    const products = await readAllProducts();

    if (products.length !== 0) {
      res.json({data: {products}});
    } else {
      res.status(404).json({error: "Products not found."});
    }
  } catch (error) {
    res.status(500).json({error: "Error occurred while fetching products."});
  }
});

//2.method to get product by id

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

//create
async function createProduct(newProduct) {
  try {
    const product = new Product(newProduct);
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    console.log("Failed to add Product", error);
  }
}

//api
app.post("/api/products", async (req, res) => {
  try {
    await createProduct(req.body);
    res.status(201).json({
      message: "Product added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add Product.",
    });
  }
});

//get api for product by id

app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await getProductById(req.params.productId);

    if (product) {
        res.json({data: {product}});
    } else {
      res.status(404).json({error: "Product not found."});
    }
  } catch (error) {
    res.status(500).json({error: "Error occurred while fetching product."});
  }
});

// //3. get a perticular receipe by id

// async function getReceipeById(receipeId){
//     try{
//         const receipe = await Receipe.findById(receipeId);
//         return receipe;
//     }catch(error){
//         throw error;
//     }
// }

// //get api call

// app.get("/receipes/:receipeId",async(req,res)=>{
//     try{
//         const receipe = await getReceipeById(req.params.receipeId);
//         if(receipe){
//             res.json(receipe);
//         }else{
//             receipe.status(404).json({error:"Receipe Not Found"});
//         }
//     }catch(error){
//         res.status(500).json({error:"Error occurred while fetching data"});
//     }
// })

// //4. Method to update receipe

// async function updateReceipe(receipeId,dataToUpdate){
//     try{
//         const updatedReceipe = await Receipe.findByIdAndUpdate(receipeId,dataToUpdate,{new:true}); 
//             return updateReceipe;
//     }catch(error){
//         throw error;
//     }

// };

// //post api to update

// app.post("/receipes/:receipeId",async(req,res)=>{
//     try{
//         const updatedReceipe = await updateReceipe(req.params.receipeId,req.body);
//          if(updatedReceipe){
//             res.status(201).json({message:"Receipe updated Seuccessfully."})
//          }else{
//             res.status(404).json({error:"Receipe Not exist."})
//          }
//     }catch(error){
//             res.status(500).json({error:"Failed to update Receipe."})
//     }
// });

// //5.Delete method and API

// async function deleteReceipe(receipeId){
//     try{
//         const deletedReceipe = await Receipe.findByIdAndDelete(receipeId);
//         return deleteReceipe;
//     }catch(error){
//         console.log(error);
//     }
// };

// //delete API

// app.delete("/receipes/:receipeId",async(req,res)=>{
//     try{
//         const deletedRceipe = await deleteReceipe(req.params.receipeId);
//         if(deleteReceipe){
//             res.status(200).json({error:"Receipe deleted Successfully."})
//         }else{
//             res.status(404).json({message:"Receipe Not Found"})
//         }
//     }catch(error){
//         res.status(500).json({error:"Error Occured While deleting Receipe."})
//     }
// })


const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
});