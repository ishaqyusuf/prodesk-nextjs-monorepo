-- CreateTable
CREATE TABLE `QtyControl` (
    `uid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `QtyControl_uid_key`(`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
