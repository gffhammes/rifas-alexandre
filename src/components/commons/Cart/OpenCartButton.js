import { Box, Button, Fab, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Context } from '../../../contexts/Context';

export const OpenCartButton = () => {
  const {
    cartItems,
    saveItem,
    removeItem,
    clearCart,
    cartOpen,
    handleCartClick,
    test
  } = useContext(Context);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 0, margin: '1rem' }}>
      <Tooltip title="Ver carrinho" placement="left">
        <Fab color="primary" aria-label="add" component={Button} onClick={() => test()} >
          <ShoppingCartIcon />
        </Fab>
      </Tooltip>
    </Box>
  )
}
