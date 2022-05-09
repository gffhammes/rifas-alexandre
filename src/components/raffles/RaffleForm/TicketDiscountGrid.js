import { Grid, IconButton, Divider, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { currencyBRLMask } from '../../../helpers/utils';

export const TicketDiscountGrid = ({ discounts, handleDeleteDiscount }) => {
  return (
    <Grid container sx={{ width: '100%'}}>
      <Grid item xs={12} container>
        <Grid item xs={5}>
          <Typography>Gatilho</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Preço cota</Typography>
        </Grid>
      </Grid>
      {discounts.map((discount, index) => (
        <Grid key={index} item xs={12} container>
          <Grid item xs={5}>
            <Typography>{discount.trigger} un.</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{currencyBRLMask(discount.ticketPrice)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton size='small' onClick={() => handleDeleteDiscount(index)} >
             <DeleteIcon fontSize='inherit' />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
