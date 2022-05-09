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
import { CurrencyInput } from '../../commons/form/CurrencyInput';
import { editRaffleData } from '../../../services/raffle';

export function RaffleForm({
  handleClose,
  raffleData,
  ...props
}) {

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = '*Obrigatório'
    }
    
    if (!values.prize) {
      errors.prize = '*Obrigatório'
    }
    
    if (!values.description) {
      errors.description = '*Obrigatório'
    }
    
    if (!values.ticketPrice) {
      errors.ticketPrice = '*Obrigatório'
    }
    
    return errors;
  }

  const cumulativeDiscount = React.useMemo(() => JSON.parse(raffleData.cumulativeDiscount), [raffleData.cumulativeDiscount])

  const getFiveQuotasPrice = () => {
    const fiveQuotasDiscount = cumulativeDiscount.find(discount => discount.trigger === 5)
    return fiveQuotasDiscount.trigger * fiveQuotasDiscount.ticketPrice;
  }

  const getTenQuotasPrice = () => {
    const tenQuotasDiscount = cumulativeDiscount.find(discount => discount.trigger === 10)
    return tenQuotasDiscount.trigger * tenQuotasDiscount.ticketPrice;
  }

  const initialValues = {
    // image: raffleData.image,
    name: raffleData.name,
    prize: raffleData.prize,
    description: raffleData.description,
    ticketPrice: raffleData.ticketPrice,
    fiveQuotasPrice: getFiveQuotasPrice(),
    tenQuotasPrice: getTenQuotasPrice(),
  }

  const handleSubmit = async (values) => {
    const cumulativeDiscount = [
      {
        rule: 'gte',
        trigger: 5,
        ticketPrice: parseFloat(values.fiveQuotasPrice) / 5,
      },
      {
        rule: 'gte',
        trigger: 10,
        ticketPrice: parseFloat(values.tenQuotasPrice) / 10,
      },
    ]
    const data = {
      name: values.name,
      prize: values.prize,
      description: values.description,
      ticketPrice: parseFloat(values.ticketPrice),
      cumulativeDiscount: JSON.stringify(cumulativeDiscount),
    }
    // console.log(data)
    editRaffleData(raffleData.id, data).then(res => console.log(res.json()))
    // handleClose();
  }

  return (
    <Box sx={{ height: '100%', overflowY: 'auto'}}>
        {
          !raffleData
          ? <LoadingCircle />
          : <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form noValidate>
                  <Box sx={{ my: 2 }}>
                    <Grid container spacing={4}>
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
                      <Grid item xs={4}>
                        <CurrencyInput label='1 cota por' name='ticketPrice' required />
                      </Grid>
                      <Grid item xs={4}>
                        <CurrencyInput label='5 cotas por' name='fiveQuotasPrice' />
                      </Grid>
                      <Grid item xs={4}>
                        <CurrencyInput label='10 cotas por' name='tenQuotasPrice' />
                      </Grid>
                    </Grid>
                  </Box>
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
