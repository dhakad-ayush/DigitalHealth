document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DUMMY DATA FOR DOCTORS ---
    const doctorsData = {
        gp: [
            { id: 'doc1', name: 'Dr. Priya Sharma', img: 'https://via.placeholder.com/60' },
            { id: 'doc2', name: 'Dr. Amit Singh', img: 'https://via.placeholder.com/60' }
        ],
        cardio: [
            { id: 'doc3', name: 'Dr. Anbu Rajan', img: 'https://via.placeholder.com/60' }
        ],
        derma: [
            { id: 'doc4', name: 'Dr. Neha Verma', img: 'https://via.placeholder.com/60' }
        ]
        // Add more doctors for other specialties here
    };

    // --- 2. GET HTML ELEMENTS ---
    const specialtySelect = document.getElementById('specialtySelect');
    const doctorSelectionArea = document.getElementById('doctorSelectionArea');
    const timeSlotsContainer = document.getElementById('timeSlotsContainer');
    const bookingForm = document.getElementById('bookingForm');

    // --- 3. FUNCTION TO RENDER DOCTORS BASED ON SPECIALTY ---
    const renderDoctors = () => {
        const selectedSpecialty = specialtySelect.value;
        doctorSelectionArea.innerHTML = ''; // Clear existing doctors

        if (!doctorsData[selectedSpecialty]) {
            doctorSelectionArea.innerHTML = '<p class="text-muted">Please select a specialty to see available doctors.</p>';
            return;
        }

        doctorsData[selectedSpecialty].forEach(doctor => {
            const doctorCardHTML = `
                <div class="doctor-select-card d-flex align-items-center" data-doctor-id="${doctor.id}" data-doctor-name="${doctor.name}">
                    <img src="${doctor.img}" alt="${doctor.name}" class="rounded-circle me-3">
                    <div>
                        <h6 class="mb-0">${doctor.name}</h6>
                        <p class="text-muted mb-0">${specialtySelect.options[specialtySelect.selectedIndex].text}</p>
                    </div>
                </div>`;
            doctorSelectionArea.innerHTML += doctorCardHTML;
        });
    };

    // --- 4. HANDLE CLICK SELECTIONS ---
    document.addEventListener('click', (e) => {
        // Handle doctor selection
        if (e.target.closest('.doctor-select-card')) {
            const card = e.target.closest('.doctor-select-card');
            // Remove 'selected' from all other doctor cards
            document.querySelectorAll('.doctor-select-card').forEach(c => c.classList.remove('selected'));
            // Add 'selected' to the clicked card
            card.classList.add('selected');
        }

        // Handle time slot selection
        if (e.target.closest('.timeslot')) {
            const slot = e.target.closest('.timeslot');
            document.querySelectorAll('.timeslot').forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        }
    });

    // --- 5. EVENT LISTENERS ---
    // Update doctor list when specialty changes
    specialtySelect.addEventListener('change', renderDoctors);

    // Handle form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop form from reloading page
        
        const selectedDoctorCard = document.querySelector('.doctor-select-card.selected');
        const selectedTimeSlot = document.querySelector('.timeslot.selected');
        const selectedDate = document.getElementById('appointmentDate').value;
        const selectedSpecialtyText = specialtySelect.options[specialtySelect.selectedIndex].text;

        if (!selectedDoctorCard || !selectedTimeSlot || !selectedDate) {
            alert('Please complete all steps before confirming.');
            return;
        }

        const doctorName = selectedDoctorCard.dataset.doctorName;
        const time = selectedTimeSlot.textContent;

        const confirmationMessage = `
            Appointment Confirmed!
            ---------------------------
            Specialty: ${selectedSpecialtyText}
            Doctor: ${doctorName}
            Date: ${selectedDate}
            Time: ${time}
        `;

        alert(confirmationMessage);
        window.location.href = 'worker.html'; // Redirect to dashboard after booking
    });

    // Initial render
    renderDoctors();
});