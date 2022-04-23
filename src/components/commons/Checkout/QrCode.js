import React from 'react'
import { qrCodePix } from './PixData';
import Image from 'next/image'
import LoadingCircle from '../LoadingCircle'

export const QrCode = ({ value }) => {
  const [qrCode, setQrCode] = React.useState()

  async function test() {
    setQrCode(await qrCodePix(value).base64());
  }

  test()

  return qrCode ? <Image src={qrCode} height={200} width={200} alt='qr code pix' /> : <LoadingCircle />
  
}
