import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('/api/files/upload', formData);
            if (response.status === 200) {
                alert('File uploaded successfully');
            } else {
                alert('Failed to upload file');
            }
        } catch (error) {
            alert('An error occurred while uploading the file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h3>Upload a File</h3>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload} disabled={!file || uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default Upload;