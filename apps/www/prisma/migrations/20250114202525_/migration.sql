-- AlterTable
ALTER TABLE `SalesItemControl` ADD COLUMN `orderItemId` INTEGER NULL,
    ADD COLUMN `sectionTitle` VARCHAR(191) NULL,
    ADD COLUMN `subtitle` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `QtyControl` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NULL DEFAULT 0,
    `lh` INTEGER NULL DEFAULT 0,
    `rh` INTEGER NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `type` VARCHAR(191) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `salesItemControlUid` VARCHAR(191) NULL,

    UNIQUE INDEX `QtyControl_id_key`(`id`),
    INDEX `QtyControl_salesItemControlUid_idx`(`salesItemControlUid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `SalesItemControl_orderItemId_idx` ON `SalesItemControl`(`orderItemId`);
