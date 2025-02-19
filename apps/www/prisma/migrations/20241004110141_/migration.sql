/*
  Warnings:

  - The primary key for the `ComponentPrice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `ComponentPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ComponentPrice` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `ComponentPrice_id_key` ON `ComponentPrice`(`id`);
