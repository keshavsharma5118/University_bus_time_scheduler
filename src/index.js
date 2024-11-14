const express = require("express");
const path = require("path");
const collection = require("./config");
const bcryptjs = require('bcryptjs');

const app = express();

// Convert data into JSON format
app.use(express.json());
// Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req,res)=> {
    res.render("login")
});

app.get("/contact", (req,res)=> {
    res.render("contact")
});

app.get("/about", (req,res)=>{
    res.render("about")
});

app.get("/public-display", (req,res)=> {
    res.render("public-display")
});

app.get("/assignroute", (req,res)=>{
    res.render("assignroute")
});

app.get("/home", (req,res)=>{
    res.render("home")
});

app.get("/manager", (req,res)=>{
    res.render("manager")
});

app.get("/contactadmin", (req, res)=>{
    res.render("contactadmin")
});

// Register User
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            password: req.body.password
        };

        // Check if the username already exists in the database
        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            return res.status(400).send('User already exists. Please choose a different username.');
        }

        // Hash the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcryptjs.hash(data.password, saltRounds);

        // Replace the original password with the hashed one
        data.password = hashedPassword;

        // Save the user data in the database
        const userdata = await collection.insertMany(data);
        console.log("User registered:", userdata)
        res.render("registered");
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send('An error occurred during registration.');
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists in the database
        const user = await collection.findOne({ name: username });
        if (!user) {
            return res.status(400)
            .render("usernotfound")
        }

        // Compare the hashed password with the entered password
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400)
            .render("incorrect")
        }

        res.render("manager");
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
});

// Define Port for Application
const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
