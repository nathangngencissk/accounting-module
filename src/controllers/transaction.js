
const Transaction = require('../models/Transaction')
const axios = require('axios')

module.exports = () => {

    const controller = {};

    controller.getAll = (req, res) => {
        Transaction.find()
            .then(transactions => {
                res.status(200).json(transactions);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newTransaction = new Transaction({
            account: req.body.account,
            code: req.body.code,
            value: req.body.value,
            operation: req.body.operation,
            integration: req.body.integration,
            name: req.body.name
        });

        newTransaction
            .save()
            .then(transaction => {
                res.json(transaction);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newTransaction = new Transaction({
            _id: req.params.id,
            account: req.body.account,
            code: req.body.code,
            value: req.body.value,
            operation: req.body.operation,
            integration: req.body.integration,
            name: req.body.name
        });

        Transaction.findOneAndUpdate({ _id: req.params.id }, newTransaction, { new: true })
            .then(transaction => {
                res.json(transaction);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Transaction.findOneAndDelete({ _id: req.params.id })
            .then(transaction => {
                res.json(transaction);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.createTransaction = async (req, res) => {
        const newTransaction = new Transaction({
            account: req.body.account,
            code: req.body.code,
            value: req.body.value,
            operation: req.body.operation,
            integration: req.body.integration,
            name: req.body.name
        });

        let transaction = await newTransaction.save()

        let payloadTitle = {
            openValue: req.body.value,
            originalValue: req.body.value,
            closingDate: req.body.closingDate,
            state: "ABERTO",
            transaction: transaction._id,
            discount: req.body.discount,
            interest: req.body.interest,
        }

        let titleRes = await axios.post('http://billing-server:3030/api/title/add', data = payloadTitle);

        let title = titleRes.data

        let payloadDocument = {
            title: title._id,
            type: req.body.type
        }

        let documentRes = await axios.post('http://billing-server:3030/api/document/add', data = payloadDocument);

        let document = documentRes.data

        response = {
            transaction: transaction,
            title: title,
            document: document
        }

        res.json(response)
    }

    return controller;
}