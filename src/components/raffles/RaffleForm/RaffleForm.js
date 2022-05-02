import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, useFormik } from 'formik';
import { Box, Grid, Typography } from '@mui/material';
import { Input } from '../../commons/form/Input'
import { LoadingCircle } from '../../commons/LoadingCircle';
import { TicketDiscount } from './TicketDiscount';

export function RaffleForm({
  handleClose,
  raffleData,
  ...props
}) {

  console.log(raffleData)

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = '*Obrigatório'
    }

    if (!values.email) {
      errors.email = '*Obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!values.phone) {
      errors.phone = '*Obrigatório';
    }

    return errors;
  }

  const initialValues = {
    image: raffleData.image,
    name: raffleData.name,
    prize: raffleData.prize,
    description: raffleData.description,
    ticketPrice: raffleData.ticketPrice,
    // cumulativeDiscount: '',
  }

  return (
    <Box sx={{ height: '100%', overflowY: 'auto'}}>
        {
          !raffleData
          ? <LoadingCircle />
          : <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={async (values) => {
                await handleBuy(values)
                setIsUserForm(false)
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit} noValidate>
                  <Box>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Input
                        id="image"
                        name="image"
                        label="Imagem"
                        type="text"
                        fullWidth
                        required
                        sx={{ mt: 2 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        id="name"
                        name="name"
                        label="Título"
                        type="text"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        id="prize"
                        name="prize"
                        label="Prêmio"
                        type="text"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Input
                        id="description"
                        name="description"
                        label="Descrição"
                        type="text"
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                  </Box>
                  <TicketDiscount ticketPrice={props.values.ticketPrice} />
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <LoadingButton loading={false} variant='contained' type='submit'>CONTINUAR</LoadingButton>
                  </DialogActions>
                </Form>
              )}
            </Formik>
        }        
    </Box>    
  );
}
