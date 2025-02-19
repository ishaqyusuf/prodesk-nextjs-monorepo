/*
  Warnings:

  - You are about to drop the column `doorId` on the `OrderItemProductionAssignments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrderItemProductionAssignments` DROP COLUMN `doorId`,
    ADD COLUMN `salesDoorId` INTEGER NULL;
