/* 
Name: Daniel Torres Jr.
Date: 11/07/2023
Course: Fall 2023 CIS 182 D DA
Program: A program with a simple registration form that validates the user’s entries. Authorizing the
user to enter the site if the entries are valid.
- Email
- Confirm Email
- Password
Algorithm:
- Use strict, to follow best practices in script
- use jquery to load in document
- define the email pattern using regular expression
- define the password pattern using regular expression
- add an event handler to submit the form
        - validate emails:
        - get the value of the elements with the id as #email1, and #email2 and trim surrounding whitespace
            - if everything passes clear out error message
        - validate password:
            - get the value of the element with the id as #password and trim surrounding whitespace
            - else clear the error message
            - prevent the submission of the form 
            */
"use strict";
$(document).ready(() => {
    $("#email1").focus();
    const display_error_messages = messages => {
        // create a new ul tag 
        const ul = document.createElement("ul");
        ul.classList.add("messages");

        // create li tag for each error message and add to ul tag 
        for (let message of messages) {
            const li = document.createElement("li");
            const text = document.createTextNode(message);
            li.appendChild(text);
            ul.appendChild(li);
        }

        // if no ul element yet, add it before form tag, Otherwise, replace it
        const node = $(".messages");
        if (node.length === 0) {
            const form = $("form");
            form.parent().get(0).insertBefore(ul, form.get(0));
        } else {
            node.replaceWith(ul);
        }
    }

    $(".form-content").submit(event => {


        // create array for error messages
        const messages = [];

        // get form controls to check
        const email1 = $("#email1");
        const email2 = $("#email2");
        const password = $("#password");

        // get form values and trim any whitespace
        const email1_value = email1.val().trim();
        const email2_value = email2.val().trim();
        const password_value = password.val().trim();

        // email validation using regular expression
        const email_format = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

        // checks if emails are empty, match email_format, and match each other
        if (email1_value === "" || email2_value === "") {
            if (email1_value === "" && email2_value === "") {
                messages[messages.length] = "Please enter an email and an email confirmation.";
            } else if (email1_value === "") {
                messages[messages.length] = "Please enter an email.";
            } else {
                messages[messages.length] = "Please enter a confirmation email.";
            }
        } else if (!email_format.test(email1_value) || !email_format.test(email2_value)) {
            if (!email_format.test(email1_value)) {
                messages[messages.length] = "Please enter a valid email.";
            } else {
                messages[messages.length] = "Please enter a valid confirmation email.";
            }
        } else if (email1_value !== email2_value) {
            messages[messages.length] = "Emails do not match.";
        }

        // password validation using regular expression
        const password_format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        // check is password is empty, and if it matches the password_format
        if (password_value === "") {
            messages[messages.length] = "Please enter a password.";
        } else if (!password_format.test(password_value)) {
            messages[messages.length] = "Password must be at least 8 characters long and have one digit, one lowercase & uppercase letter, and a symbol at minimum.";
        }

        // submit form the form or notify the user of errors
        if (messages.length > 0) {
            event.preventDefault();
            display_error_messages(messages)
        }
    });

    $("#reset").click(() => {
        $(".messages").remove()
        $("#email1").focus();
    });


});
