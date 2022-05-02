import { Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { CurrencyInput } from './CurrencyInput';

export const AddDiscount = ({ handleAddDiscount }) => {
  const [trigger, setTrigger] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  return (
    <Stack direction='row' spacing={2} alignItems='center'>      
      <TextField label="Gatilho" variant="outlined" value={trigger} onChange={e => setTrigger(e.target.value)} />
      <CurrencyInput label="Preço cota" value={ticketPrice} handleChange={e => setTicketPrice(e.target.value)}/>
      <Button sx={{ height: 'fit-content'}} onClick={() => handleAddDiscount({ trigger, ticketPrice })}>Adicionar</Button>
    </Stack>
  )
}
