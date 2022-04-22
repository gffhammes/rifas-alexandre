import { Container, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import prisma from '../prisma'
import { raffles } from '../src/assets/raffle'
import MediaCard from '../src/components/raffles/RaffleCard'
import { getQuotasStats } from '../src/helpers/getQuotasStats'

export const getServerSideProps = async () => {
  const raffles = JSON.stringify(await prisma.raffles.findMany({}));
  const quotas = JSON.stringify(await prisma.quotas.findMany({}));
  return { props: { raffles, quotas } };
};

export default function Home(props) {

  let raffles = JSON.parse(props.raffles)
  const quotas = JSON.parse(props.quotas)

  raffles = raffles.map((raffle) => {
    raffle = getQuotasStats(quotas, raffle);
    return raffle
  })
  
  return (
    <>
      <Head>
        <title>Rifas</title>
      </Head>
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
    </>
  )
}
