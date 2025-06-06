const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Create student Schema
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
//Create student model
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
app.post('/student', async (req, res) => {
    try {
        // Get data from request body
        const newStudent = new student(
            {
                Name: req.body.Name,
                Roll: req.body.Roll,
                Company: req.body.Company,
                Future_Goal: req.body.Future_Goal
            }
        );
        const studentData = await newStudent.save();

        /* // Insert Many documents from here
                const studentData = await student.insertMany([
                    {
                        Name: "nupur",
                        Roll: 87,
                        Company: "shikho",
                        Future_Goal: "BCS Cadre"
                    },
                    {
                        Name: "sakib",
                        Roll: 62,
                        Company: "GP",
                        Future_Goal: "Google"
        
                    }
                ]);
        
        */

        res.status(201).send({ studentData })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})
app.listen(port, async () => {
    console.log('mongoDB is Fun')
    await connectDB();
});