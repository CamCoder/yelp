require('dotenv').config();
const express = require("express");
const db = require('./db')

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());



//Get all Restaurants
app.get("/api/v1/restaurants", async (req,res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants");

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

    try {
        
        const restaurant = await db.query("select * from restaurants where id = $1", [req.params.id]);

        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id]);

        res.status(200).json({
        status: "success",
        data:{
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
        }
            
        });
    } catch (err) {
         console.log(err);
    }

});


//Create a restaurants
app.post("/api/v1/restaurants/", async (req,res) => {
    
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
        [req.body.name, req.body.location, req.body.price_range]);

        res.status(201).json({
            status: "success",
            data:{
                restaurant: results.rows[0]   
            }
            
        });   


    } catch (err) {
        console.log(err);
    }

    

});

//Update Restaurants
app.put("/api/v1/restaurants/:id", async (req,res) => {

    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);

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


//delete
app.delete("/api/v1/restaurants/:id", async (req,res) => {
    try {
        const results = await db.query("DELETE FROM restaurants where id = $1 returning *", [req.params.id]);
        res.status(204).json({
        status: "success"
        
    });
        // console.log(results);
        // console.log(results.rows[0]);
    } catch (err) {
        console.log(err);
    }
    

});

//Add Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", 
        [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }

})


const port = process.env.PORT || 2020;

app.listen(port, () =>{
    // console.log('Server is up and listening on port', port);
    console.log(`server is up and listening on port ${port}`);
});