import { ToggleButton } from '@mui/material'
import React from 'react'

export const QuotaButton = ({ quota, selected, setSelected }) => {
  return (
    <ToggleButton
      value={quota.number}
      selected={selected}
      disabled={quota.status !== 'available'}
      onChange={setSelected}
      sx={{
        width: '100%',
        backgroundColor: quota.status === 'available' ? 'white' : '#ff000040'
      }}
      color="primary"
    >
      {quota.number}
    </ToggleButton>
  )
}