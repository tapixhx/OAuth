const express = require('express');
const mongoose  =require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json());
app.use('/auth', authRoutes);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-wpluf.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`
).then(result => {
    app.listen(8080);
})
.catch(err => console.log(err),)