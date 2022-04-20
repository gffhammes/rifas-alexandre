import { Container, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import prisma from '../prisma'
import { raffles } from '../src/assets/raffle'
import MediaCard from '../src/components/RaffleCard'

export const getServerSideProps = async () => {
  const raffles = JSON.stringify(await prisma.raffles.findMany({}));
  const quotas = JSON.stringify(await prisma.quotas.findMany({}));
  return { props: { raffles, quotas } };
};

export default function Home(props) {

  let raffles = JSON.parse(props.raffles)
  const quotas = JSON.parse(props.quotas)

  const totalQuotas = quotas.reduce(
    (accumulator, quota) => {
      if (quota.raffleId === raffles[0].id) {
        if (quota.status === 'available') {
          return ({
            ...accumulator,
            available: accumulator.available + 1,
          })
        } else {
          return ({
            ...accumulator,
            unavailable: accumulator.unavailable + 1,
          })
        }
      }

      return accumulator;
    },
    {
      available: 0,
      unavailable: 0,
    }
  );

  raffles[0] = { ...raffles[0], totalQuotas }

  console.log(raffles)

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
