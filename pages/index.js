import { Container, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import prisma from '../prisma'
import { HomePage } from '../src/components/home/HomePage'
import { getQuotasStats } from '../src/helpers/getQuotasStats'
import { getPricesString } from '../src/helpers/raffleHelper'

export const getServerSideProps = async () => {
  const raffles = JSON.stringify(await prisma.raffles.findMany({}));
  const quotas = JSON.stringify(await prisma.quotas.findMany({}));
  return { props: { raffles, quotas } };
};

export default function Home(props) {

  let raffles = JSON.parse(props.raffles)
  const quotas = JSON.parse(props.quotas)

  raffles = raffles.map((raffle) => {
    console.log(raffle)
    raffle = getQuotasStats(quotas, raffle);
    raffle = { ...raffle, prices: getPricesString(raffle.ticketPrice, JSON.parse(raffle.cumulativeDiscount)) }
    return raffle
  })


  return (
    <HomePage raffles={raffles} />
  )
}
