/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CommunityModels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `HomeTemplates` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `hometemplates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `hometemplates` MODIFY `slug` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CommunityModels_slug_key` ON `CommunityModels`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `HomeTemplates_slug_key` ON `HomeTemplates`(`slug`);
