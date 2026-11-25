const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
        console.log("Successful connection")
    })
    .catch((error) => {
        console.log("Failed connection", error)
    });