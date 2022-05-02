import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { AddDiscount } from './AddDiscount';
import { currencyBRLMask } from '../../../helpers/utils'
import { TicketDiscountGrid } from './TicketDiscountGrid';
import { CurrencyInput } from './CurrencyInput';


export const TicketDiscount = (props) => {
  const [discounts, setDiscounts] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(props.ticketPrice)

  const handleAddDiscount = ({ trigger, ticketPrice }) => {
    if (!trigger || !ticketPrice) return;

    setDiscounts(currentDiscounts => [ ...currentDiscounts, { trigger, ticketPrice } ])
  }

  const handleDeleteDiscount = (discountIndex) => {
    setDiscounts((currentDiscounts) => {
      const newDiscounts = []
      currentDiscounts.forEach(((discount, index) => {
        if (index !== discountIndex) {
          newDiscounts.push(discount)
        }
      }));
      return newDiscounts;
    })
  }

  const handleTicketPriceChange = (e) => {
    setTicketPrice(e.target.value);
  }

  return (
    <Box>
      <Typography mt>Preço da cota</Typography>
      <CurrencyInput label="Preço base" value={ticketPrice} handleChange={handleTicketPriceChange}/>
      {discounts.length > 0 && <TicketDiscountGrid discounts={discounts} handleDeleteDiscount={handleDeleteDiscount} />}
      <AddDiscount handleAddDiscount={handleAddDiscount} />
    </Box>
  )
}
