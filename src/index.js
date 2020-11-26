const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'fgfhdasvxcvcc7',
    resave: true,
    saveUninitialized: true
}));

const account = require('./routes/account');
const integration = require('./routes/integration');
const transaction = require('./routes/transaction');

app.use('/api/account', account);
app.use('/api/integration', integration);
app.use('/api/transaction', transaction);

mongoose
    .connect('mongodb://db:27017/accounting', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(result => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(6000, () => console.log('Server ativo na porta 6000'));