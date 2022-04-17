import { quotas } from './quotas.js';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  for (let quota of quotas) {
    await prisma.quotas.create({
      data: quota
    })
  }
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
})