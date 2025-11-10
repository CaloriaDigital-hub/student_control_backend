/*
  Warnings:

  - Added the required column `fullName` to the `admin_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `department_head_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `student_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin_profiles" ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "department_head_profiles" ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT;

-- AlterTable
ALTER TABLE "student_profiles" ADD COLUMN     "course" INTEGER NOT NULL,
ADD COLUMN     "enrollmentYear" INTEGER,
ADD COLUMN     "gpa" DOUBLE PRECISION,
ADD COLUMN     "graduationYear" INTEGER,
ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "teacher_profiles" ADD COLUMN     "academicDegree" TEXT,
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "experienceYears" INTEGER;
