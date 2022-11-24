import { QrCodePix } from 'qrcode-pix';

export const pixData = {
  version: '01',
  key: '47948627000132',
  name: 'Alexandre Damasceno Sanches',
  city: 'SÃO PAULO',
}

export const qrCodePix = (value) => {
  return QrCodePix({
    ...pixData,
    value,
  });
}
