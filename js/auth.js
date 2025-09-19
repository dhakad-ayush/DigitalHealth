// This function runs when the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // 1. INITIALIZE DUMMY DATABASE ON FIRST RUN
    // ===================================================================
    function initializeData() {
        if (localStorage.getItem('usersInitialized')) {
            return;
        }
        const users = {
            workers: [
                { id: 'WKR12345', phone: '9876543210', password: 'password123', role: 'worker', name: 'Ramesh Kumar', dob: '1990-05-15', state: 'West Bengal', bloodGroup: 'O+' }
            ],
            doctors: [
                { id: 'DOC54321', email: 'doctor@test.com', password: 'password123', role: 'doctor', name: 'Dr. Priya Sharma', specialization: 'General Physician' }
            ],
            admins: [
                { id: 'ADM001', username: 'admin', password: 'password123', role: 'admin', name: 'Admin User' }
            ]
        };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('usersInitialized', 'true');
        console.log('Dummy database initialized in localStorage.');
    }
    initializeData();

    // ===================================================================
    // 2. HANDLE LOGIN FORMS
    // ===================================================================
    const handleLogin = (formId, userType, credentialField, redirectUrl) => {
        const loginForm = document.getElementById(formId);
        if (!loginForm) return;

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const users = JSON.parse(localStorage.getItem('users'));
            const userList = users[userType];
            const credential = document.getElementById(credentialField).value;
            const password = document.getElementById('password').value;
            const foundUser = userList.find(user => (user.phone === credential || user.email === credential || user.username === credential) && user.password === password);

            if (foundUser) {
                const sessionData = {
                    isLoggedIn: true,
                    userId: foundUser.id,
                    role: foundUser.role,
                    name: foundUser.name
                };
                sessionStorage.setItem('userSession', JSON.stringify(sessionData));
                window.location.href = redirectUrl;
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    };
    handleLogin('workerLoginForm', 'workers', 'workerId', 'worker.html');
    handleLogin('doctorLoginForm', 'doctors', 'doctorCredential', 'doctor.html');
    handleLogin('adminLoginForm', 'admins', 'adminUsername', 'admin.html');
});

function handleLogout() {
    sessionStorage.removeItem('userSession');
    window.location.href = 'login.html';
}