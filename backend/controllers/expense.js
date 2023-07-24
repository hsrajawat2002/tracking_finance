const ExpenseModel = require("../models/ExpenseModel");

exports.addExpense= async (req,res)=>{
    console.log(req.body);
    const {title,amount,category,description,date}=req.body;
    const expense= ExpenseModel({
        title, amount,category,description,date
    })


    try {
        if(!title || !description || !category || !date){
            return res.status(400).json({"message":"please fill all the required fields"});
        }
        if(amount<0 || !amount==='number'){
            return res.status(400).json({"message":"enter the correct amount"});
        }
        await expense.save();
        res.status(200).json({"message":"added income successfully"});
    } catch (error) {
        res.status(500).json({"message":"server error occured"});
        console.log(error);
    }
    
};

exports.getExpenses= async (req,res)=>{
    try {
        const expenses= await ExpenseModel.find().sort({createdAt:-1});
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({"message":"server error occured"});
        console.log(error);
    }
};

exports.deleteExpense= async (req,res)=>{
    const {id}=req.params;
    ExpenseModel.findByIdAndDelete(id).then(
        (expense)=>{
            res.status(200).json({"message":"expense deleted"});
        }
    ).catch(
        (err)=>{
            res.status(500).json({"message":"server error occured"});
        }
    );
};