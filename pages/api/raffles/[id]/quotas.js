import React from 'react'
import prisma from '../../../../prisma';

export default async function handler(req, res) {
    const { id } = req.query;
    let quotas;
    let body;

    switch (req.method) {
      case 'GET':
        body = req.body;
        quotas = await prisma.quotas.findMany({
          where: {
            raffleId: id,
          },
          orderBy: [
            {
              number: 'asc',
            },
          ],
        })
        res.json(quotas)
        break;
      case 'PUT':
        body = JSON.parse(req.body)
        quotas = await prisma.quotas.updateMany({
          where: {
           AND: [
            { number: { in: body.numbers } },
            { raffleId: body.raffleId },
           ]
          },
          data: {
            status: 'reserved',
            ownerId: body.ownerId,
          },
        })
        res.json(quotas)
        break;
      default:
        res.status(405).json({ message: 'Method not allowed' })
    }
}
