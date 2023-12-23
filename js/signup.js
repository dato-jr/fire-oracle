/* 
Name: Daniel Torres Jr.
Date: 11/07/2023
Course: Fall 2023 CIS 182 D DA
Program: A program with a simple registration form that validates the user’s entries. Authorizing the
user to login with the with the information used to register--using the following data:
    - Email
    - Confirm Email
    - Password
Algorithm:
    - Use strict, to follow best practices in script
    - use jquery to load in document
    - create a constant variable to hold the function `display_error_messages` that accepts the parameter as `messages`
        - this function will create a new `ul` element
        - then add the class `messages` to the `ul` element
        - then we create a `li` element within the `ul` for every message using a for loop
            - first create a constant variable `li` that holds the value of the created element `li`
            - then create a constant variable `text` that holds the value of the created text node `message`
            - add the `text` to `li`
            - add the `li` to the `ul` 
        - next we create a constant variable `node` to hold the value of the element with class as `.messages`
        - If the `node` is not created then
            - create a constant variable `form` to hold the value of the element `form`                
            - then add the `node` to the DOM before the `form` element
        - else just replace the node with the element `ul`
    - next create a event handler that submits the element with the class `.form-content`
        - create an array for the error messages
        - create a constant variable `email1` that holds the value of the id `#email1`
        - create a constant variable `email2` that holds the value of the id `#email2`
        - create a constant variable `password` that holds the value of the id `password`
        - get the value from `email1` and trim the whitespace as `email1_value`
        - get the value from `email2` and trim the whitespace as `email2_value`
        - get the value from `password` and trim the whitespace as `password_value`
        - define the email pattern using regular expression
        - validate emails:
            - if `email1_value` or `email2_value` is empty
                - if both are empty create error messages and add to messages array
                - else if `email1_value` is empty create error message and add to messages array
                - else create error message and add message to messages array 
            - else if `email1_value` or `email2_value` matches email_format
                - if `email1_value` does not match create error message and add to messages array
                - else create error message and add message to messages array
            - else if `email1_value` does not match `email2_value` create error message and add to messages array
        - define the password pattern using regular expression
        - validate password:
            - if `password_value` is empty create error message then add to messages array
            - else if `password_value` does match with `password_format` create error message and add to messages array
        - if there are any error messages prevent the form from submission and display all error messages
    - create an event handler for the button with the id as `#reset`
        - remove the element with the clas as `.messages`
        - focus on the element with the id as `#email1` 
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
