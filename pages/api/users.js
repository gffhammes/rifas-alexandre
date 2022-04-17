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
    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}