"use strict";

const $ = selector => document.querySelector(selector);

const display_error_message = (input, msg) => {
    const error_element = input.nextElementSibling;
    
    if (!error_element) {
        const error_div = document.createElement("div");
        error_div.classList.add("error");
        error_div.textContent = msg;
        input.parentNode.appendChild(error_div);
    } else {
        error_element.textContent = msg;
    }
};

const clear_error_message = (input) => {
    const error_element = input.nextElementSibling;
    if (error_element) {
        error_element.remove();
    }
};

const validate_email = (email) => {
    const email_format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return email.match(email_format);
};

const validate_password = (password) => {
    return password.length >= 8;
};

const validate_form = () => {
    // get form controls to check for validity
    const email1 = $("#email1");
    const email2 = $("#email2");
    const password = $("#password");

    const email1_valid = validate_email(email1.value);
    const email2_valid = validate_email(email2.value);
    const password_valid = validate_password(password.value);

    // check user entries for validity
    if (email1_valid && email2_valid) {
        clear_error_message(email1);
        clear_error_message(email2);        
    } else {
        display_error_message(email1, "Invalid email.");
        display_error_message(email2, "Invalid email.");
    }

    if (email1.value === email2.value) {
        clear_error_message(email2);
    } else {
        display_error_message(email2, "Emails do not match.");
    }
    
    if (email1.value == "" || email2.value == "") {
        display_error_message(email1, "Please enter an email.");
    } else {
        clear_error_message(email1);
    }

    if (password_valid) {
        clear_error_message(password);
    } else {
        display_error_message(password, "Password must be at least 8 characters long.");
    }

    return email1_valid && email2_valid && password_valid;
};

const clear_form = () => {
    $("form").reset();          // resets text fields
    const error_elements = document.querySelectorAll(".error");
    error_elements.forEach(element => element.remove());
    $("#email1").focus();
};

document.addEventListener("DOMContentLoaded", () => {
    $("#join").addEventListener("click", (e) => {
        if (!validate_form()) {
            e.preventDefault();
    }
    });

    $("#clear_form").addEventListener("click", clear_form);
    $("#email1").focus();
});
