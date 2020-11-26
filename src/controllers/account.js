const Account = require('../models/Account')

module.exports = () => {

    const controller = {};

    controller.getAll = (req, res) => {
        Account.find()
            .then(accounts => {
                res.status(200).json(accounts);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newAccount = new Account({
            cpf: req.body.cpf,
            cnpj: req.body.cnpj
        });

        newAccount
            .save()
            .then(account => {
                res.json(account);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newAccount = new newAccount({
            _id: req.params.id,
            cpf: req.body.cpf,
            cnpj: req.body.cnpj
        });

        Account.findOneAndUpdate({ _id: req.params.id }, newAccount, { new: true })
            .then(account => {
                res.json(account);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Account.findOneAndDelete({ _id: req.params.id })
            .then(account => {
                res.json(account);
            })
            .catch(error => res.status(500).json(error));
    }

    return controller;
}