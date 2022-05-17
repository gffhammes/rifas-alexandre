import React from 'react'
import { qrCodePix } from './PixData';
import Image from 'next/image'
import { LoadingCircle } from '../../commons/LoadingCircle'

export const QrCode = ({ value }) => {
  const [qrCode, setQrCode] = React.useState()

  async function setPix() {
    setQrCode(await qrCodePix(value).base64());
  }

  setPix()

  return qrCode ? <Image src={qrCode} layout='fill' alt='qr code pix' objectFit='contain' /> : <LoadingCircle />  
}
