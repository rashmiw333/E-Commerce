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


const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
});