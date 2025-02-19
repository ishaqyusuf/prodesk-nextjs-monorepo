/*
  Warnings:

  - You are about to drop the column `status` on the `NotePad` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `NotePad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `NotePad` DROP COLUMN `status`,
    DROP COLUMN `type`;
