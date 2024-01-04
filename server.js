const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors"); //to avoid cors error

// Define a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jan@2024',
  database: 'sse_cs_backup',
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.use(cors());

// Create an API to retrieve data
app.get("/api/data", (req, res) => {
  db.query("SELECT * FROM fin_entry", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Create an API for searching
app.get("/api/search", (req, res) => {
  const searchTerm = req.query.q;
  const query = "SELECT * FROM fin_entry WHERE id_sa LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
