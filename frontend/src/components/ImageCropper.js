import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ImageCropper = ({ open, image, onClose, onCrop }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    onCrop(croppedImage);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <Cropper
          src={image}
          style={{ height: 400, width: '100%' }}
         
          initialAspectRatio={1}
          guides={false}
          ref={cropperRef}
          viewMode={1}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleCrop} color="primary">Crop</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
