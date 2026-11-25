try {
    process.loadEnvFile()
} catch (error) {
    console.warn(".env file not found, using default environment values")
}

const express = require("express");

const app = express();

require("./db");

const addConfig = require("./config");
addConfig(app);

app.get("/", (req, res) => {
    res.send("Table Now API is running");
});

const PORT = 5005

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

