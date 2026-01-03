CREATE DATABASE student_record_db;
USE student_record_db;

-- Table for storing student information
CREATE TABLE students (
    roll VARCHAR(12) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    dept_code VARCHAR(3) NOT NULL,
    dept_name VARCHAR(100) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    current_semester INT DEFAULT 1,
    password VARCHAR(255) NOT NULL,
    forgot_password_requested ENUM('none', 'requested', 'approved') DEFAULT 'none'
);

-- Table for attendance records
CREATE TABLE attendance (
    roll VARCHAR(12),
    total_days INT DEFAULT 0,
    days_present INT DEFAULT 0,
    FOREIGN KEY (roll) REFERENCES students(roll) ON DELETE CASCADE
);

-- Table for academic marks
CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll VARCHAR(12),
    semester VARCHAR(5), -- e.g., 'sem1'
    int1 INT DEFAULT 0,
    int2 INT DEFAULT 0,
    model INT DEFAULT 0,
    assignment INT DEFAULT 0,
    mini_project INT DEFAULT 0,
    rmk_next_gen INT DEFAULT 0,
    sem_final INT DEFAULT 0,
    FOREIGN KEY (roll) REFERENCES students(roll) ON DELETE CASCADE
);