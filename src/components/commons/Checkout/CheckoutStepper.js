import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { CheckoutAccountData } from './CheckoutAccountData';
import { QrCode } from './QrCode';
import { Stack } from '@mui/material';
import { UserForm } from '../UserForm/UserForm';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { CheckoutSummary } from './CheckoutSummary';

export function TextMobileStepper({
  selectedNumbers,
  raffle,
  totalPrice,
  handleBuy,
  isReservingQuotas,
  handleClose,
  setIsReservingQuotas,
  setSelectedNumbers
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const { width } = useWindowSize();

  const isMobile = React.useMemo(() => width < 675, [width])

  const steps = [
    {
      title: 'Confirmação',
      element: <CheckoutSummary selectedNumbers={selectedNumbers} raffle={raffle} total={totalPrice}/>,
    },
    {
      title: 'Dados bancários',
      element: 
        <Stack direction='row' sx={{ overflowY: 'hidden', height: '100%', width: '100%' }}>
          <CheckoutAccountData totalPrice={totalPrice} sx={{ overflowY: 'auto', width: isMobile ? '100%' : '40rem' }}/>
          {!isMobile
          &&  <Stack sx={{ width: '100%' }}>
                <Typography variant='caption' sx={{ marginLeft: '2rem' }}>QR code pix</Typography>
                <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
                  <QrCode value={totalPrice} />
                </Box>
              </Stack>}
        </Stack>,
    },
  ]
      

  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <Box sx={{ width: '100%', overflowY: 'hidden', height: '100%' }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{steps[activeStep].title}</Typography>
      </Paper>
      <Box sx={{ height: 255, width: '100%', overflowY: 'hidden' }}>
        {steps[activeStep].element}
      </Box>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            sx={{ width: '6rem' }}
            onClick={activeStep === maxSteps - 1 ? () => {
              setSelectedNumbers([]);
              handleClose();
            } : handleNext}
            variant={activeStep === maxSteps - 1 ? 'contained' : 'text'}
          >
            {activeStep === maxSteps - 1 ? 'Finalizar' : 'Pagamento'}
            {activeStep < maxSteps - 1 && <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" sx={{ width: '6rem' }} onClick={handleBack} disabled={activeStep === 0} >
            <KeyboardArrowLeft />
            Anterior
          </Button>
        }
      />
    </Box>
  );
}
