import { Stack, ToggleButton, Tooltip, Typography } from '@mui/material'
import React from 'react'


export const QuotaButton = ({ quota, selected, setSelected }) => {

  const status = () => {
    switch (quota.status) {
      case 'reserved':
        return 'Reservada';
      case 'bought':
        return 'Comprada';
      default:
        return;
    }
  } 

  const Button = () => (
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

  return (
    quota.status === 'available'
    ? <Button />
    : <Tooltip
        title={
          <Stack>
            <Typography variant='caption'>{status()}</Typography>
            <Typography variant='caption'>{quota.owner.name}</Typography>
          </Stack>
        }
        placement="top"
        arrow
      >
          <div>
            <Button/>
          </div>
      </Tooltip>
   
  )
}