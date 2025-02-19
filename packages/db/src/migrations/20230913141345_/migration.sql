-- AlterTable
ALTER TABLE `inboundorderitems` ADD COLUMN `location` VARCHAR(255) NULL,
    ADD COLUMN `putAwayBy` INTEGER NULL,
    ADD COLUMN `putawayAt` TIMESTAMP(0) NULL;
