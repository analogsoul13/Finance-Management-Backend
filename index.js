require("dotenv").config()
require('./Connection/db')

const express = require("express")
const cors = require("cors")
const transactionRoutes = require("./Routes/transactionRoutes")
const userRoutes = require("./Routes/userRoutes")
const financeApp = express()

financeApp.use(cors())
financeApp.use(express.json())


financeApp.use("/user", userRoutes)
financeApp.use("/transactions", transactionRoutes)

const PORT = 3000 || process.env.PORT

financeApp.listen(PORT, () => {
   console.log("Server running at :", PORT);
})

financeApp.get('/', (req, res) => {
   res.send("<h1>Request hit</h1>")
})

