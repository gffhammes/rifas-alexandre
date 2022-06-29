import React from 'react'
import Head from 'next/head'
import { Button, Container, Grid, Stack, Typography } from '@mui/material'
import RaffleCard from './RaffleCard'
import Link from 'next/link'


export const HomePage = ({ raffles }) => {
  return (
    <>
      <Head>
        <title>Rifas</title>
      </Head>
      <Stack spacing={4}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>          
          <Typography variant='h1'>Rifas</Typography>
          <Link href='/admin/raffle/cl268lhte00416gtrevgvtlw4'>
            <a>
              <Button variant='outlined'>Admin</Button>
            </a>
          </Link>
        </Stack>
        <Grid container>
          {raffles.map((raffle, index) => {
            return (
              <Grid item key={index} xs={12}>
                <RaffleCard raffleData={raffle} />
              </Grid>
            )
          })}
        </Grid>
      </Stack>
    </>
  )
}
