document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. BACKEND API URLS
    // ==========================================

    const LOGIN_API = "http://localhost:8080/api/users/login";
    const REGISTER_API = "http://localhost:8080/api/users/register";
    const FORGOT_PASSWORD_API = "http://localhost:8080/api/users/forgot-password";
    const RESET_PASSWORD_API = "http://localhost:8080/api/users/reset-password";


    // ==========================================
    // 2. GET HTML ELEMENTS
    // ==========================================

    const loginView = document.getElementById("loginView");
    const forgotView = document.getElementById("forgotView");
    const signupView = document.getElementById("signupView");

    const loginForm = document.getElementById("loginForm");
    const forgotForm = document.getElementById("forgotForm");
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    const signupForm = document.getElementById("signupForm");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    const rememberMe = document.getElementById("rememberMe");

    const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
    const createAccountBtn = document.getElementById("createAccountBtn");

    const backToLoginFromForgot =
        document.getElementById("backToLoginFromForgot");

    const backToLoginFromSignup =
        document.getElementById("backToLoginFromSignup");

    const resetEmail = document.getElementById("resetEmail");
    const newPassword = document.getElementById("newPassword");
    const confirmResetPassword =
        document.getElementById("confirmResetPassword");

    const fullName = document.getElementById("fullName");
    const signupEmail = document.getElementById("signupEmail");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");


    // ==========================================
    // 3. RESET TOKEN FROM EMAIL LINK
    // ==========================================

    let resetToken = new URLSearchParams(window.location.search)
        .get("token");


    // ==========================================
    // 4. EMAIL VALIDATION
    // ==========================================

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }


    // ==========================================
    // 5. SHOW AND HIDE DIFFERENT VIEWS
    // ==========================================

    function showLoginView() {

        loginView.classList.remove("hidden-view");
        forgotView.classList.add("hidden-view");
        signupView.classList.add("hidden-view");

    }


    function showForgotView() {

        loginView.classList.add("hidden-view");
        forgotView.classList.remove("hidden-view");
        signupView.classList.add("hidden-view");

        forgotForm.classList.remove("hidden-view");
        resetPasswordForm.classList.add("hidden-view");

    }


    function showSignupView() {

        loginView.classList.add("hidden-view");
        forgotView.classList.add("hidden-view");
        signupView.classList.remove("hidden-view");

    }


    // ==========================================
    // 6. FORGOT PASSWORD VIEW
    // ==========================================

    forgotPasswordBtn.addEventListener("click", function () {

        resetToken = null;

        forgotForm.reset();
        resetPasswordForm.reset();

        showForgotView();

    });


    // ==========================================
    // 7. CREATE ACCOUNT VIEW
    // ==========================================

    createAccountBtn.addEventListener("click", function () {

        signupForm.reset();

        showSignupView();

    });


    // ==========================================
    // 8. BACK TO LOGIN BUTTONS
    // ==========================================

    backToLoginFromForgot.addEventListener("click", function () {

        resetToken = null;

        forgotForm.reset();
        resetPasswordForm.reset();

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

        showLoginView();

    });


    backToLoginFromSignup.addEventListener("click", function () {

        signupForm.reset();

        showLoginView();

    });


    // ==========================================
    // 9. SHOW / HIDE LOGIN PASSWORD
    // ==========================================

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "Hide";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "Show";

        }

    });


    // ==========================================
    // 10. REMEMBER ME
    // ==========================================

    const savedEmail = localStorage.getItem("climentosRememberEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;
        rememberMe.checked = true;

    }


    // ==========================================
    // 11. LOGIN FORM
    // ==========================================

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!isValidEmail(email)) {

            alert("Please enter a valid email address.");
            return;

        }

        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");
            return;

        }

        try {

            const response = await fetch(LOGIN_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            });

            const result = await response.text();

            if (response.ok && result.toLowerCase().includes("successful")) {

                const username = email.split("@")[0];

                localStorage.setItem("climentosUserName", username);

                if (rememberMe.checked) {

                    localStorage.setItem("climentosRememberEmail", email);

                } else {

                    localStorage.removeItem("climentosRememberEmail");

                }

                alert("Login successful!");

                window.location.href = "welcome.html";

            } else {

                alert(result || "Invalid email or password.");

            }

        } catch (error) {

            console.error("Login Error:", error);

            alert("Unable to connect to the server. Please try again.");

        }

    });


    // ==========================================
    // 12. SIGNUP FORM
    // ==========================================

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = fullName.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        const confirm = confirmPassword.value;

        if (name === "") {

            alert("Please enter your full name.");
            return;

        }

        if (!isValidEmail(email)) {

            alert("Please enter a valid email address.");
            return;

        }

        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");
            return;

        }

        if (password !== confirm) {

            alert("Passwords do not match.");
            return;

        }

        try {

            const response = await fetch(REGISTER_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    email: email,
                    password: password

                })

            });

            const result = await response.text();

            if (response.ok &&
                result.toLowerCase().includes("successful")) {

                alert("Account created successfully! Please login.");

                signupForm.reset();

                emailInput.value = email;

                showLoginView();

            } else {

                alert(result || "Registration failed.");

            }

        } catch (error) {

            console.error("Signup Error:", error);

            alert("Unable to connect to the server. Please try again.");

        }

    });


    // ==========================================
    // 13. FORGOT PASSWORD - SEND RESET EMAIL
    // ==========================================

    forgotForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = resetEmail.value.trim();

        if (!isValidEmail(email)) {

            alert("Please enter a valid email address.");
            return;

        }

        try {

            const response = await fetch(FORGOT_PASSWORD_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email

                })

            });

            const result = await response.text();

            if (response.ok &&
                result.toLowerCase().includes("sent")) {

                alert("Password reset link sent to your email. Please check your inbox.");

                forgotForm.reset();

            } else {

                alert(result || "Unable to send password reset link.");

            }

        } catch (error) {

            console.error("Forgot Password Error:", error);

            alert("Unable to connect to the server. Please try again.");

        }

    });


    // ==========================================
    // 14. SHOW RESET PASSWORD FORM FROM EMAIL LINK
    // ==========================================

    if (resetToken) {

        loginView.classList.add("hidden-view");
        signupView.classList.add("hidden-view");
        forgotView.classList.remove("hidden-view");

        forgotForm.classList.add("hidden-view");
        resetPasswordForm.classList.remove("hidden-view");

    } else {

        showLoginView();

    }


    // ==========================================
    // 15. RESET PASSWORD FORM
    // ==========================================

    resetPasswordForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!resetToken) {

            alert("Invalid or missing password reset link.");
            return;

        }

        const password = newPassword.value;
        const confirm = confirmResetPassword.value;

        if (password.length < 8) {

            alert("New password must contain at least 8 characters.");
            return;

        }

        if (password !== confirm) {

            alert("New password and confirm password do not match.");
            return;

        }

        try {

            const response = await fetch(RESET_PASSWORD_API, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    token: resetToken,
                    newPassword: password

                })

            });

            const result = await response.text();

            if (response.ok &&
                result.toLowerCase().includes("successful")) {

                alert("Password reset successful! Please login with your new password.");

                resetPasswordForm.reset();

                resetToken = null;

                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );

                showLoginView();

            } else {

                alert(result || "Password reset failed. Please try again.");

            }

        } catch (error) {

            console.error("Reset Password Error:", error);

            alert("Unable to connect to the server. Please try again.");

        }

    });

});