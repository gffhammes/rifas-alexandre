import { Container, Typography, Grid, ToggleButton } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { raffles } from '../../assets/raffle'

const Raffle = () => {
  const router = useRouter();
  const { id } = router.query;

  const thisRaffle = raffles.filter(raffle => raffle.id === id)

  const totals = {
    available: 0,
    reserved: 0,
    bought: 0,
  }

  thisRaffle[0]?.raffles.forEach((raffle) => {
    totals[raffle.status]++;
  })

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
              <Grid item xs={2} key={raffle.id}>
                <ToggleButton
                  value="check"
                  //selected={raffle.status === 'available'}
                  disabled={raffle.status !== 'available'}
                  // onChange={() => {
                  //   setSelected(!selected);
                  // }}
                  sx={{ width: '100%', backgroundColor: 'white' }}
                  color="primary"
                >
                  {raffle.id}
                </ToggleButton>
              </Grid>
            )
          })}
        </Grid>        
      </Container>
    </>    
  )
}

export default Raffle