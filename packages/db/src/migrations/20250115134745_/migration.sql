/*
  Warnings:

  - A unique constraint covering the columns `[salesId,type]` on the table `SalesStat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `SalesStat_salesId_type_key` ON `SalesStat`(`salesId`, `type`);
