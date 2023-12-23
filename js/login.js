/*
    Name: Daniel Torres Jr.
    Date: 11/30/2023
    Course: Fall 2023 CIS 182 D DA
    Program: A program with a simple login form that validates the user’s entries. Authorizing the
    user to enter the site if the entries are valid.
        - Email
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
            - create a constant variable `email` that holds the value of the id `#email`
            - create a constant variable `password` that holds the value of the id `password`
            - get the value from `email` and trim the whitespace
            - get the value from `password` and trim the whitespace 
            - define the email pattern using regular expression
            - validate email:
                - Check if `email_value` is empty
                - Check if `email_value` matches `email_format`
                - if there is an error add create error message and add to messages array
            - define the password pattern using regular expression
            - validate password:
                - check if `password_value` is empty
                - check if `password_value` matches `password_format`
                - if there is an errror, create error message and add to messages array
            - prevent the form from submitting
            - hardcode a user to test login
                - create an object `user` with a set email and password

            - check if the email and password match the hardcoded object user
                - if they do redirect to home page
                - else display an error message            
        - create an event handler for the button with the id as `#reset`
            - remove the element with the clas as `.messages`
            - focus on the element with the id as `#email1` 
*/

"use strict";
$(document).ready(() => {
    $("#email").focus();
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

        // create constant variables for email and password ids 
        const email = $("#email");
        const password = $("#password");

        // get values and trim whitespace from email and password
        const email_value = email.val().trim();
        const password_value = password.val().trim();

        // email validation using regular expression
        const email_format = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

        // checks if email is empty, and checks to match with email_format
        if (email_value === "") {
            messages[messages.length] = "Please enter an email.";
        } else if (!email_format.test(email_value)) {
            messages[messages.length] = "Please enter a valid email.";
        } 

        // password validation using regular expression
        const password_format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        // checks if password is empty, and checks to match with password_format
        if (password_value === "") {
            messages[messages.length] = "Please enter a password.";
        } else if (!password_format.test(password_value)) {
            messages[messages.length] = "Please enter a valid password.";
        }

        // prevents the form from submitting
        event.preventDefault();


        /**********************************************************************/
        // hardcoding a user for now to test login
        const user = {
            email: "admin@test.com",
            password: "Password123!"
        };

        // check if email and password match
        if (email_value === user.email && password_value === user.password) {
            // redirect to home page
            window.location.href = "home.html";
        } else {
            // display error message
            display_error_messages(messages);
        }
        /**********************************************************************/

    });

    // reset button, clears error messages and add focus to email input
    $("#reset").click(() => {
        $(".messages").remove();
        $("#email").focus();
    });
});
