-- Create database
CREATE TABLE IF NOT EXISTS Suppliers (
    supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(150)
);

-- Table: Snacks
CREATE TABLE IF NOT EXISTS Snacks (
    snack_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(8,2) NOT NULL,  -- Adjusted DECIMAL size for larger prices
    category VARCHAR(50),
    stock_qty INTEGER DEFAULT 0
);

-- Table: Customers
CREATE TABLE IF NOT EXISTS Customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);

-- Table: Orders (Customer view)
CREATE TABLE IF NOT EXISTS Orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,  -- Allow NULL for customer_id
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE SET NULL
);

-- Table: Order_Items (Snacks per Order)
CREATE TABLE IF NOT EXISTS Order_Items (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    snack_id INTEGER,
    quantity INTEGER NOT NULL,
    item_price DECIMAL(6,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE,
    FOREIGN KEY (snack_id) REFERENCES Snacks(snack_id)
        ON DELETE CASCADE
);

-- Table: Sales (Admin-side log of each transaction)
CREATE TABLE IF NOT EXISTS Sales (
    sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER UNIQUE, -- one-to-one with Orders (consider removing UNIQUE if not needed)
    sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(8,2) NOT NULL,
    payment_method VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE
);
