import { useRouter } from 'next/router'
import prisma from '../../prisma.js'
import RafflePage from '../../src/containers/RafflePage';

export const getServerSideProps = async (context) => {
  const users = JSON.stringify(await prisma.users.findMany({}));
  const quotas = JSON.parse(JSON.stringify(await prisma.quotas.findMany({orderBy: [
    {
      number: 'asc',
    }]})));
  const raffle = JSON.parse(JSON.stringify(await prisma.raffles.findUnique({
    where: {
      id: context.params.id,
    },
  })))
  return { props: { users, quotas, raffle } };
};

async function saveUser(user) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

async function reserveQuotas(userId, raffleId, quotas) {
  console.log(userId, raffleId, quotas)

  const myObj = {
    numbers: quotas,
    raffleId: raffleId,
    ownerId: userId,
  }

  const response = await fetch(`/api/raffles/${raffleId}/quotas`, {
    method: 'PUT',
    body: JSON.stringify(myObj),
  });

  console.log(await response.json())

  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }

  // return await response.json;
}

const Raffle = ({ users, quotas, raffle, ...props }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <RafflePage raffle={raffle} quotas={quotas}/>    
  )
}

export default Raffle