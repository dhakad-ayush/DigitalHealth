// This runs when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check the page's <title> to know which dashboard to load
    const pageTitle = document.title;
    if (pageTitle.includes('My Dashboard')) {
        populateWorkerDashboard();
    } else if (pageTitle.includes('Doctor Dashboard')) {
        populateDoctorDashboard();
    } else if (pageTitle.includes('Admin Dashboard')) {
        populateAdminDashboard();
    }
});

/**
 * Populates the Worker Dashboard with dynamic data.
 */
async function populateWorkerDashboard() {
    const session = JSON.parse(sessionStorage.getItem('userSession'));
    if (!session || session.role !== 'worker') return;

    try {
        const [workersRes, prescriptionsRes] = await Promise.all([
            fetch('assets/data/workers.json'),
            fetch('assets/data/prescriptions.json')
        ]);
        const workers = await workersRes.json();
        const prescriptions = await prescriptionsRes.json();
        const currentWorker = workers.find(w => w.id === session.userId);
        if (!currentWorker) return;

        document.getElementById('welcomeName').textContent = currentWorker.name.split(' ')[0] + '!';
        document.getElementById('bloodGroupValue').textContent = currentWorker.bloodGroup;
        const prescriptionsContainer = document.getElementById('prescriptions');
        prescriptionsContainer.innerHTML = '';

        const workerPrescriptions = prescriptions.filter(p => p.workerId === currentWorker.id);
        if (workerPrescriptions.length > 0) {
            const latest = workerPrescriptions.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
            document.getElementById('lastCheckupValue').textContent = latest.date;

            let listHTML = '<ul class="list-group list-group-flush">';
            workerPrescriptions.forEach(p => {
                listHTML += `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div><h6 class="mb-1">${p.diagnosis}</h6><small class="text-muted">${p.date}</small></div>
                        <a href="#" class="btn btn-sm btn-outline-primary" data-lang="view_button">View</a>
                    </li>`;
            });
            listHTML += '</ul>';
            prescriptionsContainer.innerHTML = listHTML;
        } else {
            document.getElementById('lastCheckupValue').textContent = 'N/A';
            prescriptionsContainer.innerHTML = '<p class="text-center text-muted mt-3" data-lang="no_prescriptions">No prescriptions found.</p>';
        }

        // ADDED: Re-apply translation after content is loaded
        if (typeof translatePage === 'function') {
            const userLanguage = localStorage.getItem('userLanguage') || 'en';
            translatePage(userLanguage);
        }

    } catch (error) {
        console.error('Error loading worker dashboard:', error);
    }
}

/**
 * Populates the Doctor Dashboard with dynamic data.
 */
async function populateDoctorDashboard() {
    const session = JSON.parse(sessionStorage.getItem('userSession'));
    if (!session || session.role !== 'doctor') return;

    try {
        const [doctorsRes, patientsRes, workersRes] = await Promise.all([
            fetch('assets/data/doctors.json'),
            fetch('assets/data/patients.json'),
            fetch('assets/data/workers.json')
        ]);
        const doctors = await doctorsRes.json();
        const patients = await patientsRes.json();
        const workers = await workersRes.json();
        const currentDoctor = doctors.find(doc => doc.id === session.userId);
        if (!currentDoctor) return;

        document.getElementById('doctorWelcomeMessage').innerHTML = `<span data-lang="welcome_doctor">Welcome,</span> ${currentDoctor.name}!`;
        const myPatients = patients.filter(p => p.doctorId === currentDoctor.id);
        const patientListBody = document.getElementById('patientList');
        patientListBody.innerHTML = '';

        if (myPatients.length > 0) {
            myPatients.forEach(patient => {
                const workerInfo = workers.find(w => w.id === patient.workerId);
                if (workerInfo) {
                    patientListBody.innerHTML += `
                        <tr>
                            <td>${workerInfo.name}</td>
                            <td>${workerInfo.id}</td>
                            <td>${patient.lastVisit}</td>
                            <td><a href="#" class="btn btn-sm btn-outline-primary" data-lang="view_record_button">View Record</a></td>
                        </tr>`;
                }
            });
        } else {
            patientListBody.innerHTML = '<tr><td colspan="4" class="text-center text-muted" data-lang="no_patients_found">No patients found.</td></tr>';
        }

        // ADDED: Re-apply translation after content is loaded
        if (typeof translatePage === 'function') {
            const userLanguage = localStorage.getItem('userLanguage') || 'en';
            translatePage(userLanguage);
        }

    } catch (error) {
        console.error('Error loading doctor dashboard:', error);
    }
}

/**
 * Populates the Admin Dashboard with dynamic data.
 */
async function populateAdminDashboard() {
    const session = JSON.parse(sessionStorage.getItem('userSession'));
    if (!session || session.role !== 'admin') return;

    try {
        const [workersRes, doctorsRes] = await Promise.all([
            fetch('assets/data/workers.json'),
            fetch('assets/data/doctors.json')
        ]);
        const workers = await workersRes.json();
        const doctors = await doctorsRes.json();

        document.getElementById('totalWorkersStat').textContent = workers.length;
        document.getElementById('totalDoctorsStat').textContent = doctors.length;
        const workerListBody = document.getElementById('adminWorkerList');
        workerListBody.innerHTML = '';
        workers.forEach(worker => {
            workerListBody.innerHTML += `<tr><td>${worker.name}</td><td>${worker.id}</td><td>${worker.homeState}</td></tr>`;
        });
        const doctorListBody = document.getElementById('adminDoctorList');
        doctorListBody.innerHTML = '';
        doctors.forEach(doctor => {
            doctorListBody.innerHTML += `<tr><td>${doctor.name}</td><td>${doctor.id}</td><td>${doctor.specialization}</td></tr>`;
        });

        // ADDED: Re-apply translation after content is loaded
        if (typeof translatePage === 'function') {
            const userLanguage = localStorage.getItem('userLanguage') || 'en';
            translatePage(userLanguage);
        }

    } catch (error) {
        console.error('Error loading admin dashboard:', error);
    }
}