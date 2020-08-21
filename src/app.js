const fs = require('fs');
const path = require('path');
const data = require('./data');

const express = require('express');
const app = express();
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

app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    })
});

app.get('/checking', (req, res) => {
    res.render('account', {
        account: accounts.checking
    })
});

app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    })
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    })
});

app.get('/transfer', (req, res) => {
    res.render('transfer', {
        title: 'Transfer'
    })
});

app.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    })
});

app.post('/payment', (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit
    });
});

app.post('/transfer', (req, res) => {

    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);
    writeJSON();
    res.render('transfer', {
        message: "Transfer Completed"
    });
});



app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});