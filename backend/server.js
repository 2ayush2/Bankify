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
          const transaction = new sql.Transaction(); // Create a new transaction
          await transaction.begin();
      
          // Dynamically loop through the formData object and insert each field
          for (const [fieldName, fieldValue] of Object.entries(formData)) {
            const request = new sql.Request(transaction); // Create a new request for each iteration
      
            // Ensure FieldValue is always a string
            const valueToInsert =
              fieldValue === null || fieldValue === undefined
                ? "" // Replace null/undefined with an empty string
                : typeof fieldValue === "object"
                ? JSON.stringify(fieldValue) // Convert objects/arrays to JSON string
                : String(fieldValue); // Convert other types to string
      
            await request
              .input("FieldName", sql.NVarChar, fieldName) // Field Name (e.g., "ExpiryDate")
              .input("FieldValue", sql.NVarChar, valueToInsert) // Always pass a valid string
              .input("SubmissionID", sql.BigInt, submissionID) // Add SubmissionID for grouping
              .query(
                `INSERT INTO FormSubmissions (FieldName, FieldValue, SubmissionID)
                 VALUES (@FieldName, @FieldValue, @SubmissionID)`
              );
          }
      
          await transaction.commit(); // Commit the transaction
          console.log("Form data saved successfully!");
      
          // Send success response
          res.status(200).json({
            message: "Form data saved successfully!",
            submissionID: submissionID,
          });
        } catch (error) {
          console.error("Error saving form data:", error);
          res.status(500).json({ message: "Failed to save form data", error: error.message });
        }
      });
      //API ENdpoint of thr database api

   // API Endpoint to Retrieve All Data from FormSubmissions
app.get("/api/formData", async (req, res) => {
  try {
    // Create a new SQL request object
    const result = await sql.query("SELECT * FROM FormSubmissions");

    // Send the result back as JSON
    res.status(200).json({
      success: true,
      data: result.recordset, // Return only the rows from the result
    });
  } catch (error) {
    console.error("Error retrieving data from FormSubmissions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve data from FormSubmissions.",
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
