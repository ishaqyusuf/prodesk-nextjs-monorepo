/*
  Warnings:

  - You are about to drop the column `tagNameId` on the `GalleryTag` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `GalleryTagName` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `GalleryTagName` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `GalleryTag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `GalleryTagName` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `GalleryTag_tagNameId_idx` ON `GalleryTag`;

-- DropIndex
DROP INDEX `GalleryTagName_tag_key` ON `GalleryTagName`;

-- AlterTable
ALTER TABLE `GalleryTag` DROP COLUMN `tagNameId`,
    ADD COLUMN `tagId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `GalleryTagName` DROP COLUMN `tag`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `GalleryTag_tagId_idx` ON `GalleryTag`(`tagId`);

-- CreateIndex
CREATE UNIQUE INDEX `GalleryTagName_title_key` ON `GalleryTagName`(`title`);
