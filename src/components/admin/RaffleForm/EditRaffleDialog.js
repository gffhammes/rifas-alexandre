import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { RaffleForm } from './RaffleForm';

export default function EditRaffleDialog({
  open,
  handleClose,
  raffleData,
  handleRaffleDataChange,
  isSubmitting,
  ...props
}) {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>Editar rifa</DialogTitle>
      <DialogContent sx={{ overflowY: 'auto', height: '100%' }}>
        <RaffleForm isSubmitting={isSubmitting} handleClose={handleClose} raffleData={raffleData} handleRaffleDataChange={handleRaffleDataChange}/>        
      </DialogContent>
    </Dialog>
  );
}
