import React from 'react'
import prisma from '../../../../prisma';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
      case 'GET':
        const raffleData = await prisma.raffles.findUnique({
          where: { id: id }
        })
        res.json(raffleData)
        break;
        
      case 'PUT':
        // quotas = await prisma.quotas.update({
        //   where: {
        //    AND: [
        //       { number: { in: numbers } },
        //       { raffleId: body.raffleId },
        //     ]
        //   },
        //   data: {
        //     status: 'reserved',
        //     ownerId: body.ownerId,
        //   },
        // })
        // res.json({ quotas, numbers })
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' })
    }
}
