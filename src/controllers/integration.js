
const Integration = require('../models/Integration');
const Transaction = require('../models/Transaction');

module.exports = () => {

    const controller = {};

    controller.getAll = (req, res) => {
        Integration.find()
            .then(integrations => {
                res.status(200).json(integrations);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.add = (req, res) => {
        const newIntegration = new Integration({
            month: req.body.month,
            year: req.body.year
        });

        newIntegration
            .save()
            .then(integration => {
                res.json(integration);
            })
            .catch(error => {
                res.status(500).json(error);
            });
    }

    controller.edit = (req, res) => {
        const newIntegration = new Integration({
            _id: req.params.id,
            month: req.body.month,
            year: req.body.year
        });

        Integration.findOneAndUpdate({ _id: req.params.id }, newIntegration, { new: true })
            .then(integration => {
                res.json(integration);
            })
            .catch(error => res.status(500).json(error));
    }


    controller.delete = (req, res) => {
        Integration.findOneAndDelete({ _id: req.params.id })
            .then(integration => {
                res.json(integration);
            })
            .catch(error => res.status(500).json(error));
    }

    controller.getIntegration = async (req, res) => {
        const month = req.body.month;
        const year = req.body.year;

        let integration = await Integration.findOne({ ...req.body });

        let transactions = await Transaction.find({ integration: integration._id });

        if (transactions.length == 0) {
            res.json([]);
            return
        }

        const reducer = (accumulator, current) => {
            if (current.operation == 'CREDITO') {
                return accumulator + current.value;
            }
            else {
                return accumulator - current.value;
            }
        }

        let result = transactions.reduce(reducer, 0)

        let response = {
            integration: `${month}/${year}`,
            transactions: transactions,
            result: result
        }

        res.json(response);

    }

    return controller;
}