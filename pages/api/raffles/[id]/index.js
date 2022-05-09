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
      return res.json(await raffle);
      
    case 'PUT':
      const body = JSON.parse(req.body);
      
      const rafflePut = await prisma.raffles.update({
        where: { id },
        data: {
          image: body.image,
          name: body.name,
          ticketPrice: body.ticketPrice,
          cumulativeDiscount: body.cumulativeDiscount,
        },
      })
      return res.json(await rafflePut);

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }

}
