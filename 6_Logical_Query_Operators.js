// PUT: /products/:id update a product based on id
// DELETE: /products/: id delete a product based on-id
//Following next

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
        CGPA: Number,
        Phone_Price: Number,
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
// GET:-/products Return all the data
app.get('/', (req, res) => res.send('success'));
// / POST:   create a new data
app.post('/student', async (req, res) => {
    try {
        // Get data from request body
        const newStudent = new student(
            {
                Name: req.body.Name,
                Roll: req.body.Roll,
                Company: req.body.Company,
                Future_Goal: req.body.Future_Goal,
                CGPA: req.body.CGPA,
                Phone_Price: req.body.Phone_Price
            }
        );
        const studentData = await newStudent.save();
        res.status(201).send({ studentData })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
// Changes from here
app.get('/student', async (req, res) => {
    try {
        const priceOfMobile = req.query.Phone_Price;
        const CGPA = req.query.CGPA;
        let students;
        if (priceOfMobile && CGPA) {
            students = await student.find({
                $and: [{ Phone_Price: { $lt: priceOfMobile } }, { CGPA: { $gt: 3.7 } }],
                $or: [{ Phone_Price: { $lt: priceOfMobile } }, { CGPA: { $gt: 3 } }],
                $nor: [{ Phone_Price: { $lt: priceOfMobile } }, { CGPA: { $gt: CGPA } }]
            });
        } else {
            students = await student.find();
        }

        if (students) {
            res.status(200).send({
                success: true,
                msg: "return all student data ",
                data: students
            });
        } else {
            success: false,
                res.status(404).send('Data Not Found');
        }
    } catch (error) {
        res.send({ msg: error.message })
    }
});

// access with id 
// GET:-/products/:id return a specific data
app.get('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const students = await student.find({ _id: id });
        if (students) {
            res.status(200).send({
                success: true,
                msg: "return Student-data ",
                data: students
            });
        } else {
            success: false,
                res.status(404).send('Data Not Found')
        }

    } catch (error) {
        res.send({ msg: error.message })
    }
});

app.listen(port, async () => {
    console.log('mongoDB is Fun')
    await connectDB();
});