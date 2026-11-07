// =====================================
// 1. WAIT FOR HTML TO LOAD
// =====================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // 2. GET HTML ELEMENTS
    // =====================================

    const welcomeName = document.getElementById("welcomeName");

    const profileName = document.getElementById("profileName");

    const todayDate = document.getElementById("todayDate");

    const currentYear = document.getElementById("currentYear");

    const logoutButton = document.getElementById("logoutButton");

    const exploreButton = document.getElementById("exploreButton");

    const toast = document.getElementById("toast");

    const toastMessage = document.getElementById("toastMessage");


    // =====================================
    // 3. GET LOGGED-IN USER NAME
    // =====================================

    const savedUserName = localStorage.getItem("climentosUserName");

    const userName = savedUserName || "User";


    // Display name on welcome page

    if (welcomeName) {
        welcomeName.textContent = userName;
    }


    // Display name in profile section

    if (profileName) {
        profileName.textContent = userName;
    }


    // =====================================
    // 4. DISPLAY TODAY'S DATE
    // =====================================

    if (todayDate) {

        const today = new Date();

        const formattedDate = today.toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric"

        });

        todayDate.textContent = formattedDate;

    }


    // =====================================
    // 5. DISPLAY CURRENT YEAR
    // =====================================

    if (currentYear) {

        const year = new Date().getFullYear();

        currentYear.textContent = year;

    }


    // =====================================
    // 6. TOAST MESSAGE FUNCTION
    // =====================================

    let toastTimer;

    function showToast(message) {

        if (!toast || !toastMessage) {
            return;
        }

        // Display message

        toastMessage.textContent = message;

        // Show toast

        toast.classList.add("show");

        // Clear previous timer

        clearTimeout(toastTimer);

        // Hide toast after 3 seconds

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }


    // =====================================
    // 7. EXPLORE MORE BUTTON
    // =====================================

    if (exploreButton) {

        exploreButton.addEventListener("click", function () {

            showToast("Welcome to Climentos! Your journey starts here.");

        });

    }


    // =====================================
    // 8. LOGOUT FUNCTIONALITY
    // =====================================

    if (logoutButton) {

        logoutButton.addEventListener("click", function () {

            // Ask for confirmation

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );


            if (confirmLogout) {

                // Remove saved username

                localStorage.removeItem("climentosUserName");

                // Return to login page

                window.location.href = "index.html";

            }

        });

    }


    // =====================================
    // 9. WELCOME TOAST MESSAGE
    // =====================================

    setTimeout(function () {

        showToast("Welcome to Climentos!");

    }, 800);


});