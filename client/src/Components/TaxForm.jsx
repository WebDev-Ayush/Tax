import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios"; // Import axios
import * as Yup from "yup"; // Import Yup for validation
import { TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  annualIncome: Yup.number().required("Annual income is required"),
  investments: Yup.number().required("Investment details are required"),
  hra: Yup.number().required("HRA is required"),
  lta: Yup.number().required("LTA is required"),
  otherDeductions: Yup.number().required("Other Deductions are required"),
  otherIncome: Yup.number().required("Other Income is required"),
});

const TaxForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      annualIncome: "",
      investments: "",
      hra: "",
      lta: "",
      otherDeductions: "",
      otherIncome: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("https://tax-busj.onrender.com/api/calculate-tax", values);
        console.log("Response:", response.data);

        // Navigate to result page with tax calculation data
        navigate("/result", { state: { data: response.data } });
      } catch (error) {
        console.error("Error calculating tax:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <Typography variant="h5" className="font-semibold text-gray-700">Tax Information Form</Typography>
          <Link to="/history" className="text-blue-600 hover:underline text-lg">View History</Link>
        </div>
        <Card className="shadow-md border border-gray-100">
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <TextField fullWidth label="Annual Income" name="annualIncome" variant="outlined" type="number" value={formik.values.annualIncome} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.annualIncome && Boolean(formik.errors.annualIncome)} helperText={formik.touched.annualIncome && formik.errors.annualIncome} />
              <TextField fullWidth label="Investments (80C, 80D, etc.)" name="investments" variant="outlined" type="number" value={formik.values.investments} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.investments && Boolean(formik.errors.investments)} helperText={formik.touched.investments && formik.errors.investments} />
              <div className="grid grid-cols-3 gap-4">
                <TextField fullWidth label="HRA" name="hra" variant="outlined" type="number" value={formik.values.hra} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.hra && Boolean(formik.errors.hra)} helperText={formik.touched.hra && formik.errors.hra} />
                <TextField fullWidth label="LTA" name="lta" variant="outlined" type="number" value={formik.values.lta} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.lta && Boolean(formik.errors.lta)} helperText={formik.touched.lta && formik.errors.lta} />
                <TextField fullWidth label="Other Deductions" name="otherDeductions" variant="outlined" type="number" value={formik.values.otherDeductions} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.otherDeductions && Boolean(formik.errors.otherDeductions)} helperText={formik.touched.otherDeductions && formik.errors.otherDeductions} />
              </div>
              <TextField fullWidth label="Income from Other Sources" name="otherIncome" variant="outlined" type="number" value={formik.values.otherIncome} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.otherIncome && Boolean(formik.errors.otherIncome)} helperText={formik.touched.otherIncome && formik.errors.otherIncome} />
              <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4 bg-blue-600 hover:bg-blue-700 text-lg">Calculate Tax</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxForm;

