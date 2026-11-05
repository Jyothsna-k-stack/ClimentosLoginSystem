document.addEventListener("DOMContentLoaded", function () {

    // Get HTML elements
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");


    
    // 1. SHOW / HIDE PASSWORD
    

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "Hide";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "Show";

        }

    });


    
    // 2. EMAIL VALIDATION


    function validateEmail(email) {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    
    // 3. PASSWORD VALIDATION

    function validatePassword(password) {

        return password.length >= 8;

    }


    
    // 4. LOGIN FORM SUBMISSION
    

    loginForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();


        // Get input values
        const email = emailInput.value.trim();

        const password = passwordInput.value;


        
        // EMAIL CHECK
        

        if (email === "") {

            alert("Please enter your email address.");

            emailInput.focus();

            return;

        }


        if (!validateEmail(email)) {

            alert("Please enter a valid email address.");

            emailInput.focus();

            return;

        }


        
        // PASSWORD CHECK


        if (password === "") {

            alert("Please enter your password.");

            passwordInput.focus();

            return;

        }


        if (!validatePassword(password)) {

            alert("Password must contain at least 8 characters.");

            passwordInput.focus();

            return;

        }


        
        // LOGIN SUCCESS MESSAGE
    

        alert("Login form submitted successfully!");

        console.log("Email:", email);

        console.log("Login form validation completed.");
        //open welcome page
        window.location.href="welcome.html";

    });
   

});
 function logout(){
    alert("You have successfully logged out!")
        
        window.location.href="index.html";
    }
