-- AlterTable
ALTER TABLE `HousePackageTools` ADD COLUMN `linkUid` VARCHAR(191) NULL,
    ADD COLUMN `linked` BOOLEAN NOT NULL DEFAULT false;
