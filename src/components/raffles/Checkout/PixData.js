import { QrCodePix } from 'qrcode-pix';

export const pixData = {
  version: '01',
  key: '+5511974224477',
  name: 'Alexandre Damasceno Sanches',
  city: 'SÃO PAULO',
}

export const qrCodePix = (value) => {
  return QrCodePix({
    ...pixData,
    value,
  });
}