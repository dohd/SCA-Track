const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection setup
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sca_track",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// API endpoint to add a new customers
app.post("/add_customers", (req, res) => {
  const {
    custEmail,
    custName,
    custPIN,
    custStreet,
    custAddress,
    custPONumber,
    custLocation,
    telephone,
  } = req.body;
  const query =
    "INSERT INTO customer_details(customer_email, customer_name,customer_street,customer_address,customer_po_number, customer_location, customer_phone,kra_pin) VALUES(?,?,?,?,?,?,?,?);";
  connection.query(
    query,
    [
      custEmail,
      custName,
      custStreet,
      custAddress,
      custPONumber,
      custLocation,
      telephone,
      custPIN,
    ],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Define API endpoint to fetch customer details
app.get("/read_customers", (req, res) => {
  const query = "SELECT * FROM customer_details;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying customer records:", err);
      res.status(500).json({ error: "Failed to fetch customer records" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new distributors
app.post("/add_distributors", (req, res) => {
  const { 
    distID,
    distName,
    distAddress,
    distLocation,
    dtelephone,
    distEmail,
  } =req.body;
  const query =
    "INSERT INTO distributor_records(distributor_id, distributor_address,distributor_location, distributor_name, distributor_phone, distributor_email ) VALUES(?, ?, ?, ?, ?, ?);";
  connection.query(
    query,
    [
      distID, 
      distAddress, 
      distLocation, 
      distName, 
      dtelephone,
      distEmail,
    ],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Define API endpoint to fetch distributor deatils
app.get("/read_distributors", (req, res) => {
  const query = "SELECT * FROM distributor_records;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying distributor details:", err);
      res.status(500).json({ error: "Failed to fetch distributor details" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new distributors
app.post("/add_bank", (req, res) => {
  const {
    bankName,
    bankBranch,
    kesAcc,
    usdAcc,
    poundAcc,
    swift,
  } = req.body;

  const query =
    "INSERT INTO bank_records(bank_name, usd_account, kes_account, pounds_account, branch, swift_code) VALUES (?, ?, ?, ?,?,?);";
  connection.query(
    query,
    [
      bankName,
      usdAcc,
      kesAcc,
      poundAcc,
      bankBranch,
      swift,
    ],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Define API endpoint to fetch distributor deatils
app.get("/read_bankRecords", (req, res) => {
  const query = "SELECT * FROM bank_records;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying bank records:", err);
      res.status(500).json({ error: "Failed to fetch bank records" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new invoice item
app.post("/add_invoice_item", (req, res) => {
  const {
    item_id,
    invoice_number,
    item_name,
    quantity,
    unit_price,
    total_price,
    currency,
  } = req.body;
  const query =
    "INSERT INTO invoices(item_id, invoice_number, item_name, quantity, unit_price, total_price, currency) VALUES (?,?, ?, ?, ?,?, ?);";
  connection.query(
    query,
    [
      item_id,
      invoice_number,
      item_name,
      quantity,
      unit_price,
      total_price,
      currency,
    ],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Define API endpoint to fetch invoice items
app.get("/read_invoiceItems", (req, res) => {
  const query =
    "SELECT item_name, quantity, unit_price, total_price, currency  FROM invoices WHERE invoice_number = ?;";
  connection.query(query, [invoice_number], (err, results) => {
    if (err) {
      console.error("Error querying invoice records:", err);
      res.status(500).json({ error: "Failed to fetch invoice records" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new invoice message
app.post("/add_invoice_message", (req, res) => {
  const { invoice_number, invoice_message } = req.body;
  const query =
    "INSERT INTO invoice_message(invoice_number, message) VALUES (?, ?);";
  connection.query(query, [invoice_number, invoice_message], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Define API endpoint to fetch invoice message
app.get("/read_invoiceMessages", (req, res) => {
  const query =
    "SELECT message  FROM invoice_message WHERE invoice_number = ?;";
  connection.query(query, [invoice_number], (err, results) => {
    if (err) {
      console.error("Error querying invoice messages:", err);
      res.status(500).json({ error: "Failed to read invoice messages" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new lpo item
app.post("/add_lpo_item", (req, res) => {
  const {
    item_id,
    lpo_number,
    item_name,
    quantity,
    unit_price,
    total_price,
    currency,
  } = req.body;
  const query =
    "INSERT INTO lpo_s(item_id, lpo_number, item_name, quantity, unit_price, total_price, currency) VALUES (?,?, ?, ?, ?,?, ?);";
  connection.query(
    query,
    [
      item_id,
      lpo_number,
      item_name,
      quantity,
      unit_price,
      total_price,
      currency,
    ],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Define API endpoint to fetch lpo items
app.get("/read_lpoItems", (req, res) => {
  let lpo_number = req.query.lpo_number;
  const query =
    "SELECT item_name, quantity, unit_price, total_price, currency  FROM lpo_s WHERE lpo_number = ?;";
  connection.query(query, [lpo_number], (err, results) => {
    if (err) {
      console.error("Error querying lpo records:", err);
      res.status(500).json({ error: "Failed to fetch lpo records" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new lpo message
app.post("/add_lpo_message", (req, res) => {
  const { lpo_number, message } = req.body;
  const query =
    "INSERT INTO lpo_message(lpo_number, lpo_message) VALUES (?,?);";
  connection.query(query, [lpo_number, message], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Define API endpoint to fetch lpo message
app.get("/read_lpoMessage", (req, res) => {
  const query = "SELECT message  FROM lpo_message WHERE lpo_number = ?;";
  connection.query(query, [lpo_number], (err, results) => {
    if (err) {
      console.error("Error querying lpo messages:", err);
      res.status(500).json({ error: "Failed to read lpo messages" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new lpo details
app.post("/add_lpo", (req, res) => {
  const { 
    lpo_number, 
    lpo_date, 
    days,
    finalTotal,
    overallTotal,
    vatPrice,
    distributor,
  } = req.body;
  const query =
    "INSERT INTO lpo_dates (lpo_number , Lpo_date , days, total, sub_total, vat, distributor ) VALUES (?,?,?,?,?,?,?);";
  connection.query(query, [lpo_number, lpo_date, days, finalTotal, overallTotal, vatPrice, distributor ], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

//update begins hereeee

// Update customer record route
// Update the customer details in the database
app.put("/update/customers", (req, res) => {
  const {
    customer_address,
    customer_email,
    customer_location,
    customer_phone,
    customer_po_number,
    customer_street,
    customer_name,
    kra_pin,
  } = req.body;

  const query = `UPDATE customer_details SET customer_email = ?, kra_pin = ?, customer_street = ?, customer_address = ?, customer_po_number = ?, customer_location = ?, customer_phone = ? WHERE customer_name = ?;`;
  connection.query(
    query,
    [
      customer_email,
      kra_pin,
      customer_street,
      customer_address,
      customer_po_number,
      customer_location,
      customer_phone,
      customer_name,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error updating customer details in the database" });
      } else {
        res.json({ message: "Customer details updated successfully" });
      }
    }
  );
});

// Update distributor record route
app.put("/update/distributors", (req, res) => {
  const { 
    distributor_address,
    distributor_email,
    distributor_location,
    distributor_phone,
    distributor_name,

  } = req.body;

  // Update the customer deatils in the database
  const query = `UPDATE distributor_records SET distributor_location = ?, distributor_address = ?, distributor_email = ?, distributor_phone = ? WHERE distributor_name = ?;`;
  connection.query(
    query,
    [
      distributor_location,
      distributor_address,
      distributor_email,
      distributor_phone,
      distributor_name,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Error updating distributor records in the database",
        });
      } else {
        res.json({ message: "Distributor records updated successfully" });
      }
    }
  );
});

// Update bank record route
app.put("/update/bankRecords", (req, res) => {
  const {
    bank_name,
    branch,
    kes_account,
    usd_account,
    pound_account,
    swift_code,
  } = req.body;

  // Update the customer deatils in the database
  const query = `UPDATE bank_records SET usd_account = ?, kes_account = ?, pounds_account = ?, branch = ?, swift_code = ? WHERE bank_name = ?;`;
  connection.query(
    query,
    [
      usd_account,
      kes_account,
      pound_account,
      branch,
      swift_code,
      bank_name,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error updating bank records in the database" });
      } else {
        res.json({ message: "Bank records updated successfully" });
      }
    }
  );
});

// Update invoice record route
app.put("/update/invoice", (req, res) => {
  const {
    invoice_number,
    item_id,
    item_name,
    quantity,
    unit_price,
    total_price,
    currency,
  } = req.body;

  // Update invoice items ustomer deatils in the database
  const query = `UPDATE invoices SET item_name = ?, quantity = ?, unit_price = ?, total_price = ?, currency = ?  WHERE item_id = ? AND invoice_number = ?;`;

  connection.query(
    query,
    [
      item_name,
      quantity,
      unit_price,
      total_price,
      currency,
      item_id,
      invoice_number,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error updating invoice records in the database" });
      } else {
        res.json({ message: "Invoice records updated successfully" });
      }
    }
  );
});

// Update invoice message route
app.put("/update/invoiceMessage", (req, res) => {
  const { lpo_number, lpo_message } = req.body;

  // Update the customer deatils in the database
  const query = `UPDATE invoice_message SET message  = ? WHERE invoice_number = ?;`;
  connection.query(query, [lpo_message, lpo_number], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error updating invoice messages in the database" });
    } else {
      res.json({ message: "Message records updated successfully" });
    }
  });
});

// Update lpo record route
app.put("/update/lpo", (req, res) => {
  const {
    lpo_number,
    item_id,
    item_name,
    quantity,
    unit_price,
    total_price,
    currency,
  } = req.body;

  // Update the customer deatils in the database
  const query = `UPDATE lpo_s SET item_name = ?, quantity = ?, unit_price = ?, total_price = ?, currency = ?  WHERE item_id = ? AND lpo_number = ?;`;

  connection.query(
    query,
    [
      item_name,
      quantity,
      unit_price,
      total_price,
      currency,
      item_id,
      lpo_number,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Error updating lpo records in the database" });
      } else {
        res.json({ message: "lpo records updated successfully" });
      }
    }
  );
});

// Update lpo message route
app.put("/update/invoiceMessage", (req, res) => {
  const { invoice_number, invoice_message } = req.body;

  // Update the customer deatils in the database
  const query = `UPDATE invoice_message SET message  = ? WHERE invoice_number = ?;`;

  connection.query(query, [invoice_message, invoice_number], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error updating invoice messages in the database" });
    } else {
      res.json({ message: "Message records updated successfully" });
    }
  });
});

//delete operations


// Delete customer route
app.delete("/delete/bank", (req, res) => {
  let bankName = req.query.bankName;

  // Delete the bank from the database
  const query = `DELETE FROM bank_records WHERE bank_name = ?;`;
  connection.query(query, [bankName], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting customer from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

// Delete customer route
app.delete("/delete/customer", (req, res) => {
  let customerName = req.query.customerName;

  // Delete the customer from the database
  const query = `DELETE FROM customer_details WHERE  customer_name = ?;`;
  connection.query(query, [customerName], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting customer from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

// Delete distributor route
app.delete("/delete/distributor", (req, res) => {
  let distributorName = req.query.distributorName;

  // Delete the distributor from the database
  const query = `DELETE FROM distributor_records WHERE distributor_name = ?;`;
  connection.query(query, [distributorName], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting distributor from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});





// Delete  invoice item route
app.delete("/delete/invoiceItem", (req, res) => {
  const { invoice_number, item_id } = req.body;

  // Delete the invoice item from the database
  const query = `DELETE FROM invoices WHERE item_id = ? AND invoice_number = ?;`;
  connection.query(query, [item_id, invoice_number], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting invoice from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

// Delete  invoice msg route
app.delete("/delete/invoiceMsg", (req, res) => {
  const { invoice_number } = req.body;

  // Delete the invoice message from the database
  const query = `DELETE FROM invoice_message WHERE invoice_number = ?;`;
  connection.query(query, [invoice_number], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting invoice msg from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

// Delete  lpo item route
app.delete("/delete/lpoItem", (req, res) => {
  let itemName = req.query.itemName;

  // Delete the lpo item from the database
  const query = `DELETE FROM lpo_s WHERE item_name = ? ;`;
  connection.query(query, [itemName], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting ilpo item from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

// Delete  lpo msg route
app.delete("/delete/lpoMsg", (req, res) => {
  const { lpo_number } = req.body;

  // Delete the lpo message from the database
  const query = `DELETE FROM lpo_message WHERE lpo_number = ?;`;
  connection.query(query, [lpo_number], (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Error deleting lpo msg from the database" });
    } else {
      res.json({ message: "Deleted successfully" });
    }
  });
});

// Start the server
const port = 3000; // You can change this port number if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//counting
//count customers
app.get("/countBanks", (req, res) => {
  const query = "SELECT COUNT(*) as count_banks FROM bank_records;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying customer records:", err);
      res.status(500).json({ error: "Failed to count bank records" });
      return;
    }
    res.json(results);
  });
});