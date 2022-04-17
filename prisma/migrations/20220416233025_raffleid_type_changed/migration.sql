-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quotas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "raffleId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL
);
INSERT INTO "new_Quotas" ("id", "number", "ownerId", "raffleId", "status") SELECT "id", "number", "ownerId", "raffleId", "status" FROM "Quotas";
DROP TABLE "Quotas";
ALTER TABLE "new_Quotas" RENAME TO "Quotas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
