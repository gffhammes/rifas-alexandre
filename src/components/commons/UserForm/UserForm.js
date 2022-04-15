import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input } from './Input';
import { useFormik } from 'formik';

export default function FormDialog({ open, setOpen }) {

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <Dialog open={open} >
        <DialogTitle>Dados pessoais</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para comprar as cotas é necessário informar alguns dados pessoais.
          </DialogContentText>
          <Input
            id="name"
            label="Nome"
            type="text"
            fullWidth
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            fullWidth
            required
          />
          <Input
            id="phone"
            label="Telefone"
            type="number"
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' onClick={handleClose}>Comprar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
