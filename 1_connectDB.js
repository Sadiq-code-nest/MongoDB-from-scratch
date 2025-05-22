const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4001;

/* 
// connect with then and catch
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Mongoose is connected'))
    .catch((error) => {
        console.log('Mongoose is not connected');
        console.log(error);
        process.exit(1);
    });

*/

// Connect with Async await
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/testProject');
        console.log('DataBase is connected');
    } catch (error) {
        console.log('DataBase ERROR !!!');
        console.log(error.message);
        process.exit(1);
    }
}
//Home route
app.get('/', (req, res) => res.send('success'));
app.listen(port, async () => {
    console.log('mongoDB is Fun')
    await connectDB();
});