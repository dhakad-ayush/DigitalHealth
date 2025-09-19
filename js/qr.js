document.addEventListener('DOMContentLoaded', function () {
    // Find the canvas element on the page
    const qrCanvas = document.getElementById('qrCodeCanvas');

    // Check if the canvas element actually exists on the current page
    if (qrCanvas) {
        // This is the data we want to encode in the QR code.
        // In a real app, this would be a unique link or worker ID from the database.
        const workerData = {
            workerId: "WKR12345",
            name: "Ramesh Kumar",
            bloodGroup: "O+",
            emergencyContact: "+919876543210"
        };
        
        // Use the QRious library to generate the QR code
        new QRious({
            element: qrCanvas,
            value: JSON.stringify(workerData), // We are encoding the worker's data as a JSON string
            size: 200, // Size of the QR code in pixels
            padding: 10,
            background: 'white',
            foreground: 'black',
            level: 'H' // High error correction
        });
    }
});