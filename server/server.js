require('dotenv').config();
const express = require("express");
const db = require('./db')
const morgan = require('morgan')
const app = express();

app.use(express.json());



//Get all Restaurants
app.get("/api/v1/restaurants", async (req,res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                restaurants: results.rows 
            }  
        });  
    } catch (err) {
       console.log(err);
    }
});


//Get a Restaurants
app.get("/api/v1/restaurants/:id", async (req,res) => {


    console.log(req.params.id);
    try {
        
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);

        res.status(200).json({
        status: "success",
        data:{
            restaurants: results.rows[0]
        }
            
        });
    } catch (err) {
         console.log(err);
    }

});


//Create a restaurants
app.post("/api/v1/restaurants/", async (req,res) => {
console.log(req.body);    
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
        [req.body.name, req.body.location, req.body.price_range]);

        res.status(201).json({
            status: "success",
            data:{
                restaurants: results.rows[0]   
            }
            
        });   


    } catch (err) {
        console.log(err);
    }

    

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