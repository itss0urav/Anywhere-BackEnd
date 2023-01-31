const express = require("express")
const app = express()
const userRoutes = require("./routes/authRoutes")



//Routes

app.use("/admin", userRoutes)


app.listen(5000, () => console.log("Anywhere backend is running"))

