const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account')();

router.get('/get', accountController.getAll);
router.post('/add', accountController.add);
router.put('/edit/:id', accountController.edit);
router.delete('/delete/:id', accountController.delete);

module.exports = router;
