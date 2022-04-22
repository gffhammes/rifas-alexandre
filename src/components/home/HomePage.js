import React from 'react'
import Head from 'next/head'
import { Container, Grid, Typography } from '@mui/material'
import RaffleCard from '../raffles/RaffleCard'


export const HomePage = ({ raffles }) => {
  return (
    <>
      <Head>
        <title>Rifas</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant='h1'>Rifas</Typography>
        <Grid container>
          {raffles.map((raffle, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} xl={4}>
                <RaffleCard raffleData={raffle} />
              </Grid>
            )        
          })}
        </Grid>        
      </Container>
    </>
  )
}
