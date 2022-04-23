import { QrCodePix } from 'qrcode-pix';

export const pixData = {
  version: '01',
  key: '12386365948', //or any PIX key
  name: 'Guilherme Felipe Ferreira Hammes',
  city: 'JOINVILLE',
}

export const allPixData = {
  ...pixData,
  bank: 'Nu Pagamentos SA (260)',
  agency: '0001',
  account: '77302-9',
  cpf: '123.863.659-48',
}

export const qrCodePix = (value) => {
  return QrCodePix({
    ...pixData,
    value,
  });
}