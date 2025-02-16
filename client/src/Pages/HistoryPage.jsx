import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const HistoryPage = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch history records from the backend
  const fetchHistory = async () => {
    try {
      const response = await axios.get("https://tax-busj.onrender.com/api/tax-history");
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Open modal with record details
  const handleOpen = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setSelectedRecord(null);
    setOpen(false);
  };

  // Delete record from database
  const handleDelete = async (id, event) => {
    // Prevent modal open when clicking the delete button
    event.stopPropagation();
    try {
      await axios.delete(`https://tax-busj.onrender.com/api/tax-history/${id}`);
      // Remove deleted record from the state
      setRecords(records.filter(record => record.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <Typography variant="h5" className="font-semibold text-gray-700">
            Tax Calculation History
          </Typography>
          <Link to="/" className="text-blue-600 hover:underline text-lg">
            Back to Form
          </Link>
        </div>
        <Card variant="outlined">
          <CardContent>
            {records.length === 0 ? (
              <Typography variant="body1" className="text-gray-700">
                No history available.
              </Typography>
            ) : (
              <List>
                {records.map((record) => (
                  <ListItem
                    key={record.id}
                    button
                    onClick={() => handleOpen(record)}
                    divider
                  >
                    <ListItemText
                      primary={`Income: ₹${record.annual_income}`}
                      secondary={`Date: ${new Date(record.created_at).toLocaleString()}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={(e) => handleDelete(record.id, e)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal for full details */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Tax Calculation Details</DialogTitle>
        <DialogContent dividers>
          {selectedRecord && (
            <div className="space-y-2">
              <Typography variant="body1">
                <strong>Annual Income:</strong> ₹{selectedRecord.annual_income}
              </Typography>
              <Typography variant="body1">
                <strong>Investments:</strong> ₹{selectedRecord.investments}
              </Typography>
              <Typography variant="body1">
                <strong>HRA:</strong> ₹{selectedRecord.hra}
              </Typography>
              <Typography variant="body1">
                <strong>LTA:</strong> ₹{selectedRecord.lta}
              </Typography>
              <Typography variant="body1">
                <strong>Other Deductions:</strong> ₹{selectedRecord.other_deductions}
              </Typography>
              <Typography variant="body1">
                <strong>Other Income:</strong> ₹{selectedRecord.other_income}
              </Typography>
              <Typography variant="body1">
                <strong>Taxable Income:</strong> ₹{selectedRecord.taxable_income}
              </Typography>
              <Typography variant="body1">
                <strong>Tax Payable:</strong> ₹{selectedRecord.tax_payable}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {new Date(selectedRecord.created_at).toLocaleString()}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HistoryPage;
