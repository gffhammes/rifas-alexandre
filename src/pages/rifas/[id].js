import { Container, Typography, Grid, ToggleButton, Box, Card, CardContent, Stack, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { raffles } from '../../assets/raffle'
import { IconAndType } from '../../components/commons/IconAndType';
import { RaffleButton } from '../../components/raffles/RaffleButton';
import Image from 'next/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { currencyBRLMask } from '../../helpers/utils';
import { Context } from '../../contexts/Context';
import FormDialog from '../../components/commons/UserForm/UserForm';


const Raffle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);
  const {
    saveItem,
  } = useContext(Context);

  const thisRaffle = raffles.filter(raffle => raffle.id === id)

  const totals = {
    available: 0,
    reserved: 0,
    bought: 0,
  }

  thisRaffle[0]?.raffles.forEach((raffle) => {
    totals[raffle.status]++;
  })

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(current => current.filter(selectedNumber => selectedNumber !== number));
    } else {
      setSelectedNumbers(current => [...current, number]);
    }
  }

  const handleBuy = () => {
    saveItem({ id, selectedNumbers });
    setOpenUserForm(true)
  }

  return (
    <>
      <Head>
        <title>{thisRaffle[0]?.name}</title>
      </Head>
      {openUserForm && <FormDialog open={openUserForm} setOpen={setOpenUserForm} />}
      <Container>
        <Typography variant='h1'>
          {thisRaffle[0]?.name}
        </Typography>

        <Box>
          <Card sx={{ height: 345 }}>
            <Stack direction='row' sx={{ height: '100%' }}>
              <Box sx={{ height: '100%', width: 700, position: 'relative' }}>
                <Image
                  src={`/images/${thisRaffle[0]?.image}`}
                  layout='fill'
                  objectFit='contain'
                  alt={thisRaffle[0]?.name}
                />
              </Box>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5">
                    {thisRaffle[0]?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {thisRaffle[0]?.description}
                  </Typography>
                  <Stack spacing={1.5}>          
                    <IconAndType icon={CalendarTodayIcon}>
                      {thisRaffle[0]?.raffleDate.toLocaleString('pt-BR')}
                    </IconAndType>
                    <IconAndType icon={PaidOutlinedIcon}>
                      {currencyBRLMask(thisRaffle[0]?.ticketPrice)}
                    </IconAndType>
                    <IconAndType icon={CheckBoxOutlinedIcon}>
                      {`${thisRaffle[0]?.availableTickets}/${thisRaffle[0]?.totalTickets} cotas disponíveis`}
                    </IconAndType>
                  </Stack>
                </Stack>
              </CardContent>
            </Stack>
          </Card>
        </Box>

        <Stack direction='row'>
          <Typography>{`${selectedNumbers.length} cota(s) selecionada(s)`}</Typography>
          <Typography sx={{ marginLeft: 'auto' }}>{`${currencyBRLMask(selectedNumbers.length * thisRaffle[0]?.ticketPrice)}`}</Typography>
          <Button variant='contained' onClick={handleBuy}>Comprar</Button>
        </Stack>

        <Grid container spacing={1}>
          {thisRaffle[0]?.raffles.map((raffle) => {
            return (
              <Grid item xs={1} key={raffle.id}>
                <RaffleButton
                  raffle={raffle}
                  selected={selectedNumbers ? selectedNumbers.includes(raffle.id) : false}
                  setSelected={() => handleNumberClick(raffle.id)}
                />
              </Grid>
            )
          })}
        </Grid>        
      </Container>
    </>    
  )
}

export default Raffle