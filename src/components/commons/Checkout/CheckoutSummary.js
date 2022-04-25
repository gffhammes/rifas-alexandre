import { Alert, Box, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { currencyBRLMask } from '../../../helpers/utils'

export const CheckoutSummary = ({ selectedNumbers, raffle, total }) => {
  return (
    <Stack spacing={1.5}>
      <Alert severity="warning">Realize o pagamento para efetivar a participação no sorteio</Alert>
      <Typography variant='caption'>{raffle.name}</Typography>
      <Stack direction='row' flexWrap='wrap' spacing={1}>
        {selectedNumbers.map((number) => <Chip key={number} label={number}/>)}
      </Stack>
      <Divider />
      <Stack direction='row' justifyContent='space-between'>        
        <Typography>{selectedNumbers.length} cota(s)</Typography>
        <Typography><strong>{currencyBRLMask(total)}</strong></Typography>
      </Stack>
    </Stack>    
  )
}
