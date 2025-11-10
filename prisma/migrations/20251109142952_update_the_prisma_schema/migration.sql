/*
  Warnings:

  - You are about to drop the column `createdById` on the `applications` table. All the data in the column will be lost.
  - You are about to drop the column `reviewerId` on the `applications` table. All the data in the column will be lost.
  - Added the required column `createdByProfileId` to the `applications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_createdById_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_reviewerId_fkey";

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "createdById",
DROP COLUMN "reviewerId",
ADD COLUMN     "createdByProfileId" TEXT NOT NULL,
ADD COLUMN     "reviewedByProfileId" TEXT;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_createdByProfileId_fkey" FOREIGN KEY ("createdByProfileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_reviewedByProfileId_fkey" FOREIGN KEY ("reviewedByProfileId") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
