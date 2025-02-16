# Online Tax System

## Project Description
Online Tax System is a web-based application designed to help users calculate their income tax based on Indian tax slabs (FY 2024-25). The system provides a user-friendly interface to input financial details and returns structured results with tax liability and savings suggestions. It also allows users to track their previous calculations.

### Features
- **Frontend:** Built using React.js with Material UI, Tailwind CSS, Redux, and React Router.
- **Backend:** A RESTful API using Node.js + Express.js.
- **Database:** MySQL for storing previous tax calculations.
- **Tax Calculation:** Implements Indian Income Tax Slabs (FY 2024-25) with relevant deductions.
- **User Interaction:** Users can calculate, view history, and delete previous records.

## Tech Stack
### Frontend:
- React.js
- Tailwind CSS
- Redux
- React Router
- Material UI
- Formik + Yup (for form validation)

### Backend:
- Node.js
- Express.js
- MySQL

### Deployment
- **Frontend:** [Vercel](https://tax-puce.vercel.app/)
- **Backend:** [Render](https://tax-busj.onrender.com/)
- **Repository:** GitHub

---

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **MySQL**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/online-tax-system.git
cd online-tax-system
```

### 2. Backend Setup
```bash
cd server
npm install
```
#### Environment Variables
Create a `.env` file inside the `server` directory and configure:
```env
PORT=5000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```
#### Start the Server
```bash
npm start
```
The backend will run at `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../client
npm install
npm start
```
The frontend will run at `http://localhost:3000`

---

## API Documentation
### Base URL
```plaintext
https://tax-busj.onrender.com
```

### 1. Calculate Tax
- **Endpoint:** `POST /api/calculate-tax`
- **Description:** Calculates tax based on provided details.
- **Request Body:**
```json
{
  "annualIncome": 1200000,
  "investments": 150000,
  "hra": 50000,
  "lta": 20000,
  "otherDeductions": 30000,
  "otherIncome": 10000
}
```
- **Response:**
```json
{
  "taxableIncome": 1000000,
  "taxPayable": 80000,
  "recommendations": [
    "Invest more in 80C (PPF, ELSS, LIC) to save tax",
    "Consider NPS for extra deductions under 80CCD(1B)"
  ]
}
```

### 2. Fetch Tax History
- **Endpoint:** `GET /api/history`
- **Description:** Fetches the previous tax calculations.
- **Response:**
```json
[
  {
    "id": 1,
    "annualIncome": 1200000,
    "taxableIncome": 1000000,
    "taxPayable": 80000,
    "date": "2025-02-17T12:34:56Z"
  }
]
```

### 3. Delete a Record
- **Endpoint:** `DELETE /api/history/:id`
- **Description:** Deletes a tax record.
- **Response:**
```json
{ "message": "Record deleted successfully" }
```

---

## Contribution Guidelines
Feel free to contribute by submitting issues and pull requests. Follow the standard GitHub workflow:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---

## License
MIT License

---

For any issues, contact [your_email@example.com].

