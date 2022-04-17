/*
  Warnings:

  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "Raffle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prize" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ticketPrice" REAL NOT NULL,
    "raffleDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Quotas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "raffleId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "phone") SELECT "email", "id", "name", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
