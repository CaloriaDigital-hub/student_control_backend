/*
  Warnings:

  - You are about to drop the column `permissions` on the `admin_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `admin_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `department_head_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `student_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `major` on the `student_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `student_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `teacher_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `teacher_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `teacher_profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `admin_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `department_head_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `student_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `teacher_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `admin_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `department_head_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userRoleId` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `student_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `teacher_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin_profiles" DROP CONSTRAINT "admin_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "department_head_profiles" DROP CONSTRAINT "department_head_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "student_profiles" DROP CONSTRAINT "student_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "teacher_profiles" DROP CONSTRAINT "teacher_profiles_userId_fkey";

-- DropIndex
DROP INDEX "admin_profiles_userId_key";

-- DropIndex
DROP INDEX "applications_createdAt_idx";

-- DropIndex
DROP INDEX "department_head_profiles_userId_key";

-- DropIndex
DROP INDEX "profiles_userId_key";

-- DropIndex
DROP INDEX "student_profiles_userId_key";

-- DropIndex
DROP INDEX "teacher_profiles_userId_key";

-- AlterTable
ALTER TABLE "admin_profiles" DROP COLUMN "permissions",
DROP COLUMN "userId",
ADD COLUMN     "privileges" TEXT[],
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD COLUMN     "scope" TEXT,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL;

-- AlterTable
ALTER TABLE "department_head_profiles" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL,
ADD COLUMN     "subordinates" TEXT[];

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "avatar",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deactivatedAt" TIMESTAMP(3),
ADD COLUMN     "department" TEXT,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "permissions" TEXT[],
ADD COLUMN     "position" TEXT,
ADD COLUMN     "userRoleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_profiles" DROP COLUMN "faculty",
DROP COLUMN "major",
DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher_profiles" DROP COLUMN "department",
DROP COLUMN "position",
DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher_subjects" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "semester" TEXT,
ADD COLUMN     "year" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "admin_profiles_profileId_key" ON "admin_profiles"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "department_head_profiles_profileId_key" ON "department_head_profiles"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_profileId_key" ON "student_profiles"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profiles_profileId_key" ON "teacher_profiles"("profileId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "user_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_profiles" ADD CONSTRAINT "admin_profiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department_head_profiles" ADD CONSTRAINT "department_head_profiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
