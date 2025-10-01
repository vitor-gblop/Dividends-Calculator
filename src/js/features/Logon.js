const { use } = require("react");

function hide(hideid, showid)
{
    let x = document.getElementById(hideid);
    x.style.display = 'none';

    let y = document.getElementById(showid);
    y.style.display = 'block'
}

function login()
{
    let user_data = localStorage.getItem("userData");
    if (!user_data)
    {
        localStorage.setItem("userData", "{}");
    }

    let usuario = document.getElementById("input-usuario").value;
    let senha = document.getElementById("input-senha").value;

    // Get user data from localStorage
    let userData = JSON.parse(localStorage.getItem("userData"));

    // Simple validation: check if user exists and password matches
    if (userData[usuario] && userData[usuario] === senha) {
        // Login successful, redirect or hide login
        document.getElementById("wrong-data-label").style.display = "none";
        // Example: hide login, show calculator (adjust as needed)
        hide('login', 'calculadora');
    } else {
        // Show error label
        document.getElementById("wrong-data-label").style.display = "block";
    }
}