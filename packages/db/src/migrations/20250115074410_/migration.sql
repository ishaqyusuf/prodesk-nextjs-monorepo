/*
  Warnings:

  - You are about to drop the column `salesItemControlUid` on the `QtyControl` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `QtyControl` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `QtyControl` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `QtyControl_salesItemControlUid_idx` ON `QtyControl`;

-- AlterTable
ALTER TABLE `QtyControl` DROP COLUMN `salesItemControlUid`,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `QtyControl_uid_key` ON `QtyControl`(`uid`);

-- CreateIndex
CREATE INDEX `QtyControl_uid_idx` ON `QtyControl`(`uid`);
