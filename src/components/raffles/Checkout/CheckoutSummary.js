import { Alert, Box, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { currencyBRLMask } from '../../../helpers/utils'

export const CheckoutSummary = ({ selectedNumbers, raffle, total }) => {
  const sortedSelectedNumbers = selectedNumbers.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  return (
    <Stack spacing={1.5}>
      <Alert severity="warning">Realize o pagamento para efetivar a participação no sorteio</Alert>
      <Typography variant='caption'>{raffle.name}</Typography>
      <Stack direction='row' flexWrap='wrap' spacing={1}>
        {sortedSelectedNumbers.map((number) => <Chip key={number} label={number}/>)}
      </Stack>
      <Divider />
      <Stack direction='row' justifyContent='space-between'>        
        <Typography>{selectedNumbers.length} cota(s)</Typography>
        <Typography><strong>{currencyBRLMask(total)}</strong></Typography>
      </Stack>
    </Stack>    
  )
}
