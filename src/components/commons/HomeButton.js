import { Button } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export const HomeButton = () => {
  return (
    <Link href='/' passHref>
      <Button ariant="outlined" sx={{ width: 'fit-content' }} startIcon={<ArrowBackIcon />}>
        Home
      </Button>
    </Link>
  )
}
