const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql");

// Create Express App
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON data

// SQL Server Configuration
const config = {
  server: "localhost", // SQL Server hostname
  database: "EmployeeDB", // Replace with your database name
  user: "sa", // Replace with your SQL Server username
  password: "tests", // Replace with your SQL Server password
  options: {
    trustServerCertificate: true, // Trust self-signed certificates
  },
};

// Connect to SQL Server
sql.connect(config)
  .then((pool) => {
    console.log("Connected to SQL Server successfully!");

    // API Endpoint for Submitting Form Data
    app.post("/api/submit-form", async (req, res) => {
      const formData = req.body; // Data sent from the frontend
      const submissionID = Date.now(); // Unique submission ID based on the timestamp

      try {
        const transaction = new sql.Transaction(pool); // Start a transaction
        await transaction.begin();

        const request = new sql.Request(transaction);

        // Dynamically loop through the formData object and insert each field
        for (const [fieldName, fieldValue] of Object.entries(formData)) {
          await request
            .input("FieldName", sql.NVarChar, fieldName) // Field Name (e.g., "Name", "Location")
            .input("FieldValue", sql.NVarChar, typeof fieldValue === "object" ? JSON.stringify(fieldValue) : fieldValue) // Handle objects as JSON
            .input("SubmissionID", sql.BigInt, submissionID) // Add SubmissionID for grouping
            .query(
              `INSERT INTO FormSubmissions (FieldName, FieldValue, SubmissionID)
               VALUES (@FieldName, @FieldValue, @SubmissionID)`
            );
        }

        await transaction.commit(); // Commit the transaction

        // Send success response
        res.status(200).json({
          message: "Form data saved to the database successfully!",
          submissionID: submissionID,
        });
      } catch (error) {
        console.error("Error saving form data:", error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    });

    // Test Route to Verify Server is Running
    app.get("/", (req, res) => {
      res.send("Server is up and running!");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to SQL Server:", err);
  });

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
