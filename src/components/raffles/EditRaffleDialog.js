import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { RaffleForm } from './RaffleForm/RaffleForm';

export default function EditRaffleDialog({
  open,
  handleClose,
  raffleData,
  ...props
}) {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Editar rifa</DialogTitle>
      <DialogContent sx={{ overflowY: 'hidden', height: '100%' }}>
        <RaffleForm handleClose={handleClose} raffleData={raffleData}/>        
      </DialogContent>
    </Dialog>
  );
}
