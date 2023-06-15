const express = require("express");
const cookieParser = require ('cookie-parser');
const userRoutes = require("./src/router/router");
const dotenv = require('dotenv').config();
const app = express();
const PORT = 8000;

app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Up & Running on port:${PORT}`);
});
