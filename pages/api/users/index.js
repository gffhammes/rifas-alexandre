import React from 'react'
import prisma from '../../../prisma';

export default async function handler(req, res) {
    switch (req.method) {
      case 'POST':
        const userData = JSON.parse(req.body);
        const savedUser = await prisma.users.create({
          data: userData
        })
        res.json(savedUser)
        break;
      case 'GET':
        const users = await prisma.users.findMany({})
        res.json(users)
        break;
      default:
        res.status(405).json({ message: 'Method not allowed' })
    }
}
