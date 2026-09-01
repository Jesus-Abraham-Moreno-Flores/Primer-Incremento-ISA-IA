document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('report-form');
    const formContainer = document.getElementById('report-form-container');
    const statusContainer = document.getElementById('status-container');
    const statusMessage = document.getElementById('status-message');
    const backBtn = document.getElementById('back-btn');

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.error('Service Worker registration failed', err));
        });
    }

    // Form Submission
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('report-type').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value
        };

        console.log('Report data submitted:', formData);

        // Simulate API request
        showStatus(`Gracias por tu reporte de ${formData.type}. Hemos recibido la información correctamente.`);
    });

    backBtn.addEventListener('click', () => {
        formContainer.classList.remove('hidden');
        statusContainer.classList.add('hidden');
        reportForm.reset();
    });

    function showStatus(message) {
        statusMessage.textContent = message;
        formContainer.classList.add('hidden');
        statusContainer.classList.remove('hidden');
    }
});