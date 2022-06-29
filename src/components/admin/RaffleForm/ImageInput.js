import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';

export const ImageInput = ({ handleImageChange }) => {
  return (
      <Box>
        <input
          color="primary"
          accept="image/*"
          type="file"
          onChange={handleImageChange}
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
  )
}
