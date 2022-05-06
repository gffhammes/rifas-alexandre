import prisma from '../../../../prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const raffle = await prisma.raffles.findUnique({
        where: { id },
        include: {
          quotas: {            
            orderBy: { number: 'asc' },
            include: { owner: true }
          },
        },
      })
      res.json(raffle)
      break;
      
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }

}
