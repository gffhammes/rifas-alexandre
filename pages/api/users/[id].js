import React from 'react'
import prisma from '../../../prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const user = await prisma.users.findMany({
        where: { id }
      })
      res.json(user)
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}
