document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileList = document.getElementById('fileList');

    // Fetch and display files on page load
    fetchFiles();

    // Handle file upload
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            uploadForm.reset();
            fetchFiles();
        } else {
            alert('File upload failed');
        }
    });

    // Fetch files from server and display
    async function fetchFiles() {
        const response = await fetch('/files');
        const files = await response.json();

        fileList.innerHTML = '';
        files.forEach(file => {
            const fileLink = document.createElement('a');
            fileLink.href = `/download/${file.id}`;
            fileLink.textContent = file.filename;
            fileList.appendChild(fileLink);
        });
    }
});
