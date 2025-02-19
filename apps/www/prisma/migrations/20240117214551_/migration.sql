/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `DykeCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DykeCategories_title_key` ON `DykeCategories`(`title`);
