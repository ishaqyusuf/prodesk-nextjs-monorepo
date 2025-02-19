/*
  Warnings:

  - You are about to drop the `qtycontrol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `qtycontrol`;

-- CreateTable
CREATE TABLE `QtyControl` (
    `qty` INTEGER NULL DEFAULT 0,
    `lh` INTEGER NULL DEFAULT 0,
    `rh` INTEGER NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL,
    `percentage` DOUBLE NULL,
    `autoComplete` BOOLEAN NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `itemControlUid` VARCHAR(191) NOT NULL,

    INDEX `QtyControl_itemControlUid_idx`(`itemControlUid`),
    UNIQUE INDEX `QtyControl_itemControlUid_type_key`(`itemControlUid`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
