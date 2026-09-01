document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('report-form');
    const formContainer = document.getElementById('report-form-container');
    const statusContainer = document.getElementById('status-container');
    const statusMessage = document.getElementById('status-message');
    const backBtn = document.getElementById('back-btn');

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.error('Service Worker registration failed', err));
        });
    }

    reportForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const photoFile = document.getElementById('photo').files[0];
        
        const formData = {
            type: document.getElementById('report-type').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            photo: photoFile ? await cleanExifData(photoFile) : null
        };

        const folio = generateFolio();
        console.log(`Report [${folio}] submitted:`, formData);

        showStatus(`Reporte enviado con éxito.<br><strong>Folio: ${folio}</strong><br>Gracias por ayudar a mejorar tu ciudad.`);
    });

    backBtn.addEventListener('click', () => {
        formContainer.classList.remove('hidden');
        statusContainer.classList.add('hidden');
        reportForm.reset();
    });

    function showStatus(message) {
        statusMessage.innerHTML = message;
        formContainer.classList.add('hidden');
        statusContainer.classList.remove('hidden');
    }

    function generateFolio() {
        return 'REP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }

    async function cleanExifData(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    // Convert to Blob to strip metadata (ExifCleaner logic)
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', 0.8);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
});