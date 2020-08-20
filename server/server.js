require('dotenv').config();
const express = require("express");
const morgan = require('morgan')
const app = express();

app.use(express.json());



//Get all Restaurants
app.get("/api/v1/restaurants", (req,res) => {
    res.status(200).json({
        status: "success",
        data:{
            restaurants: ["mcdonalds", "wendys", "pizza"]    
        }
        
    });
});

//Get a Restaurants
app.get("/api/v1/restaurants/:id", (req,res) => {


    console.log(req.params);
    res.status(200).json({
        status: "success",
        data:{
            restaurants: ["mcdonalds", "wendys", "pizza"]    
        }
        
    });
});


//Create a restaurants
app.post("/api/v1/restaurants/", (req,res) => {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data:{
            restaurants: ["mcdonalds", "wendys", "pizza"]    
        }
        
    });

});

//Update Restaurants
app.put("/api/v1/restaurants/:id", (req,res) => {


    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data:{
            restaurants: ["mcdonalds", "wendys", "pizza"]    
        }
        
    });

});


//delete
app.delete("/api/v1/restaurants/:id", (req,res) => {

    res.status(204).json({
        status: "success"
        
    });

});

const port = process.env.PORT || 2020;

app.listen(port, () =>{
    // console.log('Server is up and listening on port', port);
    console.log(`server is up and listening on port ${port}`);
});