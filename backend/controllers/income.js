const IncomeModel = require("../models/IncomeModel");
// note that the date format should be month(06)-date(26)-year(2002)

exports.addIncome= async (req,res)=>{
    console.log(req.body);
    const {title,amount,category,description,date}=req.body;
    const income= IncomeModel({
        title, amount,category,description,date
    })

    console.log(typeof(income.amount));
    console.log(income);

    try {
        if(!title || !description || !category || !date){
            return res.status(400).json({"message":"please fill all the required fields"});
        }
        if(amount<0 || !amount==='number'){
            return res.status(400).json({"message":"enter the correct amount"});
        }
        await income.save();
        res.status(200).json({"message":"added income successfully"});
    } catch (error) {
        res.status(500).json({"message":"server error occured"});
        console.log(error);
    }
    
};

exports.getIncomes= async (req,res)=>{
    try {
        const incomes= await IncomeModel.find().sort({createdAt:-1});
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({"message":"server error occured"});
        console.log(error);
    }
};

exports.deleteIncome= async (req,res)=>{
    const {id}=req.params;
    IncomeModel.findByIdAndDelete(id).then(
        (income)=>{
            res.status(200).json({"message":"income deleted"});
        }
    ).catch(
        (err)=>{
            res.status(500).json({"message":"server error occured"});
        }
    );
};