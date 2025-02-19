/*
  Warnings:

  - You are about to drop the column `guardName` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `guardName` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `permissions_name_guard_name_unique` ON `permissions`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `guardName`;

-- AlterTable
ALTER TABLE `roles` DROP COLUMN `guardName`;

-- CreateIndex
CREATE UNIQUE INDEX `permissions_name_guard_name_unique` ON `Permissions`(`name`);
