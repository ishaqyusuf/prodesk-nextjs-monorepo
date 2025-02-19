/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `WorkOrders` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `workorders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `workorders` MODIFY `slug` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `WorkOrders_slug_key` ON `WorkOrders`(`slug`);
