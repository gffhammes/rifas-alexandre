import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, useFormik } from 'formik';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Input } from '../../commons/form/Input'
import { LoadingCircle } from '../../commons/LoadingCircle';
import { CurrencyInput } from '../../commons/form/CurrencyInput';
import { editRaffleData } from '../../../services/raffle';
import { ImageInput } from './ImageInput';
import Image from 'next/image';

export function RaffleForm({
  handleClose,
  raffleData,
  handleRaffleDataChange,
  isSubmitting,
  ...props
}) {
  const [image, setImage] = React.useState()

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <Box sx={{ height: '100%', overflowY: 'auto'}}>
        {
          !raffleData
          ? <LoadingCircle />
          : <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={(values) => handleRaffleDataChange(values, image)}
            >
              {(props) => (
                <Form noValidate>
                  <Box sx={{ my: 2 }}>
                    <Grid container spacing={4}>
                      <Grid item container xs={12}>
                        <Grid item xs={6}>                            
                          <Box sx={{ position: 'relative', height: '10rem', width: '100%' }}>
                            <Image
                              src={raffleData.image}
                              alt={raffleData.name}
                              layout='fill'
                              objectFit='contain'
                            />
                          </Box>                          
                        </Grid>
                        <Grid item xs={6}>
                          <ImageInput handleImageChange={handleImageChange}/>
                          <Typography>{image ? image.name : 'Selecione uma imagem'}</Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          id="name"
                          name="name"
                          label="Título"
                          type="text"
                          fullWidth
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={4}>
                        <CurrencyInput label='1 cota por' name='ticketPrice' required />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CurrencyInput label='5 cotas por' name='fiveQuotasPrice' />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <CurrencyInput label='10 cotas por' name='tenQuotasPrice' />
                      </Grid>
                    </Grid>
                  </Box>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <LoadingButton loading={isSubmitting} variant='contained' type='submit'>CONTINUAR</LoadingButton>
                  </DialogActions>
                </Form>
              )}
            </Formik>
        }        
    </Box>    
  );
}
