import { Grid, Box } from '@mui/material'
import React from 'react'
import { QuotaButton } from './QuotaButton'

export const QuotasGrid = ({ quotas, selectedNumbers, handleNumberClick, ...props }) => {
  return (
    <Box >
      <Grid container spacing={2} sx={{ marginBottom: 6 }}>
        {quotas.map((quota) => {
          const isSelected = (selectedNumbers ? selectedNumbers.includes(quota.number) : false);
          return (
            <Grid item xs={3} sm={2} md={1} key={quota.id}>
              <QuotaButton
                quota={quota}
                selected={isSelected}
                setSelected={() => handleNumberClick(quota.number)}
              />
            </Grid>
          )
        })}
      </Grid>  
    </Box>
  )
}
