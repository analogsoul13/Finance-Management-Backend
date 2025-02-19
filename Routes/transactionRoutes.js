const express = require("express")
const { getTransactions, addTransaction, deleteTransaction } = require("../Controllers/transactionController")
const router = express.Router()
const jwtMiddleware = require('../Middlewares/jwtMiddleware')


router.get("/", jwtMiddleware, getTransactions)
router.post("/add", jwtMiddleware, addTransaction)
router.delete("/:id", jwtMiddleware, deleteTransaction)


module.exports = router