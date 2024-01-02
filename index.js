const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log('MongoDB Connected!');
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
};

const corsOptions = {
    origin: '*',
    credentials: true, 
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
connectDB();
  
app.use('/user', require('./routes/user'));
app.use('/company', require('./routes/company'));
app.use('/product', require('./routes/product'));



const PORT =  process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));