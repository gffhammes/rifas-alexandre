import { ToggleButton } from '@mui/material'
import React, { useState } from 'react'

export const RaffleButton = ({ raffle, selected, setSelected }) => {
  return (
    <ToggleButton
      value={raffle.id}
      selected={selected}
      disabled={raffle.status !== 'available'}
      onChange={setSelected}
      sx={{
        width: '100%',
        backgroundColor: raffle.status === 'available' ? 'white' : 'transparent'
      }}
      color="primary"
    >
      {raffle.id}
    </ToggleButton>
  )
}
