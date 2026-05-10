CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    basic_salary DECIMAL(10,2),
    allowance DECIMAL(10,2),
    deductions DECIMAL(10,2)
);

-- උදාහරණයක් ලෙස දත්තයක් ඇතුළත් කිරීම (Dummy Data)
INSERT INTO employees (name, basic_salary, allowance, deductions) 
VALUES ('Amal Perera', 50000.00, 5000.00, 2000.00);
