const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connection =  require('./connection');
const todoRoute = require('./routes/posts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
connection.init();
todoRoute.configure(app);
app.listen(8000, () => {
    console.log('App running http://localhost:8000');
})