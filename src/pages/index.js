import { Container, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { raffles } from '../assets/raffle'
import MediaCard from '../components/RaffleCard'

export default function Home() {
  return (
    <Container>
      <Typography variant='h1'>Rifas</Typography>
      {raffles.map((raffle, index) => {
        return (
          <MediaCard
            key={index}
            title={raffle.name}
            description={raffle.description}
            raffleDate={raffle.raffleDate}
            ticketPrice={raffle.ticketPrice}
          />
        )        
      })}
    </Container>
  )
}
