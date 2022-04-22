import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { currencyBRLMask } from '../../helpers/utils'

export const RaffleCart = ({ selectedNumbers, raffle, handleBuy }) => {
  return (
    <Stack direction='row'>
      <Typography>{`${selectedNumbers.length} cota(s) selecionada(s)`}</Typography>
      <Typography sx={{ marginLeft: 'auto' }}>{`${currencyBRLMask(selectedNumbers.length * raffle.ticketPrice)}`}</Typography>
      <Button variant='contained' onClick={handleBuy} disabled={selectedNumbers.length === 0}>Comprar</Button>
    </Stack>
  )
}
