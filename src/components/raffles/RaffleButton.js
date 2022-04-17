import { ToggleButton } from '@mui/material'
import React, { useState } from 'react'

export const RaffleButton = ({ quota, selected, setSelected }) => {
  return (
    <ToggleButton
      value={quota.number}
      selected={selected}
      disabled={quota.status !== 'available'}
      onChange={setSelected}
      sx={{
        width: '100%',
        backgroundColor: quota.status === 'available' ? 'white' : 'transparent'
      }}
      color="primary"
    >
      {quota.number}
    </ToggleButton>
  )
}
