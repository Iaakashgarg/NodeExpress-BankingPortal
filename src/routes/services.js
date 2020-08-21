const express = require('express');
const router = express.Router();
const data = require('../data');
const accounts = data.accounts;
const writeJSON = data.writeJSON;

router.get('/transfer', (req, res) => {
    res.render('transfer', {
        title: 'Transfer'
    })
});

router.get('/payment', (req, res) => {
    res.render('payment', {
        account: accounts.credit
    })
});

router.post('/payment', (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {
        message: "Payment Successful",
        account: accounts.credit
    });
});

router.post('/transfer', (req, res) => {

    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);
    writeJSON();
    res.render('transfer', {
        message: "Transfer Completed"
    });
});

module.exports = router;