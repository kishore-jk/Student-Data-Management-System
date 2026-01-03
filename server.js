const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jk@6302704356', // <-- Put the password you chose here
    database: 'student_record_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// Route to add a student
app.post('/api/students', (req, res) => {
    const { name, roll, dob, gender, dept_code, dept_name, academic_year, current_semester, password } = req.body;
    const sql = `INSERT INTO students (name, roll, dob, gender, dept_code, dept_name, academic_year, current_semester, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, roll, dob, gender, dept_code, dept_name, academic_year, current_semester, password];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: "Student Added" });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
