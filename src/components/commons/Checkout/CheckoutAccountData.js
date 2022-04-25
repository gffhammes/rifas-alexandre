import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { allPixData, qrCodePix } from './PixData'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { truncate } from '../../../helpers/truncate';


export const CheckoutAccountData = ({ totalPrice, sx }) => {
  const [pixLink, setPixLink] = React.useState();

  const setPix = async () => {
    setPixLink(await qrCodePix(totalPrice).payload())
  }

  setPix()


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
    <Stack spacing={1.5} sx={{ ...sx }}>
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
  )
}
