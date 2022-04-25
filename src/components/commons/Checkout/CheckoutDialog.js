import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CheckoutSummary } from './CheckoutSummary';
import { allPixData, qrCodePix } from './PixData';
import Image from 'next/image'
import LoadingCircle from '../LoadingCircle'
import { QrCode } from './QrCode';
import { Box, IconButton, Divider, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { truncate } from '../../../helpers/truncate';
import { TextMobileStepper } from './CheckoutStepper';
import { UserForm } from '../UserForm/UserForm';

export default function CheckoutDialog({
  open,
  setOpen,
  selectedNumbers,
  raffle,
  handleBuy,
  isReservingQuotas,
  setIsReservingQuotas,
  setSelectedNumbers,
  totalPrice,
  ...props
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const [isUserForm, setIsUserForm] = React.useState(true);  

  return (
    <div>
      <Dialog open={open} fullWidth>
        <DialogTitle>{isUserForm ? 'Dados pessoais' : 'Finalizar'}</DialogTitle>
        <DialogContent sx={{ overflowY: 'hidden', height: '100%' }}>
          {isUserForm
          ? <UserForm
              handleBuy={handleBuy}
              isReservingQuotas={isReservingQuotas}
              setIsReservingQuotas={setIsReservingQuotas}
              handleClose={handleClose}
              setIsUserForm={setIsUserForm}
            />
          : <TextMobileStepper
              selectedNumbers={selectedNumbers}
              raffle={raffle}
              totalPrice={totalPrice}
              handleBuy={handleBuy}
              isReservingQuotas={isReservingQuotas}
              setIsReservingQuotas={setIsReservingQuotas}
              handleClose={handleClose}
              setSelectedNumbers={setSelectedNumbers}
            />}
          
        </DialogContent>        
      </Dialog>
    </div>    
  );
}
