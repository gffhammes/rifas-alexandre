import { Grid, IconButton, Divider, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { currencyBRLMask } from '../../../helpers/utils';

export const TicketDiscountGrid = ({ discounts, handleDeleteDiscount }) => {
  return (
    <Grid container sx={{ width: '50%'}}>
      <Grid item xs={12} container>
        <Grid item xs={4}>
          <Typography>Gatilho</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Preço cota</Typography>
        </Grid>
        <Divider />
      </Grid>
      {discounts.map((discount, index) => (
        <Grid key={index} xs={12} container>
          <Grid item xs={4}>
            <Typography>{discount.trigger}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{currencyBRLMask(discount.ticketPrice)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <IconButton size='small' onClick={() => handleDeleteDiscount(index)} >
             <DeleteIcon fontSize='inherit' />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
