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
        Name: {
            type: String,
            required: [true, "Name is must Required"],
            minlength: [3, 'Minimum Length of the name is 3'],
            maxlength: [10, 'Maximum Length of the name is 3'],
            uppercase: true,
            // lowercase: true,
            trim: true,
            enum: {
                values: ["Sadiq", "Nowreen"],
                message: "{VALUE} Is Not Supported"
            },


            //------------------------------------------- CUSTOM Validation ------------------------------------
            //CHANGES FROM HERE 
            validate: {
                validator: function (v) {
                    v.length == 10
                }, message: (props) => `${props.value} is not a valid data`

            },
            email: {

                type: String,
                required: [true, 'User email is required'],
                trim: true,
                lowercase: true,
                unique: true,
                validate: {
                    validator: function (v) {
                        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                        return emailRegex.test(v);
                    },
                    message: props => `${props.value} is not a valid phone number!`
                }
            },
            Roll: Number,
            Company: {
                type: String,
                required: true
            },
            CGPA: Number,
            Phone_Price: {
                type: Number,
                max: [98000, "product must be less than 1 Lakh"],
                min: 10000,
            },
            Future_Goal: String,
            StartDate: {
                type: Date,
                default: Date.now,
            }
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
                Phone_Price: req.body.Phone_Price,
                email: req.body.email
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
        // const CGPA = req.query.CGPA;
        let students;
        if (priceOfMobile) {
            students = await student.find({
                $and: [{ Phone_Price: { $lt: priceOfMobile } }, { CGPA: { $gt: 3 } }]
            })
                //.countDocuments();
                //Accending Sorting
                .sort({ CGPA: 1 })

                //Deccending Sorting
                // .sort({ CGPA: -1 })

                // Use of select
                .select({ _id: 0, CGPA: 1, })
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

// DELETE an ID 
app.delete('/student/:id', async (req, res) => {
    try {
        const deleteId = req.params.id;
        // just delete 
        // const dataStatus = await student.deleteOne({ _id: deleteId })
        // delete and Show
        const dataStatus = await student.findByIdAndDelete({ _id: deleteId })
        if (dataStatus) {
            res.status(200).send({
                success: true,
                msg: "Delete single Student-data ",
                data: dataStatus,
            });
        } else {

            res.status(404).send(
                {
                    success: false,
                    msg: "Not deleted"
                }
            )
        }


    } catch (error) {
        res.status(404).send({ msg: error.message })

    }

})

app.put('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // const updateData = await student.updateOne({ _id: id }, { $set: { CGPA: 3.48 } })
        // Add New : True for instant update
        const updateData = await student.findByIdAndUpdate({ _id: id }, { $set: { CGPA: 3.48 } }, { new: true });
        res.status(200).send(updateData)
        if (updateData) {
            res.status(200).send({
                success: true,
                msg: "Update single Student-data ",
                data: updateData
            });
        } else {

            res.status(404).send(
                {
                    success: false,
                    msg: "Not updated"
                }
            )
        }




    } catch (error) {
        res.status(404).send({ msg: error.message });
    }


});

app.listen(port, async () => {
    console.log('mongoDB is Fun')
    await connectDB();
});