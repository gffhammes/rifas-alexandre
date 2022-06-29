import React from 'react'
import prisma from '../../../prisma';

export default async function handler(req, res) {
    switch (req.method) {
      case 'POST':
        const userData = JSON.parse(req.body);
        try {
          const savedUser = await prisma.users.create({
            data: userData
          })
          res.json(savedUser)
        } catch (error) {
          if (error.code === 'P2002') {
            const user = await prisma.users.findUnique({
              where: { email: userData.email }
            })
            res.json(user)
          } else {
            res.status(500)
          }
        }
        break;
      case 'GET':
        const transactions = await prisma.transactions.findMany({})
        res.json(transactions)
        break;
      default:
        res.status(405).json({ message: 'Method not allowed' })
    }
}
