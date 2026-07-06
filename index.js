const express = require("express");
const app = express();
const cors = require("cors");
const {initializeDatabase} = require("./db/db.connect");
const Receipe = require("./models/receipe.model");

app.use(express.json());
app.use(cors());

initializeDatabase();

//1.create receipe method

async function createReceipe(newReceipe){
    try{
   const receipe = new Receipe(newReceipe);
   const savedReceipe = await receipe.save();
    return savedReceipe;
    }catch(error){
        console.log("Failed to add Data",error);
    }
}

// POST call to create receipe

app.post("/receipes",async(req,res)=>{
    try{
        const receipeSaved = await createReceipe(req.body);
        res.status(201).json({message:"Receipe added Successfully."})
    }catch(error){
        res.status(500).json({ error:"Failed to add Receipe."});
    }
});

//2.method to get all receipes

async function readAllReceipes(){
    try{
        const receipes = await Receipe.find();
        return receipes;
    }catch(error){
        throw error;
    }
}

//get all Receipes
app.get("/receipes",async(req,res)=>{
    try{
        const receipes = await readAllReceipes();
            if(receipes.length !=0){
                res.json(receipes);
            }else{
                res.status(400).json({error:"Receipe Not Found."})
            }
    }catch(error){
        res.status(500).json({error:"Error Occurred While Fetching Data."});
    }
});

//3. get a perticular receipe by id

async function getReceipeById(receipeId){
    try{
        const receipe = await Receipe.findById(receipeId);
        return receipe;
    }catch(error){
        throw error;
    }
}

//get api call

app.get("/receipes/:receipeId",async(req,res)=>{
    try{
        const receipe = await getReceipeById(req.params.receipeId);
        if(receipe){
            res.json(receipe);
        }else{
            receipe.status(404).json({error:"Receipe Not Found"});
        }
    }catch(error){
        res.status(500).json({error:"Error occurred while fetching data"});
    }
})

//4. Method to update receipe

async function updateReceipe(receipeId,dataToUpdate){
    try{
        const updatedReceipe = await Receipe.findByIdAndUpdate(receipeId,dataToUpdate,{new:true}); 
            return updateReceipe;
    }catch(error){
        throw error;
    }

};

//post api to update

app.post("/receipes/:receipeId",async(req,res)=>{
    try{
        const updatedReceipe = await updateReceipe(req.params.receipeId,req.body);
         if(updatedReceipe){
            res.status(201).json({message:"Receipe updated Seuccessfully."})
         }else{
            res.status(404).json({error:"Receipe Not exist."})
         }
    }catch(error){
            res.status(500).json({error:"Failed to update Receipe."})
    }
});

//5.Delete method and API

async function deleteReceipe(receipeId){
    try{
        const deletedReceipe = await Receipe.findByIdAndDelete(receipeId);
        return deleteReceipe;
    }catch(error){
        console.log(error);
    }
};

//delete API

app.delete("/receipes/:receipeId",async(req,res)=>{
    try{
        const deletedRceipe = await deleteReceipe(req.params.receipeId);
        if(deleteReceipe){
            res.status(200).json({error:"Receipe deleted Successfully."})
        }else{
            res.status(404).json({message:"Receipe Not Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error Occured While deleting Receipe."})
    }
})


const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`);
});