// / POST: products create a product
// GET:-/products Return all the products
// GET:-/products/:id return a specific product
// PUT: /products/:id update a product based on id
// DELETE: /products/: id delete a product based on-id

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
        res.status(201).send({ studentData })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.get('/student', async (req, res) => {
    try {
        const students = await student.find()  /*.limit(1);*/
        if (students) {
            res.send(students);
        } else { res.send('Data Not Found') }
    } catch (error) {
        res.send({ msg: error.message })
    }
});


// access with id 
//Select -- for specific record

app.get('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // const students = await student.find({ _id: id }).select({ Name: 1, _id: 0 });
        // Using findOne()
        const students = await student.findOne({ _id: id }, { Name: 1, _id: 0 });
        res.send(students);

        // if (students) {
        //     res.send(students);
        // } else { res.send('Data Not Found') 
        // }

    } catch (error) {
        res.send({ msg: error.message })
    }
});



app.listen(port, async () => {
    console.log('mongoDB is Fun')
    await connectDB();
});