const express = require("express");
const app = express();
const cors = require("cors");
const {initializeDatabase} = require("./db/db.connect");
const Product = require("./models/product.model");
const Category = require("./models/category.model");

app.use(express.json());
app.use(cors());

initializeDatabase();

//create product
async function createProduct(newProduct) {
  try {
    const product = new Product(newProduct);
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    console.log("Failed to add Product", error);
  }
}

//api to ctreate product
app.post("/api/products", async (req, res) => {
  try {
    const savedProduct = await createProduct(req.body);
    res.status(201).json({
      message: "Product added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add Product.",
    });
  }
});

//read all products

async function readAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}

// POST call to get all receipe

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

//method to get product by id

async function getProductById(productId) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    throw error;
  }
}

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

//catrgory methods and apis

// Create Category
async function createCategory(newCategory) {
  try {
    const category = new Category(newCategory);
    const savedCategory = await category.save();
    return savedCategory;
  } catch (error) {
    console.log("Failed to add Category", error);
  }
}

// API
app.post("/api/categories", async (req, res) => {
  try {
    const savedCategory = await createCategory(req.body);
    res.status(201).json({message: "Category added successfully."});
  } catch (error) {
    res.status(500).json({error: "Failed to add Category."});
  }
});

//read all categories

// Read all Categories
async function readAllCategories() {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw error;
  }
}

// API
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await readAllCategories();

    if (categories.length !== 0) {
        res.json({data: {categories}});
    } else {
      res.status(404).json({
        error: "Categories not found.",
      });
    }
  } catch (error) {
    res.status(500).json({error: "Error occurred while fetching categories."});
  }
});


//category by id

// Method to get Category by ID
async function getCategoryById(categoryId) {
  try {
    const category = await Category.findById(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
}

// API
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const category = await getCategoryById(req.params.categoryId);

    if (category) {
      res.json({data: {category}});
    } else {
      res.status(404).json({error: "Category not found."});
    }
  } catch (error) {
    res.status(500).json({error: "Error occurred while fetching category."});
  }
});

const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
});
