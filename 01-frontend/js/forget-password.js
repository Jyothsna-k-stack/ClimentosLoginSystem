// Get the form
const forgotForm = document.getElementById("forgotForm");

// Get the email input
const emailInput = document.getElementById("email");

// Get the message element
const message = document.getElementById("message");


// Form submit event
forgotForm.addEventListener("submit", function(event) {

    // Prevent page reload
    event.preventDefault();

    // Get email value
    const email = emailInput.value.trim();

    // Check email
    if (email === "") {

        message.textContent = "Please enter your email address.";

        message.style.color = "red";

        return;

    }

    // Display success message
    message.textContent = "Password reset link request submitted!";

    message.style.color = "green";

});