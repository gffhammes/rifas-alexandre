import { Container, Typography, Grid, ToggleButton, Box, Card, CardContent, Stack, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react';
import { IconAndType } from '../../src/components/commons/IconAndType';
import { RaffleButton } from '../../src/components/raffles/RaffleButton';
import Image from 'next/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { currencyBRLMask } from '../../src/helpers/utils';
import { Context } from '../../src/contexts/Context';
import FormDialog from '../../src/components/commons/UserForm/UserForm';

import prisma from '../../prisma.js'

export const getServerSideProps = async (context) => {
  const users = JSON.stringify(await prisma.users.findMany({}));
  const quotas = JSON.parse(JSON.stringify(await prisma.quotas.findMany({})));
  const raffle = JSON.parse(JSON.stringify(await prisma.raffles.findUnique({
    where: {
      id: context.params.id,
    },
  })))
  return { props: { users, quotas, raffle } };
};

async function saveUser(user) {
  console.log(user)
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json;
}

const Raffle = ({ users, quotas, raffle, ...props }) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);
  // const {
  //   saveItem,
  // } = useContext(Context);



  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(current => current.filter(selectedNumber => selectedNumber !== number));
    } else {
      setSelectedNumbers(current => [...current, number]);
    }
  }

  const handleBuy = () => {
    setOpenUserForm(true)
  }

  return (
    <>
      <Head>
        <title>{raffle.name}</title>
      </Head>
      {openUserForm && <FormDialog open={openUserForm} setOpen={setOpenUserForm} saveUser={saveUser} />}
      <Container>
        <Typography variant='h1'>
          {raffle.name}
        </Typography>

        <Box>
          <Card sx={{ height: 345 }}>
            <Stack direction='row' sx={{ height: '100%' }}>
              <Box sx={{ height: '100%', width: 700, position: 'relative' }}>
                <Image
                  src={`/images/${raffle.image}`}
                  layout='fill'
                  objectFit='contain'
                  alt={raffle.name}
                />
              </Box>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5">
                    {raffle.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {raffle.description}
                  </Typography>
                  <Stack spacing={1.5}>          
                    <IconAndType icon={CalendarTodayIcon}>
                      {new Date(raffle.raffleDate).toLocaleString('pt-BR', {  dateStyle: 'short', timeStyle: 'short' })}
                    </IconAndType>
                    <IconAndType icon={PaidOutlinedIcon}>
                      {currencyBRLMask(raffle.ticketPrice)}
                    </IconAndType>
                    <IconAndType icon={CheckBoxOutlinedIcon}>
                      {`${raffle.availableTickets || 0}/${raffle.totalTickets || 0} cotas disponíveis`}
                    </IconAndType>
                  </Stack>
                </Stack>
              </CardContent>
            </Stack>
          </Card>
        </Box>

        <Stack direction='row'>
          <Typography>{`${selectedNumbers.length} cota(s) selecionada(s)`}</Typography>
          <Typography sx={{ marginLeft: 'auto' }}>{`${currencyBRLMask(selectedNumbers.length * raffle.ticketPrice)}`}</Typography>
          <Button variant='contained' onClick={handleBuy} disabled={selectedNumbers.length === 0}>Comprar</Button>
        </Stack>

        <Grid container spacing={1}>
          {quotas.map((quota) => {
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