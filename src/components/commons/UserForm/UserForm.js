import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { Input } from './Input';
import { Form, Formik, useFormik } from 'formik';
import { Box, Typography } from '@mui/material';

export function UserForm({
  handleBuy,
  isReservingQuotas,
  setIsReservingQuotas,
  handleClose,
  setIsUserForm,
  ...props
}) {
  // const handleClose = () => {
  //   setIsReservingQuotas(false);
  // };

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

  return (
    <Box sx={{ height: '100%', overflowY: 'auto'}}>
        <Formik
          initialValues={{ name: '', email: '', phone: '' }}
          validate={validate}
          onSubmit={async (values) => {
            await handleBuy(values)
            setIsUserForm(false)
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} noValidate>
              <Input
                id="name"
                name="name"
                label="Nome"
                type="text"
                fullWidth
                required
                margin='normal'
              />
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                required
                margin='normal'
              />
              <Input
                id="phone"
                name="phone"
                label="Telefone"
                type="number"
                fullWidth
                required
                margin='normal'
              />

              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <LoadingButton loading={isReservingQuotas} variant='contained' type='submit'>CONTINUAR</LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
    </Box>    
  );
}
