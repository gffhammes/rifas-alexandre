import React from 'react'
import Typography from '@mui/material/Typography';

export const IconAndType = (props) => {
  return (
    <Typography variant="body2" sx={{ alignItems: 'center', display: 'inline-flex', whiteSpace: { sx: 'normal', md: 'nowrap' } }}>
      {<props.icon fontSize='small' sx={{ marginRight: 1 }} />}
      {props.children}
    </Typography>
  )
}
