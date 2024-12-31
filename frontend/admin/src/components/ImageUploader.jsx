import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

const ImageUploader = ({ onUpload }) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [uploadedFilePath, setUploadedFilePath] = useState('');

   const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      setLoading(true);
      setError('');
      try {
         const response = await axios.post('http://localhost:5001/courses/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         });
         setUploadedFilePath(response.data.filePath);
         onUpload(response.data.filePath);
      } catch (error) {
         setError('Failed to upload image');
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   return (
       <Box>
          <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-button"
          />
          <label htmlFor="upload-button">
             <Button
                 variant="contained"
                 component="span"
                 disabled={loading}
             >
                Upload Image
             </Button>
          </label>
          {loading && <CircularProgress size={24} />}
          {error && <Typography color="error">{error}</Typography>}
          {uploadedFilePath && (
              <Typography>Uploaded file: {uploadedFilePath}</Typography>
          )}
       </Box>
   );
};

export default ImageUploader;