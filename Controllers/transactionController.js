const Transaction = require("../Models/transactionModel")

exports.addTransaction = async (req, res) => {
    try {
        const { date, description, amount, category } = req.body
        const userId = req.payload
        if (!date || !description || !amount || !category) {
            return res.status(406).json("All fields required!!")
        } else {
            const newTransaction = new Transaction({
                userId, 
                date, 
                description, 
                amount, 
                category
            })

            await newTransaction.save()
            res.status(201).json({message: "Transaction added succesfully", newTransaction})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error adding transaction"})
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.payload });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions" });
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id
        await Transaction.findByIdAndDelete(id);
        res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting transaction" });
    }
}