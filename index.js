const express = require('express');
const cors = require('cors');
const connectDB = require('./connectDB/connect')
const authRouter = require('./routes/auth');
const carRouter = require('./routes/car')
const auth = require('./middleware/auth')

require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.get('/', function (req, res) {
    console.log("/user request called");
    res.send('Welcome ');
});

app.use('/', authRouter);
app.use('/', auth, carRouter)

const port = 5000;


const start = async () => {

    try {

        await connectDB(process.env.MONGO_URL);

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })


    } catch (error) {
        console.log(error);
    }

}

start();