const express = require('express');
const morgan = require('morgan');
//const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');


const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

connectDB();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
//HTTP request logger
app.use(morgan('tiny'));

 





app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

//Routes


app.listen(PORT, console.log(`Server is starting at ${PORT}`));