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
          orderBy: {
            number: 'asc',
          },
          include: {
            owner: true,
          },
        })
        res.json(quotas)
        break;
        
      case 'PUT':
        body = JSON.parse(req.body)

        // if (body.clearAll) {
        //   quotas = await prisma.quotas.updateMany({
        //     where: { raffleId: body.raffleId },
        //     data: {
        //       status: 'available',
        //       ownerId: null,
        //     },
        //   })

        //   return res.json({ quotas })
        // }

        if (body.quotasToDelete) {
          quotas = await prisma.quotas.updateMany({
            where: { id: { in: body.quotasToDelete } },
            data: {
              status: 'available',
              ownerId: null,
            },
          })
  
          return res.json({ quotas })
        }

        const alreadyReservedQuotas = await prisma.quotas.findMany({
          where: {
            AND: [
              { number: { in: body.numbers } },
              { raffleId: body.raffleId },
              { NOT: [{ ownerId: null }] }
            ]
          },
        })

        const { numbers, alreadyReservedNumbers } = getNumbersToRemove(body.numbers, await alreadyReservedQuotas)

        if (await alreadyReservedQuotas.length > 0) {
          return res.status(409).json({ numbers, alreadyReservedNumbers, message: 'Some quotas had been reserved by another user.' })
        }

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
        res.json({ quotas, numbers })
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' })
    }
}
