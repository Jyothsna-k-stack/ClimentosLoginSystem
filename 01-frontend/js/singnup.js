document.addEventListener("DOMContentLoaded", function () {

    // Get form
    const signupForm = document.getElementById("signupForm");

    // Get input fields
    const firstName = document.getElementById("firstName");

    const lastName = document.getElementById("lastName");

    const email = document.getElementById("signupEmail");

    const dob = document.getElementById("dob");

    const password = document.getElementById("signupPassword");

    const confirmPassword = document.getElementById("confirmPassword");

    const terms = document.getElementById("terms");

    const message = document.getElementById("signupMessage");


    // Email validation
    function validateEmail(emailValue) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(emailValue);

    }


    // Show message
    function showMessage(text, success = false) {

        message.textContent = text;

        message.className = "";

        if (success) {
            message.classList.add("success");
        }

    }


    // Form submission
    signupForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();


        // Get values
        const firstNameValue = firstName.value.trim();

        const lastNameValue = lastName.value.trim();

        const emailValue = email.value.trim();

        const passwordValue = password.value;

        const confirmPasswordValue = confirmPassword.value;


        // Name validation
        if (firstNameValue === "" || lastNameValue === "") {

            showMessage("Please enter your first and last name.");

            return;

        }


        // Email validation
        if (!validateEmail(emailValue)) {

            showMessage("Please enter a valid email address.");

            email.focus();

            return;

        }


        // Date validation
        if (dob.value === "") {

            showMessage("Please select your date of birth.");

            dob.focus();

            return;

        }


        // Gender validation
        const gender = document.querySelector(
            'input[name="gender"]:checked'
        );

        if (!gender) {

            showMessage("Please select your gender.");

            return;

        }


        // Password validation
        if (passwordValue.length < 8) {

            showMessage("Password must contain at least 8 characters.");

            password.focus();

            return;

        }


        // Confirm password
        if (passwordValue !== confirmPasswordValue) {

            showMessage("Passwords do not match.");

            confirmPassword.focus();

            return;

        }


        // Terms validation
        if (!terms.checked) {

            showMessage("Please accept the Terms & Conditions.");

            return;

        }


        // Success
        showMessage(
            "Registration form validated successfully!",
            true
        );


        console.log("First Name:", firstNameValue);

        console.log("Last Name:", lastNameValue);

        console.log("Email:", emailValue);

        console.log("Gender:", gender.value);


    });

})