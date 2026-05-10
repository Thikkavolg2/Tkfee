from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app) # Frontend එකට Backend එක සමඟ කතා කිරීමට අවසර දීම

# Database එකට සම්බන්ධ වීම
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",         # ඔබේ MySQL Username එක
        password="",         # ඔබේ MySQL Password එක
        database="company_db"
    )

# දත්ත ලබා දෙන API එක
@app.route('/api/salary/<int:emp_id>')
def get_salary(emp_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # ID එකට අදාල දත්ත MySQL වලින් සෙවීම
    cursor.execute("SELECT * FROM employees WHERE id = %s", (emp_id,))
    employee = cursor.fetchone()
    conn.close()
    
    if employee:
        # ශුද්ධ වැටුප ගණනය කිරීම: (මූලික වැටුප + දීමනා) - අඩු කිරීම්
        net_salary = (employee['basic_salary'] + employee['allowance']) - employee['deductions']
        employee['net_salary'] = net_salary
        return jsonify(employee) # දත්ත JSON ආකාරයෙන් යැවීම
        
    return jsonify({"error": "සේවකයා සොයාගත නොහැක!"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
