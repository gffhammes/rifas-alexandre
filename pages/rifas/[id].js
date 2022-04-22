import { useRouter } from 'next/router'
import prisma from '../../prisma.js'
import RafflePage from '../../src/containers/RafflePage';

export const getServerSideProps = async (context) => {
  const quotas = JSON.parse(JSON.stringify(await prisma.quotas.findMany({orderBy: [
    {
      number: 'asc',
    }]})));
  const raffle = JSON.parse(JSON.stringify(await prisma.raffles.findUnique({
    where: {
      id: context.params.id,
    },
  })))
  return { props: {  quotas, raffle } };
};


const Raffle = ({  quotas, raffle, ...props }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <RafflePage raffle={raffle} quotas={quotas}/>    
  )
}

export default Raffle