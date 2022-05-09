import { Button, IconButton, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CurrencyInput } from '../../commons/form/CurrencyInput';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const AddDiscount = ({ handleAddDiscount }) => {
  const [trigger, setTrigger] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  return (
    <Stack direction='row' spacing={2} alignItems='center'>      
      <TextField label="Gatilho" variant="standard" value={trigger} onChange={e => setTrigger(e.target.value)} />
      <CurrencyInput label="Preço cota" variant="standard" value={ticketPrice} handleChange={e => setTicketPrice(e.target.value)}/>
      <IconButton sx={{ height: 'fit-content'}} onClick={() => handleAddDiscount({ trigger, ticketPrice })}><AddCircleIcon /></IconButton>
    </Stack>
  )
}
