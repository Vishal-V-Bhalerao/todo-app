/*
  Warnings:

  - The values [INPROGRESS] on the enum `TASK_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TASK_STATUS_new" AS ENUM ('NOT_STARTED', 'STARTED', 'COMPLETED');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TASK_STATUS_new" USING ("status"::text::"TASK_STATUS_new");
ALTER TYPE "TASK_STATUS" RENAME TO "TASK_STATUS_old";
ALTER TYPE "TASK_STATUS_new" RENAME TO "TASK_STATUS";
DROP TYPE "TASK_STATUS_old";
COMMIT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
