(function() {
    // Get the user session data from sessionStorage
    const userSession = sessionStorage.getItem('userSession');

    // If there is NO session, the user is not logged in
    if (!userSession) {
        // Redirect them to the main login page
        alert("You must be logged in to view this page.");
        window.location.href = 'login.html';
    }
})();