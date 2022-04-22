import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { Input } from './Input';
import { Form, Formik, useFormik } from 'formik';

export default function FormDialog({
  open,
  setOpen,
  raffleId,
  selectedQuotas,
  saveUserAndReserveQuotas,
  isReservingQuotas,
  ...props
}) {

  const handleClose = () => {
    setOpen(false);
  };

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
    <div>
      <Dialog open={open} >
        <DialogTitle>Dados pessoais</DialogTitle>
        <Formik
          initialValues={{ name: '', email: '', phone: '' }}
          validate={validate}
          onSubmit={async (values, actions, e) => {
            await saveUserAndReserveQuotas(values, raffleId, selectedQuotas);
            handleClose();
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit} noValidate>
              <DialogContent>
                <DialogContentText>
                  Para comprar as cotas é necessário informar alguns dados pessoais.
                </DialogContentText>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <LoadingButton loading={isReservingQuotas} variant='contained' type='submit'>Comprar</LoadingButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
