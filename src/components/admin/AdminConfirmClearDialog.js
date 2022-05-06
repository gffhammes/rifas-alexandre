import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function AlertDialog({ openAlert, handleClose, handleClearQuotas, selectedNumbers }) {
  return (
      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Atenção
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              selectedNumbers.length > 0
              ? `Você está prestes a limpar as cotas ${selectedNumbers.join(', ')} desta rifa.`
              : 'Você está prestes a limpar todas as cotas desta rifa.'
            }
            <br/><br/>
            Deseja continuar?            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClearQuotas} autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
  );
}
