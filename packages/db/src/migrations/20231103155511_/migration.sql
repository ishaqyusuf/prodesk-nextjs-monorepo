-- AlterTable
ALTER TABLE `hometasks` ADD COLUMN `assignedToId` INTEGER NULL,
    ADD COLUMN `jobId` INTEGER NULL;

-- AlterTable
ALTER TABLE `jobs` ADD COLUMN `homeTaskId` INTEGER NULL;
