/*
  Warnings:

  - You are about to drop the column `fullName` on the `admin_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `privileges` on the `admin_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `department_head_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `subordinates` on the `department_head_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `faculty` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `permissions` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `security_logs` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `security_logs` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `teacher_profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userRoleId]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,subjectId,semester,year]` on the table `teacher_subjects` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `applications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `endDate` on table `contracts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `expiresAt` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "security_logs_email_idx";

-- DropIndex
DROP INDEX "teacher_subjects_teacherId_subjectId_key";

-- AlterTable
ALTER TABLE "admin_profiles" DROP COLUMN "fullName",
DROP COLUMN "privileges",
ADD COLUMN     "permissions" TEXT[];

-- AlterTable
ALTER TABLE "applications" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "department_head_profiles" DROP COLUMN "fullName",
DROP COLUMN "subordinates";

-- AlterTable
ALTER TABLE "grades" ADD COLUMN     "gradeType" TEXT,
ADD COLUMN     "maxScore" DOUBLE PRECISION NOT NULL DEFAULT 100;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "age",
DROP COLUMN "department",
DROP COLUMN "faculty",
DROP COLUMN "isActive",
DROP COLUMN "permissions",
DROP COLUMN "position";

-- AlterTable
ALTER TABLE "security_logs" DROP COLUMN "email",
DROP COLUMN "login";

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "department" TEXT,
ADD COLUMN     "faculty" TEXT,
ALTER COLUMN "gpa" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "credits" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "teacher_profiles" DROP COLUMN "subjects",
ADD COLUMN     "academicTitle" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;

-- DropEnum
DROP TYPE "ApplicationType";

-- CreateIndex
CREATE INDEX "applications_createdAt_idx" ON "applications"("createdAt");

-- CreateIndex
CREATE INDEX "attendances_studentId_idx" ON "attendances"("studentId");

-- CreateIndex
CREATE INDEX "attendances_subjectId_idx" ON "attendances"("subjectId");

-- CreateIndex
CREATE INDEX "attendances_date_idx" ON "attendances"("date");

-- CreateIndex
CREATE INDEX "attendances_status_idx" ON "attendances"("status");

-- CreateIndex
CREATE INDEX "contract_debts_contractId_idx" ON "contract_debts"("contractId");

-- CreateIndex
CREATE INDEX "contract_debts_paid_idx" ON "contract_debts"("paid");

-- CreateIndex
CREATE INDEX "contract_debts_dueDate_idx" ON "contract_debts"("dueDate");

-- CreateIndex
CREATE INDEX "contracts_studentId_idx" ON "contracts"("studentId");

-- CreateIndex
CREATE INDEX "contracts_contractNumber_idx" ON "contracts"("contractNumber");

-- CreateIndex
CREATE INDEX "contracts_isActive_idx" ON "contracts"("isActive");

-- CreateIndex
CREATE INDEX "department_head_profiles_department_idx" ON "department_head_profiles"("department");

-- CreateIndex
CREATE INDEX "department_head_profiles_faculty_idx" ON "department_head_profiles"("faculty");

-- CreateIndex
CREATE INDEX "grades_studentId_idx" ON "grades"("studentId");

-- CreateIndex
CREATE INDEX "grades_subjectId_idx" ON "grades"("subjectId");

-- CreateIndex
CREATE INDEX "grades_teacherId_idx" ON "grades"("teacherId");

-- CreateIndex
CREATE INDEX "grades_dateGiven_idx" ON "grades"("dateGiven");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userRoleId_key" ON "profiles"("userRoleId");

-- CreateIndex
CREATE INDEX "profiles_lastName_firstName_idx" ON "profiles"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "schedules_group_idx" ON "schedules"("group");

-- CreateIndex
CREATE INDEX "schedules_teacherId_idx" ON "schedules"("teacherId");

-- CreateIndex
CREATE INDEX "schedules_subjectId_idx" ON "schedules"("subjectId");

-- CreateIndex
CREATE INDEX "schedules_dayOfWeek_idx" ON "schedules"("dayOfWeek");

-- CreateIndex
CREATE INDEX "security_logs_event_idx" ON "security_logs"("event");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_refreshToken_idx" ON "sessions"("refreshToken");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "student_profiles_group_idx" ON "student_profiles"("group");

-- CreateIndex
CREATE INDEX "student_profiles_course_idx" ON "student_profiles"("course");

-- CreateIndex
CREATE INDEX "student_profiles_faculty_idx" ON "student_profiles"("faculty");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_code_key" ON "subjects"("code");

-- CreateIndex
CREATE INDEX "subjects_code_idx" ON "subjects"("code");

-- CreateIndex
CREATE INDEX "teacher_profiles_department_idx" ON "teacher_profiles"("department");

-- CreateIndex
CREATE INDEX "teacher_profiles_faculty_idx" ON "teacher_profiles"("faculty");

-- CreateIndex
CREATE INDEX "teacher_subjects_teacherId_idx" ON "teacher_subjects"("teacherId");

-- CreateIndex
CREATE INDEX "teacher_subjects_subjectId_idx" ON "teacher_subjects"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_subjects_teacherId_subjectId_semester_year_key" ON "teacher_subjects"("teacherId", "subjectId", "semester", "year");

-- CreateIndex
CREATE INDEX "user_roles_userId_idx" ON "user_roles"("userId");

-- CreateIndex
CREATE INDEX "user_roles_role_idx" ON "user_roles"("role");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_login_idx" ON "users"("login");

-- AddForeignKey
ALTER TABLE "security_logs" ADD CONSTRAINT "security_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
