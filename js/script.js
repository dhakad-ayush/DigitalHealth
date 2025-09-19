// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // Select the navbar element
    const navbar = document.querySelector('.navbar');

    // Add an event listener for the 'scroll' event on the window
    window.addEventListener('scroll', function() {
        // Check if the user has scrolled more than 50 pixels down from the top
        if (window.scrollY > 50) {
            // If scrolled, add the 'navbar-scrolled' class to the navbar
            navbar.classList.add('navbar-scrolled');
        } else {
            // If not scrolled enough, remove the 'navbar-scrolled' class
            navbar.classList.remove('navbar-scrolled');
        }
    });

});