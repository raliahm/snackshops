const snackModel = require('../models/snackshopModel.js');

exports.getCategories = (req, res) => {
    snackModel.getCategories((err, categories) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve categories' });
        }
        res.json(categories);
    });
};

exports.getSnacksByCategory = (req, res) => {
    const category = req.params.category;
    snackModel.getSnacksByCategory(category, (err, snacks) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve snacks for this category' });
      }
      res.json(snacks);
    });
  };
  

exports.getAllSnacks = (req, res) => {
    snackModel.getAllSnacks((err, snacks) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve snacks' });
        }
        res.json(snacks);
    });
};

exports.addSnack = (req, res) => {
    const { name, category, price, stock_qty } = req.body;
    if (!name || !category || !price || !stock_qty) {
        return res.status(400).json({ error: 'Missing required fields: name, category, price, or stock_qty' });
    }

    snackModel.addSnack(category, name, price, stock_qty, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add snack' });
        }
        res.status(201).json({ message: 'Snack added successfully', id: result.insertId });
    });
};

exports.getCustomers = (req, res) => {
    snackModel.getCustomers((err, customers) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve customers' });
      }
      res.json(customers);
    });
  };
  
  exports.addCustomer = (req, res) => {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email ) {
        return res.status(400).json({ error: 'Missing required fields: name, phone, or email' });
    }

    snackModel.addCustomer(name, phone, email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add customer' });
        }
        res.status(201).json({ message: 'Customer added successfully', id: result.insertId });
    });
};