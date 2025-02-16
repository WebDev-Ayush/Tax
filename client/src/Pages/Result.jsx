import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const ResultPage = () => {
  const location = useLocation();
  const resultData = location.state?.data;

  if (!resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200 text-center">
          <Typography variant="h5" className="font-semibold text-gray-700 mb-4">
            No result data available!
          </Typography>
          <Link to="/" className="text-blue-600 hover:underline text-lg">
            Back to Form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <Typography variant="h5" className="font-semibold text-gray-700">
            Tax Calculation Results
          </Typography>
          <Link to="/" className="text-blue-600 hover:underline text-lg">
            Back to Form
          </Link>
        </div>
        <Card className="shadow-md border border-gray-100 mb-6">
          <CardContent>
            <div className="space-y-4">
              <Typography variant="subtitle1" className="text-gray-700">
                <strong>Taxable Income after Deductions:</strong> ₹{resultData.taxableIncome}
              </Typography>
              <Typography variant="subtitle1" className="text-gray-700">
                <strong>Tax Payable:</strong> ₹{resultData.taxPayable}
              </Typography>
              <div>
                <Typography variant="subtitle1" className="text-gray-700 mb-2">
                  <strong>Tax Savings Suggestions:</strong>
                </Typography>
                {resultData.recommendations && resultData.recommendations.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {resultData.recommendations.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2" className="text-gray-600">
                    No suggestions available.
                  </Typography>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default ResultPage;
