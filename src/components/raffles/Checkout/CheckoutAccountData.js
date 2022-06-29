import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { CopyToClipboard } from '../../commons/CopyToClipboard/CopyToClipboard';
import { pixData, qrCodePix } from './PixData'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';
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
      data: pixData.key,
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
              {
                item.data && item.data.includes('http')
                ? <Link href={item.data} passHref>
                    <a target='_blank'>
                      <IconButton size="small">
                        <LaunchIcon fontSize="inherit"/>
                      </IconButton>
                    </a>
                  </Link>
                : <CopyToClipboard>
                    {({ copy }) => (
                      <IconButton onClick={() => copy(item.data)} size="small">
                        <ContentCopyIcon fontSize="inherit"/>
                      </IconButton>
                    )}
                  </CopyToClipboard>
              }
              
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}
