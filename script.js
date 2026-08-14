const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// =========================
// MOBILE MENU
// =========================

menuToggle.addEventListener("click", () => {
 navMenu.classList.toggle("active");

});


// Close menu after clicking a link

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {
       navMenu.classList.remove("active");
    });

});


// =========================
// CONTACT FORM VALIDATION
// =========================

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formSuccess = document.getElementById("formSuccess");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Clear previous messages

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";


    let isValid = true;


    // Name validation

    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;

    }


    // Email validation

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    }
    else if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;

    }


    // Message validation

    if (messageInput.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        isValid = false;

    }
    else if (messageInput.value.trim().length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;

    }


    // Successful validation

    if (isValid) {

        formSuccess.textContent =
            "Thank you! Your message has been validated successfully.";

        contactForm.reset();

    }

});
