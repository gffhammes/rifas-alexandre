import { Box, Chip, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { currencyBRLMask } from '../../../helpers/utils'

export const CheckoutSummary = ({ selectedNumbers, raffle, total }) => {
  return (
    <Box>
      <Typography>{raffle.name}</Typography>
      <Stack direction='row'>        
        <Typography>{selectedNumbers.length} cotas</Typography>
        <Typography>{currencyBRLMask(total)}</Typography>
      </Stack>
      <Stack direction='row' flexWrap='wrap'>
        {
          selectedNumbers.map((number) => <Chip key={number} label={number}/>)
        }
      </Stack>
      <Divider />

    </Box>
    
  )
}
