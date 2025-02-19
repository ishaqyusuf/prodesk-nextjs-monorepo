/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Homes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Homes_slug_key` ON `Homes`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Projects_slug_key` ON `Projects`(`slug`);
