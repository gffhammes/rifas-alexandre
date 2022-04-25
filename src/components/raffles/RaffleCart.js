import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { currencyBRLMask } from '../../helpers/utils'

export const RaffleCart = ({ selectedNumbers, raffle, handleBuy, totalPrice }) => {  
  return (
    <Stack direction='row' justifyContent='center' alignItems='center'>
      <Typography>{`${selectedNumbers.length} cota(s) selecionada(s)`}</Typography>
      <Typography sx={{ marginLeft: 'auto' }}>{`${currencyBRLMask(totalPrice)}`}</Typography>
      <Button variant='contained' onClick={handleBuy} sx={{ marginLeft: 2 }} disabled={selectedNumbers.length === 0}>Comprar</Button>
    </Stack>
  )
}
