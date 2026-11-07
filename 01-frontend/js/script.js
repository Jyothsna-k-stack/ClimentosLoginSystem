//JS excutes after the html document is loaded
document.addEventListener("DOMContentLoaded", function () {

    // LOGIN VIEW

    const loginView =
        document.getElementById("loginView");


    // FORGOT PASSWORD VIEW

    const forgotView =
        document.getElementById("forgotView");


    // CREATE ACCOUNT VIEW

    const signupView =
        document.getElementById("signupView");



  
    // 2. GET BUTTONS
   


    const forgotPasswordBtn =
        document.getElementById("forgotPasswordBtn");


    const createAccountBtn =
        document.getElementById("createAccountBtn");


    const backToLoginFromForgot =
        document.getElementById("backToLoginFromForgot");


    const backToLoginFromSignup =
        document.getElementById("backToLoginFromSignup");



    // 3. GET PASSWORD ELEMENTS
  


    const passwordInput =
        document.getElementById("password");


    const togglePassword =
        document.getElementById("togglePassword");



    // 4. GET FORMS
   


    const loginForm =
        document.getElementById("loginForm");


    const forgotForm =
        document.getElementById("forgotForm");


    const signupForm =
        document.getElementById("signupForm");



  
    // 5. SHOW LOGIN VIEW
   


    function showLogin() {


        // Show login

        loginView.style.display = "block";


        // Hide forgot password

        forgotView.style.display = "none";


        // Hide signup

        signupView.style.display = "none";


        // Clear password

        passwordInput.value = "";


        // Hide password again

        passwordInput.type = "password";


        // Reset button text

        togglePassword.textContent = "Show";


    }



   
    // 6. SHOW FORGOT PASSWORD VIEW
    


    function showForgotPassword() {


        loginView.style.display = "none";


        forgotView.style.display = "block";


        signupView.style.display = "none";


    }



    // 7. SHOW SIGNUP VIEW
   


    function showSignup() {


        loginView.style.display = "none";


        forgotView.style.display = "none";


        signupView.style.display = "block";


    }



    
    // 8. FORGOT PASSWORD BUTTON
    


    forgotPasswordBtn.addEventListener(
        "click",
        function () {


            showForgotPassword();


        }
    );



  
    // 9. CREATE ACCOUNT BUTTON
    


    createAccountBtn.addEventListener(
        "click",
        function () {


            showSignup();


        }
    );



   
    // 10. BACK TO LOGIN FROM FORGOT
   


    backToLoginFromForgot.addEventListener(
        "click",
        function () {


            showLogin();


        }
    );



  
    // 11. BACK TO LOGIN FROM SIGNUP
   


    backToLoginFromSignup.addEventListener(
        "click",
        function () {


            showLogin();


        }
    );



  
    // 12. SHOW / HIDE PASSWORD
   


    togglePassword.addEventListener(
        "click",
        function () {


            // Check password type

            if (passwordInput.type === "password") {


                // Show password

                passwordInput.type = "text";


                // Change button

                togglePassword.textContent = "Hide";


            } else {


                // Hide password

                passwordInput.type = "password";


                // Change button

                togglePassword.textContent = "Show";


            }


        }
    );



    
    // 13. LOGIN FORM
  


    loginForm.addEventListener(
        "submit",
        function (event) {


            // Prevent page refresh

            event.preventDefault();



            // Get email

            const email =
                document.getElementById("email").value.trim();



            // Get password

            const password =
                passwordInput.value;
            //email validation
            if(email===""){
                alert("please enter your email");
                return
            }


            // Check password

            if (password==="") {


                alert(
                    "Please enter your password"
                );


                return;


            }



            // Frontend validation

            //extract username from email

            const username=email.split("@")[0];

            //store username
            localStorage.setItem("climentosUserName",username);
          
            //open welcome page
            window.location.href="welcome.html";


            // Display email in console

            console.log("Login email:", email);



            // Backend login will be connected later.


        }
    );



    // 14. CREATE ACCOUNT FORM
    


    signupForm.addEventListener(
        "submit",
        function (event) {


            // Prevent page refresh

            event.preventDefault();



            // Get full name

            const fullName =
                document.getElementById("fullName").value.trim();



            // Get email

            const email =
                document.getElementById("signupEmail").value.trim();



            // Get password

            const password =
                document.getElementById("signupPassword").value;



            // Get confirm password

            const confirmPassword =
                document.getElementById("confirmPassword").value;



            // Check password length

            if (password.length < 6) {


                alert(
                    "Password must contain at least 6 characters."
                );


                return;


            }



            // Check password matching

            if (password !== confirmPassword) {


                alert(
                    "Password and confirm password do not match!"
                );


                return;


            }



            // Frontend validation

            alert(
                "Account form validation successful!"
            );



            // Display information in console

            console.log("Name:", fullName);

            console.log("Email:", email);



            // Backend registration will be connected later.


        }
    );



   
    // 15. FORGOT PASSWORD FORM
  


    forgotForm.addEventListener(
        "submit",
        function (event) {


            // Prevent page refresh

            event.preventDefault();



            // Get email

            const email =
                document.getElementById("resetEmail").value.trim();



            // Get new password

            const newPassword =
                document.getElementById("newPassword").value;



            // Get confirm password

            const confirmPassword =
                document.getElementById("confirmResetPassword").value;



            // Check password length

            if (newPassword.length < 6) {


                alert(
                    "Password must contain at least 6 characters."
                );


                return;


            }



            // Check password matching

            if (newPassword !== confirmPassword) {


                alert(
                    "New password and confirm password do not match!"
                );


                return;


            }



            // Frontend validation

            alert(
                "Password reset form validation successful!"
            );



            // Display email in console

            console.log("Reset email:", email);



            // Actual password reset will be connected
            // to Spring Boot later.


        }
    );



    // 16. INITIAL PAGE
   


    showLogin();



});