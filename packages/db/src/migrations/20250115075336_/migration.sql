/*
  Warnings:

  - A unique constraint covering the columns `[uid,type]` on the table `QtyControl` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `QtyControl_uid_key` ON `QtyControl`;

-- CreateIndex
CREATE UNIQUE INDEX `QtyControl_uid_type_key` ON `QtyControl`(`uid`, `type`);
