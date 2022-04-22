import { useRouter } from 'next/router'
import { useEffect } from 'react';
import prisma from '../../prisma.js'
import RafflePage from '../../src/containers/RafflePage';

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

  return (
    <RafflePage raffle={raffle} />    
  )
}

export default Raffle