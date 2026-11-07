document.addEventListener("DOMContentLoaded", function () {

   
    // GET HTML ELEMENTS
    

    const welcomeName = document.getElementById("welcomeName");

    const profileName = document.getElementById("profileName");

    const todayDate = document.getElementById("todayDate");

    const currentYear = document.getElementById("currentYear");

    const logoutButton = document.getElementById("logoutButton");

    const menuButton = document.getElementById("menuButton");

    const sidebar = document.getElementById("sidebar");

    const exploreButton = document.getElementById("exploreButton");

    const notificationButton = document.getElementById("notificationButton");

    const toast = document.getElementById("toast");

    const toastMessage = document.getElementById("toastMessage");


   
    //  GET LOGGED-IN USER NAME
    

    const savedName = localStorage.getItem("climentosUserName");

    const userName = savedName || "User";

    welcomeName.textContent = userName;

    profileName.textContent = userName;


    
    // DISPLAY TODAY'S DATE
  

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {

        day: "2-digit",

        month: "short",

        year: "numeric"

    });

    todayDate.textContent = formattedDate;


  
    //  DISPLAY CURRENT YEAR
    

    currentYear.textContent = today.getFullYear();


   
    // TOAST FUNCTION
    

    let toastTimer;

    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }


    
    //  SIDEBAR MENU
  

    menuButton.addEventListener("click", function () {

        sidebar.classList.toggle("open");

    });


    //  NAVIGATION LINKS
    

    const navigationLinks = document.querySelectorAll(".nav-link");

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            // Remove active class from all links

            navigationLinks.forEach(function (item) {

                item.classList.remove("active");

            });

            // Add active class to clicked link

            link.classList.add("active");

            // Get the section name

            const sectionName = link.getAttribute("href").substring(1);

            // Home and Dashboard

            if (sectionName === "home" ||
                sectionName === "dashboard") {

                document.getElementById(sectionName).scrollIntoView({

                    behavior: "smooth"

                });

                sidebar.classList.remove("open");

                return;

            }

            // Other sections are placeholders for now

            showToast(sectionName.charAt(0).toUpperCase() +
                      sectionName.slice(1) +
                      " section will be connected later.");

            sidebar.classList.remove("open");

        });

    });


  
    // EXPLORE DASHBOARD BUTTON
   
    exploreButton.addEventListener("click", function () {

        document.getElementById("dashboard").scrollIntoView({

            behavior: "smooth"

        });

        showToast("Welcome to your Climentos dashboard!");

    });


    
    // QUICK ACTION BUTTONS
  

    const actionButtons = document.querySelectorAll(".action-item");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const action = button.getAttribute("data-action");

            showToast(action.charAt(0).toUpperCase() +
                      action.slice(1) +
                      " section will be connected later.");

        });

    });


    // NOTIFICATION BUTTON
  

    notificationButton.addEventListener("click", function () {

        showToast("You are all caught up!");

    });


    
    //  LOGOUT
  

    logoutButton.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {

            // Remove logged-in user information

            localStorage.removeItem("climentosUserName");

            // Return to login page

            window.location.href = "index.html";

        }

    });


    
    //  WELCOME MESSAGE
   

    setTimeout(function () {

        showToast("Welcome to Climentos, " + userName + "!");

    }, 800);


});