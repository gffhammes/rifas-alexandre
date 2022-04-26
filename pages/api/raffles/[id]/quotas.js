import React from 'react'
import prisma from '../../../../prisma';

const getNumbersToRemove = (numbers, alreadyReservedQuotas) => {
  const alreadyReservedNumbers = [];

  alreadyReservedQuotas.forEach((quota) => alreadyReservedNumbers.push(quota.number))

  numbers = numbers.filter(number => !alreadyReservedNumbers.includes(number));

  return { numbers, alreadyReservedNumbers };
}

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
        const alreadyReservedQuotas = await prisma.quotas.findMany({
          where: {
            AND: [
              { number: { in: body.numbers } },
              { raffleId: body.raffleId },
              { NOT: [{ ownerId: null }] }
            ]
          },
        })

        if (await alreadyReservedQuotas.length === body.numbers.length) {
          return res.status(409).json({ message: 'All quotas have been reserved by another user' })
        }

        const { numbers, alreadyReservedNumbers } = getNumbersToRemove(body.numbers, await alreadyReservedQuotas)

        quotas = await prisma.quotas.updateMany({
          where: {
           AND: [
              { number: { in: numbers } },
              { raffleId: body.raffleId },
            ]
          },
          data: {
            status: 'reserved',
            ownerId: body.ownerId,
          },
        })
        res.json({ quotas, alreadyReservedNumbers, numbers })
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' })
    }
}
