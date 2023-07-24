const mongoose= require("mongoose");

const IncomeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
        maxLength:45
    },
    amount:{
        type:Number,
        required:true,
        trim: true,
        maxLength:15
    },
    type:{
        type:String,
        required:true,
        default:"Income",
        maxLength:100
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    }
},{timestamps:true});

module.exports = mongoose.model("Income",IncomeSchema);