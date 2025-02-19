/*
  Warnings:

  - Added the required column `type` to the `QtyControl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QtyControl` ADD COLUMN `autoComplete` BOOLEAN NULL,
    ADD COLUMN `deletedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `itemControlUid` VARCHAR(191) NULL,
    ADD COLUMN `lh` INTEGER NULL DEFAULT 0,
    ADD COLUMN `percentage` DOUBLE NULL,
    ADD COLUMN `qty` INTEGER NULL DEFAULT 0,
    ADD COLUMN `rh` INTEGER NULL DEFAULT 0,
    ADD COLUMN `total` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `QtyControl_uid_idx` ON `QtyControl`(`uid`);

-- CreateIndex
CREATE INDEX `QtyControl_itemControlUid_idx` ON `QtyControl`(`itemControlUid`);
