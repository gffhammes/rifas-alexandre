import { QrCodePix } from 'qrcode-pix';

const pixData = {
  version: '01',
  key: '12386365948', //or any PIX key
  name: 'Guilherme Felipe Ferreira Hammes',
  city: 'JOINVILLE',
}

export const qrCodePix = (value) => {
  return QrCodePix({
    ...pixData,
    value,
  });
}