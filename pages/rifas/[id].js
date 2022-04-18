import { Container, Typography, Grid, ToggleButton, Box, Card, CardContent, Stack, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { raffles } from '../../src/assets/raffle'
import { IconAndType } from '../../src/components/commons/IconAndType';
import { RaffleButton } from '../../src/components/raffles/RaffleButton';
import Image from 'next/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { currencyBRLMask } from '../../src/helpers/utils';
import { Context } from '../../src/contexts/Context';
import FormDialog from '../../src/components/commons/UserForm/UserForm';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  const quotas = await prisma.quotas.findMany();
  return {
    props: {
      initialUsers: users,
      initialQuotas: quotas,
    }
  }
}

async function saveUser(user) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((res) => console.log(res)).catch((err) => {throw new Error(err)})

  return await response.json()
}

const Raffle = (props) => {
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

  console.log(props.initialUsers)

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
      {openUserForm && <FormDialog open={openUserForm} setOpen={setOpenUserForm} saveUser={saveUser} />}
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
          <Button variant='contained' onClick={handleBuy} disabled={selectedNumbers.length === 0}>Comprar</Button>
        </Stack>

        <Grid container spacing={1}>
          {props.initialQuotas.map((quota) => {
            return (
              <Grid item xs={3} sm={2} md={1} key={quota.id}>
                <RaffleButton
                  quota={quota}
                  selected={selectedNumbers ? selectedNumbers.includes(quota.number) : false}
                  setSelected={() => handleNumberClick(quota.number)}
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