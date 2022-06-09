
const express = require('express');
require('dotenv').config();
const port = 1010;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const url = 'mongodb://localhost/DiaryApp';

mongoose.connect(url).then(() => {
    console.log('connected to database');
}).catch((error) => {
    console.log(error);
});

app.use(cors());
app.use(express.json());

app.get('/',);
app.use('/api', require('./router/router'));
app.use('/api', require('./OtherContoller/SignUpUser'));
app.use('/api', require('./router/uploadrouter'));

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
