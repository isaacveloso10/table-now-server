const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Table Now API is running");
});

const PORT = 5005

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

