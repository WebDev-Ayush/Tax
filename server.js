require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Function to calculate tax
const calculateTax = (taxableIncome) => {
  let taxPayable = 0;

  if (taxableIncome <= 400000) {
    taxPayable = 0;
  } else if (taxableIncome <= 800000) {
    taxPayable = (taxableIncome - 400000) * 0.05;
  } else if (taxableIncome <= 1200000) {
    taxPayable = 20000 + (taxableIncome - 800000) * 0.1;
  } else if (taxableIncome <= 1600000) {
    taxPayable = 80000 + (taxableIncome - 1200000) * 0.15;
  } else if (taxableIncome <= 2000000) {
    taxPayable = 180000 + (taxableIncome - 1600000) * 0.2;
  } else if (taxableIncome <= 2400000) {
    taxPayable = 320000 + (taxableIncome - 2000000) * 0.25;
  } else {
    taxPayable = 600000 + (taxableIncome - 2400000) * 0.3;
  }

  return taxPayable;
};

// API to Calculate Tax & Store Result in MySQL
app.post("/api/calculate-tax", (req, res) => {
  try {
    const { annualIncome, investments, hra, lta, otherDeductions, otherIncome } = req.body;

    if (!annualIncome) {
      return res.status(400).json({ error: "Annual Income is required" });
    }

    // Convert input values to numbers
    const income = Number(annualIncome);
    const totalDeductions = Number(investments) + Number(hra) + Number(lta) + Number(otherDeductions);
    const taxableIncome = Math.max(income + Number(otherIncome) - totalDeductions, 0);
    const taxPayable = calculateTax(taxableIncome);

    // Insert the result into the database
    db.query(
      "INSERT INTO tax_results (annual_income, investments, hra, lta, other_deductions, other_income, taxable_income, tax_payable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [annualIncome, investments, hra, lta, otherDeductions, otherIncome, taxableIncome, taxPayable],
      (err, results) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({
          message: "Tax calculated successfully",
          taxableIncome,
          taxPayable,
          recommendations: [
            "Long-Term Capital Gains (LTCG) are tax-free up to ₹1 lakh → Show how they can avoid unnecessary short-term capital gains taxes",
            "Invest more in 80C (PPF, ELSS, LIC) to save tax",
            "Agricultural & Side Income → If users have rental, agricultural, or side hustle income, they can use exemptions under certain tax rules",
            "Consider NPS for extra deductions under 80CCD(1B)",
          ],
        });
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// API to Fetch Previous Tax Calculations
app.get("/api/tax-history", (req, res) => {
  db.query("SELECT * FROM tax_results ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.delete("/api/tax-history/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tax_results WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Record deleted successfully" });
  });
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



