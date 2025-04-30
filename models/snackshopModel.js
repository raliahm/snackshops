const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/snackshop.db');

module.exports = {
  // Get all distinct categories
  getCategories: (cb) => {
    const sql = `SELECT DISTINCT category FROM Snacks WHERE category IS NOT NULL`;
    db.all(sql, [], (err, rows) => {
      if (err) return cb(err);
      const categories = rows.map(row => row.category);
      cb(null, categories);
    });
  },
  

// Get snacks by category with optional limit
getSnacksByCategory: (category, cb) => {
  const sql = `
    SELECT name, price, category
    FROM Snacks
    WHERE category = ?
  `;
  db.all(sql, [category], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows);
  });
}
,
// Get all snacks (randomized)
getAllSnacks: (cb) => {
  const sql = `
    SELECT name, price, category, stock_qty
    FROM Snacks
    ORDER BY RANDOM()
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows);
  });
},
// Add a snack: directly insert into Snacks table
addSnack: (category, name, price,stock_qty, cb) => {
  const insertSnack = `
    INSERT INTO Snacks (name, price, category, stock_qty)
    VALUES (?, ?, ?, ?)
  `;
  db.run(insertSnack, [name, price, category, stock_qty], function (err) {
    if (err) return cb(err);
    cb(null, { id: this.lastID });
  });
 },
 addCustomer: (name, phone, email, cb) => {
  const insertCust = `
    INSERT INTO Customers (name, phone, email)
    VALUES (?, ?, ?)
  `;
  db.run(insertCust, [name, phone, email], function (err) {
    if (err) return cb(err);
    cb(null, { id: this.lastID }); // Return the new customer ID
  });
 },
 getCustomers: (cb) => {
  const sql = `SELECT customer_id, name, phone, email FROM Customers`;
  db.all(sql, [], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows); // Full info for each customer
  });
}
}

