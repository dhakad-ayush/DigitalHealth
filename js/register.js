// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Get references to all the HTML elements we need ---
    const roleRadios = document.querySelectorAll('input[name="role"]');
    const workerFields = document.getElementById('workerFields');
    const doctorFields = document.getElementById('doctorFields');
    const registrationForm = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('passwordReg');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // --- 2. Function to show/hide fields based on the selected role ---
    function toggleRoleFields() {
        // Check which radio button is currently selected
        if (document.getElementById('roleWorker').checked) {
            // If Worker is selected, show worker fields and hide doctor fields
            workerFields.style.display = 'block';
            doctorFields.style.display = 'none';
        } else {
            // If Doctor is selected, hide worker fields and show doctor fields
            workerFields.style.display = 'none';
            doctorFields.style.display = 'block';
        }
    }

    // --- 3. Add an event listener to the radio buttons ---
    // When the user changes their selection, run the toggleRoleFields function
    roleRadios.forEach(radio => {
        radio.addEventListener('change', toggleRoleFields);
    });

    // --- 4. Handle the form submission ---
    registrationForm.addEventListener('submit', function(event) {
        // Prevent the form from actually submitting to a server (important for our demo)
        event.preventDefault();

        // Check if the passwords in both fields match
        if (passwordInput.value !== confirmPasswordInput.value) {
            // If they don't match, show an alert and stop the process
            alert("Passwords do not match. Please try again.");
            return; 
        }

        // If everything is correct, show a success message
        // In a real application, this is where you would send the data to a server
        alert("Registration successful! (This is a demo). You will now be redirected to the login page.");
        
        // Redirect the user to the login page after successful registration
        window.location.href = 'login.html';
    });
    
    // --- 5. Initial check when the page loads ---
    // Run the function once on page load to set the correct initial state
    toggleRoleFields();
});