import { Grid } from '@mui/material'
import React from 'react'
import { QuotaButton } from './QuotaButton'

export const QuotasGrid = ({ quotas, selectedNumbers, handleNumberClick }) => {
  return (
    <Grid container spacing={1}>
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
  )
}
