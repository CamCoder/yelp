require('dotenv').config();
const express = require("express");

const app = express();

app.get("/getRestaurants", (req,res) => {
    console.log("Get All Restaurants");
})


const port = process.env.PORT || 2020;

app.listen(port, () =>{
    // console.log('Server is up and listening on port', port);
    console.log(`server is up and listening on port ${port}`);
});