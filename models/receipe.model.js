const { default: mongoose } = require("mongoose");

const receipeSchema = new mongoose.Schema({
        title:{
            type:String,
            required: true,
        },
        image:{
            type:String,
            required:true,
        },
        cuisine:{
            type:String,
            required:true,
        },
        category:{
            type:String,
            enum:["Vegeterian","Non-Vegeterian","Vegan"],
            required:true,
        },
        coockingTime:{
            type:Number,
            required:true,
        },
        servings:{
            type:Number,
            required:true
        },
        difficulty:{
            type:String,
            enum:["Easy","Medium","Hard"],
            required:true
        },
        ingredients:{
            type:[String],
            required:true
        },
        instructions:{
            type:[String],
            required:true
        },
        description:{
            type:String}
        },{timestamps:true});


        const Receipe = mongoose.model("Receipe",receipeSchema);

        module.exports = Receipe;