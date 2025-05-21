const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4001;

// Connect with Async await
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/testProject');
        console.log('DataBase is connected');
    } catch (error) {
        console.log('ERROR !!!');
        console.log(error.message);
        process.exit(1);
    }
}






app.get('/', (req, res) => res.send('success'));
app.listen(port, async () => {
    console.log('mongoDB is Fun')
    await connectDB();
});