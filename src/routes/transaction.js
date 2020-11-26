const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction')();

router.get('/get', transactionController.getAll);
router.post('/add', transactionController.add);
router.post('/create', transactionController.createTransaction);
router.put('/edit/:id', transactionController.edit);
router.delete('/delete/:id', transactionController.delete);

module.exports = router;
