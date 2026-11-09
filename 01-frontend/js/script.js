document.addEventListener("DOMContentLoaded", function () {
    //start js after html has been loaded


//  GET HTML ELEMENTS


const loginView = document.getElementById("loginView");
const forgotView = document.getElementById("forgotView");
const signupView = document.getElementById("signupView");

const loginForm = document.getElementById("loginForm");
const forgotForm = document.getElementById("forgotForm");
const signupForm = document.getElementById("signupForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("rememberMe");

const forgotPasswordBtn =
    document.getElementById("forgotPasswordBtn");

const createAccountBtn =
    document.getElementById("createAccountBtn");

const backToLoginFromForgot =
    document.getElementById("backToLoginFromForgot");

const backToLoginFromSignup =
    document.getElementById("backToLoginFromSignup");



// STORAGE KEY


const USER_STORAGE_KEY = "climentosUser";

// BACKEND LOGIN API
const LOGIN_API =
    "http://localhost:8080/api/users/login";



// SHOW LOGIN VIEW


function showLoginView() {

    loginView.classList.remove("hidden-view");
    forgotView.classList.add("hidden-view");
    signupView.classList.add("hidden-view");

}



//  SHOW FORGOT PASSWORD VIEW


function showForgotView() {

    loginView.classList.add("hidden-view");
    forgotView.classList.remove("hidden-view");
    signupView.classList.add("hidden-view");

}



// SHOW SIGNUP VIEW


function showSignupView() {

    loginView.classList.add("hidden-view");
    forgotView.classList.add("hidden-view");
    signupView.classList.remove("hidden-view");

}



// EMAIL VALIDATION


function isValidEmail(emailValue) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailValue);

}



//  PASSWORD VALIDATION


function isValidPassword(passwordValue) {

    return passwordValue.length >= 6;

}



//  GET SAVED ACCOUNT SAFELY


function getSavedUser() {

    const savedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!savedUser) {
        return null;
    }

    try {

        return JSON.parse(savedUser);

    } catch (error) {

        return null;

    }

}


//  FORGOT PASSWORD BUTTON


forgotPasswordBtn.addEventListener("click", function () {

    showForgotView();

});



// CREATE ACCOUNT BUTTON


createAccountBtn.addEventListener("click", function () {

    showSignupView();

});



//  BACK TO LOGIN FROM FORGOT


backToLoginFromForgot.addEventListener("click", function () {

    forgotForm.reset();

    showLoginView();

});



// BACK TO LOGIN FROM SIGNUP


backToLoginFromSignup.addEventListener("click", function () {

    signupForm.reset();

    showLoginView();

});



// SHOW / HIDE PASSWORD


togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        password.type = "password";
        togglePassword.textContent = "Show";

    }

});



// LOGIN USING SPRING BOOT


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // GET EMAIL AND PASSWORD

    const enteredEmail = email.value.trim().toLowerCase();

    const enteredPassword = password.value;


    // VALIDATE EMAIL

    if (!isValidEmail(enteredEmail)) {

        alert("Please enter a valid email address.");

        email.focus();

        return;

    }


    // VALIDATE PASSWORD

    if (!isValidPassword(enteredPassword)) {

        alert("Password must contain at least 6 characters.");

        password.focus();

        return;

    }


    // SEND LOGIN REQUEST TO BACKEND

    try {

        const response = await fetch(LOGIN_API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                email: enteredEmail,
                password: enteredPassword

            })

        });


        // GET BACKEND RESPONSE

        const result = await response.text();


        // CHECK LOGIN SUCCESS

        if (response.ok && result.trim() === "Login successful") {


            // GET USERNAME FROM EMAIL

            let username = enteredEmail.split("@")[0];


            // IF REGISTERED ACCOUNT EXISTS, USE FULL NAME

            const savedUser = getSavedUser();

            if (
                savedUser &&
                savedUser.email &&
                savedUser.email.toLowerCase() === enteredEmail
            ) {

                username = savedUser.fullName;

            }


            // SAVE USERNAME FOR WELCOME PAGE

            localStorage.setItem(
                "climentosUserName",
                username
            );


            // REMEMBER ME

            if (rememberMe.checked) {

                localStorage.setItem(
                    "climentosRememberEmail",
                    enteredEmail
                );

            } else {

                localStorage.removeItem(
                    "climentosRememberEmail"
                );

            }


            // OPEN WELCOME PAGE

            window.location.href = "welcome.html";

        } else {

            // LOGIN FAILED

            alert("Invalid email or password.");

        }

    } catch (error) {

        // BACKEND CONNECTION ERROR

        console.error("Login error:", error);

        alert(
            "Unable to connect to the backend. " +
            "Please make sure Spring Boot is running."
        );

    }

});



