const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4001;

//Make newly student Schema
const studentSchema = new mongoose.Schema(
    {
        Name: String,
        Roll: Number,
        Company: {
            type: String,
            required: true
        },
        Future_Goal: String,
        StartDate: {
            type: Date,
            default: Date.now,
        }
    }
)
//Create mongoose model named student
const student = mongoose.model("student", studentSchema);

// Connect DB with Async await
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