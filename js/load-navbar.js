// Not used for the time being.

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the navbar HTML
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        // Insert the navbar HTML into the placeholder
        document.getElementById('navbar').innerHTML = data;
      });
  });