// CREATE ACCOUNT FORM


signupForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // GET FORM VALUES

    const fullName =
        document.getElementById("fullName").value.trim();

    const signupEmail =
        document.getElementById("signupEmail").value.trim().toLowerCase();

    const signupPassword =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // VALIDATE NAME

    if (fullName.length < 2) {

        alert("Please enter your full name.");

        return;

    }


    // VALIDATE EMAIL

    if (!isValidEmail(signupEmail)) {

        alert("Please enter a valid email address.");

        return;

    }


    // VALIDATE PASSWORD

    if (!isValidPassword(signupPassword)) {

        alert("Password must contain at least 6 characters.");

        return;

    }


    // CHECK PASSWORD MATCH

    if (signupPassword !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }


    // CHECK EXISTING ACCOUNT

    const existingUser = getSavedUser();

    if (
        existingUser &&
        existingUser.email &&
        existingUser.email.toLowerCase() === signupEmail
    ) {

        alert("An account already exists with this email.");

        return;

    }


    // CREATE NEW ACCOUNT

    const newUser = {

        fullName: fullName,
        email: signupEmail,
        password: signupPassword

    };


    // SAVE ACCOUNT IN LOCAL STORAGE

    localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(newUser)
    );


    // SUCCESS MESSAGE

    alert("Account created successfully! You can now login.");


    // RESET SIGNUP FORM

    signupForm.reset();


    // RETURN TO LOGIN

    showLoginView();


    // FILL REGISTERED EMAIL

    email.value = signupEmail;

    password.value = "";

});



// FORGOT PASSWORD FORM


forgotForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // GET FORM VALUES

    const resetEmail =
        document.getElementById("resetEmail").value.trim().toLowerCase();

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmResetPassword =
        document.getElementById("confirmResetPassword").value;


    // VALIDATE EMAIL

    if (!isValidEmail(resetEmail)) {

        alert("Please enter a valid email address.");

        return;

    }


    // VALIDATE PASSWORD

    if (!isValidPassword(newPassword)) {

        alert("Password must contain at least 6 characters.");

        return;

    }


    // CHECK PASSWORD MATCH

    if (newPassword !== confirmResetPassword) {

        alert("Passwords do not match.");

        return;

    }


    // GET REGISTERED ACCOUNT

    const user = getSavedUser();


    // CHECK ACCOUNT

    if (!user || !user.email) {

        alert("No registered account found.");

        return;

    }


    // CHECK REGISTERED EMAIL

    if (user.email.toLowerCase() !== resetEmail) {

        alert("Email address is not registered.");

        return;

    }


    // UPDATE PASSWORD

    user.password = newPassword;


    // SAVE UPDATED ACCOUNT

    localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(user)
    );


    // SUCCESS MESSAGE

    alert("Password updated successfully!");


    // RESET FORM

    forgotForm.reset();


    // RETURN TO LOGIN

    showLoginView();


    // FILL EMAIL

    email.value = resetEmail;

    password.value = "";

});



//  REMEMBER ME


const rememberedEmail =
    localStorage.getItem("climentosRememberEmail");

if (rememberedEmail) {

    email.value = rememberedEmail;

    rememberMe.checked = true;

}



// INITIAL VIEW


showLoginView();

});