const express = require('express');
const router = express.Router();
const integrationController = require('../controllers/integration')();

router.get('/get', integrationController.getAll);
router.post('/add', integrationController.add);
router.post('/get', integrationController.getIntegration);
router.put('/edit/:id', integrationController.edit);
router.delete('/delete/:id', integrationController.delete);

module.exports = router;
