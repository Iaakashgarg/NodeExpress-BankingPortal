const fs = require('fs');
const path = require('path');
const data = require('./data');

const express = require('express');
const app = express();

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const viewPath = path.join(__dirname + '/views');
app.set('views', viewPath);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

const accounts = data.accounts;
const users = data.users;
const writeJSON = data.writeJSON;


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Account Summary',
        accounts: accounts
    })
});



app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    })
});

app.use('/account',accountRoutes);
app.use('/services',servicesRoutes);





app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});