"use strict";

$(document).ready(() => {
    $("#header").hide().fadeIn(2000);
    
    $(".video-container iframe").hover(
        evt => $(evt.currentTarget).stop(true).animate({ top: 15 }, "fast"),
        evt => $(evt.currentTarget).stop(true).animate({ top: 0 }, "fast")
        );
});

