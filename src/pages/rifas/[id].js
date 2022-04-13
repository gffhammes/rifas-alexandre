import { Container, Typography, Grid, ToggleButton } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { raffles } from '../../assets/raffle'
import { RaffleButton } from '../../components/raffles/RaffleButton';

const Raffle = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedNumbers, setSelectedNumbers] = useState([]);

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
    console.log(`start`)
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(current => current.filter(selectedNumber => selectedNumber !== number));
    } else {
      setSelectedNumbers(current => [...current, number]);
    }
    console.log(`finish`)
  }

  // useEffect(() => {
  //   console.log(selectedNumbers)
  // }, [selectedNumbers])

  return (
    <>
      <Head>
        <title>{thisRaffle[0]?.name}</title>
      </Head>
      <Container>
        <Typography variant='h1'>
          {thisRaffle[0]?.name}
        </Typography>

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