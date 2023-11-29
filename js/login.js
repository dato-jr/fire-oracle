/*
    Name: Daniel Torres Jr.
    Date: 11/07/2023
    Course: Fall 2023 CIS 182 D DA
    Program: A program with a simple login form that validates the user’s entries. Authorizing the
    user to enter the site if the entries are valid.
        - Email
        - Password
    Algorithm:
        - Use strict, to follow best practices in script
        - use jquery to load in document
        - define the email pattern using regular expression
        - define the password pattern using regular expression
        - add an event handler to submit the form
            - validate email:
                - get the value of the element with the id as #email, and trim surrounding whitespace
                - if everything passes clear out error message
            - validate password:
                - get the value of the element with the id as #password and trim surrounding whitespace
                - else clear the error message
                - prevent the submission of the form (Though I have commented out and set the even to preventDefault)
            - hardcode a user for now to test login
                - create an object with the email and password
            - check if the email and password match the hardcoded user
                - if they do redirect to home page
                - else display an error message            
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

        // get form controls to check
        const email = $("#email");
        const password = $("#password");

        // get form values and trim whitespace
        const email_value = email.val().trim();
        const password_value = password.val().trim();

        // email validation using regular expression
        const email_format = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

        // checks if email is empty, and match regular expression
        if (email_value === "") {
            messages[messages.length] = "Please enter an email.";
        } else if (!email_format.test(email_value)) {
            messages[messages.length] = "Please enter a valid email.";
        } 

        // password validation using regular expression
        const password_format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        if (password_value === "") {
            messages[messages.length] = "Please enter a password.";
        } else if (!password_format.test(password_value)) {
            messages[messages.length] = "Please enter a valid password.";
        }

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
    $("#reset").click(() => {
        $(".messages").remove();
        $("#email").focus();
    });
});
