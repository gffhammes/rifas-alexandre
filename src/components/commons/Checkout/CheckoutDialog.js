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

  const [pixLink, setPixLink] = React.useState();

  const setPix = async () => {
    setPixLink(await qrCodePix(totalPrice).payload())
  }

  setPix()

  const totalPrice = selectedNumbers.length * raffle.ticketPrice

  const accountData = [
    {
      label: 'Pix copia e cola',
      data: pixLink,
    },
    {
      label: 'Chave pix',
      data: allPixData.key,
    },
    {
      label: 'Banco',
      data: allPixData.bank,
    },
    {
      label: 'Agência',
      data: allPixData.agency,
    },
    {
      label: 'Conta',
      data: allPixData.account,
    },
    {
      label: 'Nome',
      data: allPixData.name,
    },
    {
      label: 'CPF',
      data: allPixData.cpf,
    },
  ]

  return (
    <div>
      <Dialog open={open} >
        <DialogTitle>Pagamento</DialogTitle>
        <DialogContent>
          <Stack direction={{ xs: 'column', md: 'row'}}>
            <CheckoutSummary selectedNumbers={selectedNumbers} raffle={raffle} total={totalPrice}/>
            <Divider sx={{ my: 2 }} />
            <Typography variant='h6' mb>Dados bancários</Typography>
            <Stack spacing={1.5}>
              {accountData.map((item, index) => {
                return (
                  <Stack key={index}>
                    <Typography variant='caption'>{item.label}</Typography>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Typography variant='overline'>{truncate(item.data, 25)}</Typography>
                      <CopyToClipboard>
                        {({ copy }) => (
                          <IconButton onClick={() => copy(item.data)} size="small">
                            <ContentCopyIcon fontSize="inherit"/>
                          </IconButton>
                        )}
                      </CopyToClipboard>
                    </Stack>
                  </Stack>
                )
              })}
            </Stack>
            <Box height={200} width={200} sx={{ position: 'relative' }}>
              <QrCode value={totalPrice} />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>FINALIZAR</Button>
        </DialogActions>
      </Dialog>
    </div>    
  );
}
