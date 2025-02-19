/*
  Warnings:

  - You are about to drop the column `extraInstallCost` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `extraInstallCostReason` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `extraInstallReason` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installApprovedAt` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installCost` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installNote` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installStatus` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installStatusDate` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installationStatus` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installedAt` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `installersName` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payableInstallerCost` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payableInstallerExtraCost` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payableInstallerTotalCost` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payrollApprovedById` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payrollApprovedByName` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payrollCheckDate` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `payrollCheckNo` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `totalInstallCost` on the `hometasks` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `salesorders` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `salesorders` table. All the data in the column will be lost.
  - You are about to drop the `joomagproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordertemplateitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordertemplates` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `hometasks` DROP COLUMN `extraInstallCost`,
    DROP COLUMN `extraInstallCostReason`,
    DROP COLUMN `extraInstallReason`,
    DROP COLUMN `installApprovedAt`,
    DROP COLUMN `installCost`,
    DROP COLUMN `installNote`,
    DROP COLUMN `installStatus`,
    DROP COLUMN `installStatusDate`,
    DROP COLUMN `installationStatus`,
    DROP COLUMN `installedAt`,
    DROP COLUMN `installersName`,
    DROP COLUMN `payableInstallerCost`,
    DROP COLUMN `payableInstallerExtraCost`,
    DROP COLUMN `payableInstallerTotalCost`,
    DROP COLUMN `payrollApprovedById`,
    DROP COLUMN `payrollApprovedByName`,
    DROP COLUMN `payrollCheckDate`,
    DROP COLUMN `payrollCheckNo`,
    DROP COLUMN `totalInstallCost`;

-- AlterTable
ALTER TABLE `salesorders` DROP COLUMN `discount`,
    DROP COLUMN `discountPercentage`,
    ADD COLUMN `deliveredAt` DATETIME(3) NULL,
    ADD COLUMN `deliveryOption` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `joomagproduct`;

-- DropTable
DROP TABLE `orders`;

-- DropTable
DROP TABLE `ordertemplateitems`;

-- DropTable
DROP TABLE `ordertemplates`;
