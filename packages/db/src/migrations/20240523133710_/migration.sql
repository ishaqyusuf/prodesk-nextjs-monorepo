/*
  Warnings:

  - You are about to drop the column `usersId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `usersId` on the `PageView` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Event_usersId_idx` ON `Event`;

-- DropIndex
DROP INDEX `PageView_usersId_idx` ON `PageView`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `usersId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `PageView` DROP COLUMN `usersId`,
    ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Event_userId_idx` ON `Event`(`userId`);

-- CreateIndex
CREATE INDEX `PageView_userId_idx` ON `PageView`(`userId`);
