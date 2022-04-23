import { Box, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { currencyBRLMask } from '../../../helpers/utils'

export const CheckoutSummary = ({ selectedNumbers, raffle, total }) => {
  return (
    <Stack spacing={1.5}>
      <Typography>Você reservou as seguintes cotas do sorteio <strong>{raffle.name}</strong></Typography>
      <Stack direction='row' flexWrap='wrap' spacing={1}>
        {selectedNumbers.map((number) => <Chip key={number} label={number}/>)}
      </Stack>
      <Typography>Você deve efetuar o pagamento via PIX em até <strong>10min.</strong> para efetivar a sua participação no sorteio!</Typography>
      <Stack direction='row'>        
        <Typography>{selectedNumbers.length} cota(s)</Typography>
        <Typography>{currencyBRLMask(total)}</Typography>
      </Stack>
    </Stack>    
  )
}
