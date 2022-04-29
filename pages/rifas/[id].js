import { useRouter } from 'next/router'
import { useEffect } from 'react';
import prisma from '../../prisma.js'
import RafflePage from '../../src/containers/RafflePage';
import { getPricesString } from '../../src/helpers/raffleHelper.js';

export const getServerSideProps = async (context) => {
  const raffle = JSON.parse(JSON.stringify(await prisma.raffles.findUnique({
    where: {
      id: context.params.id,
    },
  })))
  return { props: { raffle } };
};


const Raffle = ({  quotas, raffle,  ...props }) => {
  const router = useRouter();
  const { id } = router.query;

  const modifiedRaffle = {
    ...raffle,
    cumulativeDiscount: JSON.parse(raffle.cumulativeDiscount),
  }


  return (
    <RafflePage raffle={modifiedRaffle} />    
  )
}

export default Raffle