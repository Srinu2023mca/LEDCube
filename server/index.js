const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const fs = require('fs')
const path = require('path'); 
const cookieParser = require("cookie-parser")

require("dotenv").config();

const app = express();
app.use(cookieParser())
app.use(express.json({extends: true}));


app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // Allow cookies to be sent
}));

const connectDB = require("./config/MongoDB.js");
connectDB();


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api",require("./routes/songRoutes.js"))


app.get("/", (req, res) => {
    res.send("API running 😊");

});


app.listen(5002, (err) => { 
    if (err) {
        console.log("Server not connected");
    } else {
        console.log("Server connected on port 5002");
    }
});
