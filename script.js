function generatePayslip() {
    // 1. පරිශීලකයා ඇතුලත් කල ID එක ලබාගැනීම
    let id = document.getElementById("empId").value;
    
    if(!id) {
        alert("කරුණාකර සේවක අංකයක් ඇතුලත් කරන්න!");
        return;
    }

    // 2. Python Backend API එකට Request එකක් යැවීම (Fetch API භාවිතයෙන්)
    fetch(`http://127.0.0.1:5000/api/salary/${id}`)
        .then(response => response.json()) // ලැබෙන ප්‍රතිචාරය JSON බවට පත් කිරීම
        .then(data => {
            if(data.error) {
                alert(data.error);
                document.getElementById("resultBox").style.display = "none";
            } else {
                // 3. ලැබුණු දත්ත HTML පිටුවේ අදාල තැන්වලට ඇතුලත් කිරීම
                document.getElementById("empName").innerText = data.name;
                document.getElementById("basicSalary").innerText = data.basic_salary;
                document.getElementById("allowance").innerText = data.allowance;
                document.getElementById("deductions").innerText = data.deductions;
                document.getElementById("netSalary").innerText = data.net_salary;
                
                // ප්‍රතිඵලය පෙන්වීම
                document.getElementById("resultBox").style.display = "block";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("සේවාදායකය (Server) හා සම්බන්ධ වීමේ දෝෂයක්!");
        });
}
