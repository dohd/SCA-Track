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
    custIDString,
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
    "INSERT INTO customer_details(cust_id, customer_email, customer_name,customer_street,customer_address,customer_po_number, customer_location, customer_phone,kra_pin) VALUES(?,?,?,?,?,?,?,?,?);";
  connection.query(
    query,
    [
      custIDString,
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

app.get("/read_customer", (req, res) => {
  let selectedCustomer = req.query.selectedCustomer;
  const query =
    "SELECT customer_email , customer_address, customer_phone  FROM customer_details WHERE customer_name = ?;";
  connection.query(query, [selectedCustomer], (err, results) => {
    if (err) {
      console.error("Error querying lpo records:", err);
      res.status(500).json({ error: "Failed to fetch lpo records" });
      return;
    }
    res.json(results);
  });
});


// API endpoint to add a new distributors
app.post("/add_distributors", (req, res) => {
  const { 
    distIDString,
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
      distIDString, 
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

// Define API endpoint to fetch lpo items
app.get("/read_distributor", (req, res) => {
  let selectedDistributor = req.query.selectedDistributor;
  const query =
    "SELECT distributor_email , distributor_address, distributor_phone  FROM distributor_records WHERE distributor_name = ?;";
  connection.query(query, [selectedDistributor], (err, results) => {
    if (err) {
      console.error("Error querying lpo records:", err);
      res.status(500).json({ error: "Failed to fetch lpo records" });
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

// Define API endpoint to fetch lpo items
app.get("/read_bank", (req, res) => {
  let selectedBank = req.query.selectedBank;
  const query =
    "SELECT usd_account , kes_account, pounds_account, branch, swift_code FROM bank_records WHERE bank_name = ?;";
  connection.query(query, [selectedBank], (err, results) => {
    if (err) {
      console.error("Error querying lpo records:", err);
      res.status(500).json({ error: "Failed to fetch lpo records" });
      return;
    }
    res.json(results);
  });
});


// Define API endpoint to fetch lpo-number 
app.get("/read_lpo_number", (req, res) => {
  const query = "SELECT lpo_no FROM `latest_id` ";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying lpo NO:", err);
      res.status(500).json({ error: "Failed to fetch lpo NO" });
      return;
    }
    res.json(results);
  });
});

// Define API endpoint to fetch invoice-number 
app.get("/read_invoice_number", (req, res) => {
  const query = "SELECT invoice_no FROM `latest_id` ";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying lpo NO:", err);
      res.status(500).json({ error: "Failed to fetch lpo NO" });
      return;
    }
    res.json(results);
  });
});

// Define API endpoint to fetch invoice-number 
app.get("/read_custID", (req, res) => {
  const query = "SELECT cust_id FROM `latest_id` ";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying lpo NO:", err);
      res.status(500).json({ error: "Failed to fetch lpo NO" });
      return;
    }
    res.json(results);
  });
});

// Define API endpoint to fetch invoice-number 
app.get("/read_distID", (req, res) => {
  const query = "SELECT dist_id FROM `latest_id` ";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying lpo NO:", err);
      res.status(500).json({ error: "Failed to fetch lpo NO" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new invoice item
app.post("/add_invoice_item", (req, res) => {
  const {
    invoiceNumberString,
    itemDescription,
    quantity,
    unitPrice,
    totalPrice,
    selectedCurrency,
  } = req.body;
  const query =
    "INSERT INTO invoices(invoice_number, item_name, quantity, unit_price, total_price, currency) VALUES (?,?, ?, ?, ?,?);";
  connection.query(
    query,
    [
      invoiceNumberString,
      itemDescription,
      quantity,
      unitPrice,
      totalPrice,
      selectedCurrency,
    ],
    (err, result) => {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

// Define API endpoint to fetch invoice items
app.get("/read_invoiceItems", (req, res) => {
  let  invoiceNumberString = req.query. invoiceNumberString;
  const query =
    " SELECT * FROM invoices WHERE invoice_number = ?;";
  connection.query(query, [invoiceNumberString], (err, results) => {
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
  const { invoiceNumberString, message, } = req.body;
  const query =
    "INSERT INTO invoice_message(invoice_number, message) VALUES (?, ?);";
  connection.query(query, [invoiceNumberString, message,], (err, result) => {
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
app.post("/add_lpo_item", async (req, res) => {
  const {
    lpoNumberString,
    itemDescription,
    quantity,
    unitPrice,
    totalPrice,
    selectedCurrency,
  } = req.body;
  const query =
    "INSERT INTO lpo_s(lpo_number, item_name, quantity, unit_price, total_price, currency) VALUES (?,?, ?, ?, ?,?);";
  connection.query(query, [
    lpoNumberString,
    itemDescription,
    quantity,
    unitPrice,
    totalPrice,
    selectedCurrency,
  ], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Define API endpoint to fetch lpo itemsr 
app.get("/read_lpoItems", (req, res) => {

  let  lpoNumberString = req.query. lpoNumberString;

  const query = "SELECT * FROM lpo_s WHERE lpo_number = ? ";
  connection.query(query,[lpoNumberString],(err, results) => {
    if (err) {
      console.error("Error querying lpo items.", err);
      res.status(500).json({ error: "Failed to fetch lpo NO" });
      return;
    }
    res.json(results);
  });
});

// API endpoint to add a new lpo message
app.post("/add_lpo_message", (req, res) => {
  const { lpoNumberString,
    message, } = req.body;
  const query =
    "INSERT INTO lpo_message(lpo_number, lpo_message) VALUES (?,?);";
  connection.query(query, [lpoNumberString,
    message,], (err, result) => {
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
app.post("/add_invoice", (req, res) => {
  const { 
    invoiceNumberString,
    invoice_date,
    advancePayment,
    subtotalPrice,
    overallTotalPrice,
    vatPrice,
    selectedCustomer,
    selectedBank,
  } = req.body;
  const query =
    "INSERT INTO invoice_details (invoice_number , invoice_date , advance_payment, total, sub_total, vat, customer, bank ) VALUES (?,?,?,?,?,?,?,?);";
  connection.query(query, [
    invoiceNumberString,
    invoice_date,
    advancePayment,
    overallTotalPrice,
    subtotalPrice,
    vatPrice,
    selectedCustomer,
    selectedBank,], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// API endpoint to add a new lpo details
app.post("/add_lpo", (req, res) => {
  const { 
    lpoNumberString,
            lpo_date,
            days,
            subtotalPrice,
            overallTotalPrice,
            vatPrice,
            selectedDistributor,
  } = req.body;
  const query =
    "INSERT INTO lpo_dates (lpo_number , Lpo_date , days, total, sub_total, vat, distributor ) VALUES (?,?,?,?,?,?,?);";
  connection.query(query, [
    lpoNumberString,
    lpo_date,
    days,
    overallTotalPrice,
    subtotalPrice,
    vatPrice,
    selectedDistributor,], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

// Define API endpoint to read lpo
app.get("/read_lpos", (req, res) => {
  const query = "SELECT * FROM lpo_dates;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying bank records:", err);
      res.status(500).json({ error: "Failed to fetch bank records" });
      return;
    }
    res.json(results);
  });
});

// Define API endpoint to read invoice
app.get("/read_invoices", (req, res) => {
  const query = "SELECT * FROM invoice_details;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying bank records:", err);
      res.status(500).json({ error: "Failed to fetch bank records" });
      return;
    }
    res.json(results);
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

  // Update the bank deatils in the database
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

// Update lpo number record route
app.put("/update/lpo_number", (req, res) => {
  const { 
    currentLpoNumber,
  } = req.body;

  // Update the new lpo number in the database
  const query = `UPDATE latest_id SET lpo_no= ?;`;
  connection.query(
    query,
    [
      currentLpoNumber,
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

// Update invoice number record route
app.put("/update/invoice_number", (req, res) => {
  const { 
    currentInvoiveNumber,
  } = req.body;

  // Update the new lpo number in the database
  const query = `UPDATE latest_id SET invoice_no= ?;`;
  connection.query(
    query,
    [
      currentInvoiveNumber,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Error updating  records in the database",
        });
      } else {
        res.json({ message: " records updated successfully" });
      }
    }
  );
});

// Update customer ID number record route
app.put("/update/custID", (req, res) => {
  const { 
    currentCustomerID,
  } = req.body;

  // Update the new lpo number in the database
  const query = `UPDATE latest_id SET cust_id = ?;`;
  connection.query(
    query,
    [
      currentCustomerID,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Error updating  records in the database",
        });
      } else {
        res.json({ message: " records updated successfully" });
      }
    }
  );
});

// Update distributor ID number record route
app.put("/update/distID", (req, res) => {
  const { 
    currentDistrubutorID,
  } = req.body;

  // Update the new lpo number in the database
  const query = `UPDATE latest_id SET dist_id = ?;`;
  connection.query(
    query,
    [
      currentDistrubutorID,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Error updating  records in the database",
        });
      } else {
        res.json({ message: " records updated successfully" });
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
  const { myLpoNo, lpo_message } = req.body;

  // Update the customer deatils in the database
  const query = `UPDATE invoice_message SET message  = ? WHERE invoice_number = ?;`;
  connection.query(query, [lpo_message, myLpoNo], (err, result) => {
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
  
  let invoiceNumberString  = req.query. invoiceNumberString;
  let  itemName = req.query.itemName;

  // Delete the invoice item from the database
  const query = `DELETE FROM invoices WHERE item_name = ? AND invoice_number = ?;`;
  connection.query(query, [itemName, invoiceNumberString], (err, result) => {
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
  let  lpoNumberString = req.query. lpoNumberString;
  let  itemName = req.query.itemName;

  // Delete the lpo item from the database
  const query = `DELETE FROM lpo_s WHERE item_name = ? AND lpo_number = ?;`;
  connection.query(query, [itemName,lpoNumberString], (err, result) => {
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



//counting
//count banks
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

//count customers
app.get("/countCustomers", (req, res) => {
  const query = "SELECT COUNT(*) as count_customers FROM customer_details;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying customer records:", err);
      res.status(500).json({ error: "Failed to count bank records" });
      return;
    }
    res.json(results);
  });
});

//count distributors
app.get("/countDistributors", (req, res) => {
  const query = "SELECT COUNT(*) as count_dist FROM distributor_records;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying customer records:", err);
      res.status(500).json({ error: "Failed to count bank records" });
      return;
    }
    res.json(results);
  });
});

//count invoices
app.get("/countInvoices", (req, res) => {
  const query = "SELECT COUNT(*) as count_invoices FROM invoice_details;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying customer records:", err);
      res.status(500).json({ error: "Failed to count bank records" });
      return;
    }
    res.json(results);
  });
});

//count LPOs
app.get("/countLPOs", (req, res) => {
  const query = "SELECT COUNT(*) as count_LPOs FROM lpo_dates;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error querying customer records:", err);
      res.status(500).json({ error: "Failed to count bank records" });
      return;
    }
    res.json(results);
  });
});


// Start the server
const port = 3000; // You can change this port number if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});