import { Container, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { raffles } from '../src/assets/raffle'
import MediaCard from '../src/components/RaffleCard'

export default function Home() {
  return (
    <Container>
      <Typography variant='h1'>Rifas</Typography>
      {raffles.map((raffle, index) => {
        return (
          <MediaCard
            key={index}
            raffleData={raffle}
          />
        )        
      })}
    </Container>
  )
}
