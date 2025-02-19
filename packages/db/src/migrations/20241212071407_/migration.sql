-- CreateTable
CREATE TABLE `SalesItemControl` (
    `uid` VARCHAR(191) NOT NULL,
    `salesId` INTEGER NOT NULL,
    `produceable` BOOLEAN NULL,
    `shippable` BOOLEAN NULL,

    UNIQUE INDEX `SalesItemControl_uid_key`(`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
