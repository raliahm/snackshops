const express = require('express');
const router = express.Router();
const snackshopController = require('../controllers/snackshopController');


router.get('/', (req, res) => {
    res.send('Welcome to the Snackshop API!');
  });
router.get('/categories', snackshopController.getCategories);
router.get('/snacks/:category', snackshopController.getSnacksByCategory);
router.get('/snacks', snackshopController.getAllSnacks);
router.post('/snacks/add', snackshopController.addSnack);
router.get('/customers', snackshopController.getCustomers);
router.post('/customers/add', snackshopController.addCustomer);
router.get('/customers/:customerId', snackshopController.getCustomerByID);
module.exports = router;