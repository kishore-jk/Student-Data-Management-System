const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'student_record_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// --- API ROUTES ---

// 1. Get all students (Admin View)
app.get('/api/students', (req, res) => {
    const sql = `
        SELECT s.*, a.total_days, a.days_present 
        FROM students s 
        LEFT JOIN attendance a ON s.roll = a.roll`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 2. Register new student
app.post('/api/students', (req, res) => {
    const { name, roll, dob, gender, dept_code, dept_name, academic_year, current_semester, password } = req.body;
    const sql = "INSERT INTO students (name, roll, dob, gender, dept_code, dept_name, academic_year, current_semester, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [name, roll, dob, gender, dept_code, dept_name, academic_year, current_semester, password], (err, result) => {
        if (err) return res.status(500).json(err);
        // Also initialize attendance row
        db.query("INSERT INTO attendance (roll) VALUES (?)", [roll]);
        res.json({ message: "Student registered successfully" });
    });
});

// 3. Update Marks
app.post('/api/marks', (req, res) => {
    const { roll, semester, int1, int2, model, assignment, mini_project, rmk_next_gen, sem_final } = req.body;
    const sql = `INSERT INTO marks (roll, semester, int1, int2, model, assignment, mini_project, rmk_next_gen, sem_final) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
                 ON DUPLICATE KEY UPDATE int1=?, int2=?, model=?, assignment=?, mini_project=?, rmk_next_gen=?, sem_final=?`;
    
    db.query(sql, [roll, semester, int1, int2, model, assignment, mini_project, rmk_next_gen, sem_final, int1, int2, model, assignment, mini_project, rmk_next_gen, sem_final], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Marks updated" });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));