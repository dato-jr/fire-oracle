/*
Name: Daniel Torres Jr.
Date: 11/30/2023
Course: Fall 2023 CIS 182 D DA 
Program Description: This program hides the element with the id as `#heading` and then fades it in taking 2 seconds. 
    This program also animates the element `iframe` that is under the element class `.video-container` once it is
    being hovered by the mouse. 
Algorithm: 
    - "use strict" to ensure I am following the best practices
    - use jQuery to initiate the document
    - look for the element with the id as `#header` 
        - hide this element 
        - fade the element in taking 2 seconds 
    - look for the element `iframe` under the element with the class `.video-container`
        - animate this element only when it is being hovered by the mouse
        - once hovered add 15 pixels to top of the element causing the element to drop
        - aftewards go back to 0 pixels on top of the element leading to element moving back up 
*/
"use strict";

$(document).ready(() => {
    // hide heading, then fade in
    $("#header").hide().fadeIn(2000);
    
    // create drop animation once element is hovered 
    $(".video-container iframe").hover(
        evt => $(evt.currentTarget).stop(true).animate({ top: 15 }, "fast"),
        evt => $(evt.currentTarget).stop(true).animate({ top: 0 }, "fast")
        );
});

