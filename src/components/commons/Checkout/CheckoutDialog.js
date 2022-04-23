import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CheckoutSummary } from './CheckoutSummary';
import { qrCodePix } from './PixData';
import Image from 'next/image'
import LoadingCircle from '../LoadingCircle'
import { QrCode } from './QrCode';

export default function CheckoutDialog({
  open,
  setOpen,
  selectedNumbers,
  raffle,
  ...props
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const totalPrice = selectedNumbers.length * raffle.ticketPrice

  return (
    <div>
      <Dialog open={open} >
        <DialogTitle>Pagamento</DialogTitle>
        <DialogContent>
          <CheckoutSummary selectedNumbers={selectedNumbers} raffle={raffle} total={totalPrice}/>
          <QrCode value={totalPrice} />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>FINALIZAR</Button>
        </DialogActions>
      </Dialog>
    </div>    
  );
}
