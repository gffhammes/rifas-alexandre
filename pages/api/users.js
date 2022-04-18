import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const user = await prisma.user.create({
        data: JSON.parse(req.body)
      })
      res.json(user);
      break;
    case "GET":
      const users = await prisma.user.findMany({})
      res.json(users);
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}