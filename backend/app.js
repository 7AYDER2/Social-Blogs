const express = require("express");
const connectToDb = require("./config/connectToDb")
const helmet = require("helmet")
const dotenv = require("dotenv")
dotenv.config()

// Connect to Db
connectToDb();

// Init app 
const app = express()

// Middlewares
app.use(express.json())
app.use(helmet())

// Routes 

app.use("/api/auth",require("./routes/authRoute"));
app.use("/api/users",require("./routes/usersRoute"))

// Running to Server 
const port = process.env.PORT || 5000
app.listen(port,()=> console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`));
