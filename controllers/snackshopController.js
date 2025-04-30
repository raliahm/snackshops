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

exports.getCustomerByID = (req, res) => {
    const customerId = req.params.customerId;  // Get customerId from URL parameter
    console.log(`Looking for customer with ID: ${customerId}`);  // Log the customer ID

    // Call the function to get the customer data by ID
    snackModel.getCustomerByID(customerId, (err, customer) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve customer data' });
        }
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);  // Return the customer data as JSON
    });
};

exports.getAllOrders = (req, res) => {
    snackModel.getAllOrders((err, orders) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve orders' });
      }
      res.json(orders);
    });
  };

exports.getAllSales = (req, res) => {
snackModel.getAllSales((err, sales) => {
    if (err) {
    return res.status(500).json({ error: 'Failed to retrieve sales' });
    }
    res.json(sales);
});
};

exports.getOrderForCustomer = (req, res) => {
    const customerId = req.params.customerId;  // Get customerId from URL parameter
    console.log(`Looking for customer with ID: ${customerId}`);  // Log the customer ID
    const orderId = req.params.orderId;
    console.log(`Looking for order with ID: ${orderId}`);  // Log the customer ID

    // Call the function to get the customer data by ID
    snackModel.getOrderForCustomer(customerId, orderId, (err, order) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve order data' });
        }
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);  // Return the customer data as JSON
    });
};

exports.getOrderItems = (req, res) => {
    const orderId = req.params.orderId;  // Get customerId from URL parameter
    console.log(`Looking for customer with ID: ${orderId}`);  // Log the customer ID

    // Call the function to get the customer data by ID
    snackModel.getOrderItems(orderId, (err, order) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve order items data' });
        }
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);  // Return the customer data as JSON
    });
};
