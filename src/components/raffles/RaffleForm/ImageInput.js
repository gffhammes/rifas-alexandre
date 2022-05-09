import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';

export const ImageInput = ({ handleImageChange }) => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const handleImageSrcChange = (e) => {
    setUploadData(e.target.files[0])
    setImageSrc(e.target.files[0].name)
  }

  const handleImageUpload = async () => {
    const formData = new FormData();

    formData.append('file', uploadData)
    formData.append('upload_preset', 'rifas-alexandre')

    const data = await fetch('https://api.cloudinary.com/v1_1/de5rrszh7/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json());

    handleImageChange(data)
  }

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <Box>
        <input
          color="primary"
          accept="image/*"
          type="file"
          onChange={handleImageSrcChange}
          id="icon-button-file"
          style={{ display: 'none' }}
        />
        <label htmlFor="icon-button-file">
          <Button
            variant="outlined"
            component="span"
            size="large"
            color="primary"
          >
            <ImageIcon />
          </Button>
        </label>
      </Box>
      <Typography>{imageSrc ? imageSrc : 'Selecione uma imagem...'}</Typography>
      <Button onClick={handleImageUpload}>Upload</Button>
    </Stack>
  )
}
