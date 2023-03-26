/*
  Warnings:

  - The values [NOT_STARTD] on the enum `TASK_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TASK_STATUS_new" AS ENUM ('NOT_STARTED', 'STARTED', 'COMPLETED', 'INPROGRESS');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TASK_STATUS_new" USING ("status"::text::"TASK_STATUS_new");
ALTER TYPE "TASK_STATUS" RENAME TO "TASK_STATUS_old";
ALTER TYPE "TASK_STATUS_new" RENAME TO "TASK_STATUS";
DROP TYPE "TASK_STATUS_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
