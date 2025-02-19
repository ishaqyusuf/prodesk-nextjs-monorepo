/*
  Warnings:

  - You are about to alter the column `meta` on the `InventoryProducts` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Json`.
  - You are about to drop the `addressbooks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `communitymodelcost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `communitymodels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `costcharts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customertypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `homes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hometasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inbox` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobpayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modelhaspermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modelhasroles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderproductionsubmissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `passwordresets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesorderitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesorders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salespayments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salespickup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workorders` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `CommissionPayment` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `InventoryProducts` MODIFY `meta` JSON NULL;

-- DropTable
DROP TABLE `addressbooks`;

-- DropTable
DROP TABLE `communitymodelcost`;

-- DropTable
DROP TABLE `communitymodels`;

-- DropTable
DROP TABLE `costcharts`;

-- DropTable
DROP TABLE `customers`;

-- DropTable
DROP TABLE `customertypes`;

-- DropTable
DROP TABLE `homes`;

-- DropTable
DROP TABLE `hometasks`;

-- DropTable
DROP TABLE `inbox`;

-- DropTable
DROP TABLE `jobpayments`;

-- DropTable
DROP TABLE `jobs`;

-- DropTable
DROP TABLE `modelhaspermissions`;

-- DropTable
DROP TABLE `modelhasroles`;

-- DropTable
DROP TABLE `notifications`;

-- DropTable
DROP TABLE `orderproductionsubmissions`;

-- DropTable
DROP TABLE `passwordresets`;

-- DropTable
DROP TABLE `permissions`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `salesorderitems`;

-- DropTable
DROP TABLE `salesorders`;

-- DropTable
DROP TABLE `salespayments`;

-- DropTable
DROP TABLE `salespickup`;

-- DropTable
DROP TABLE `users`;

-- DropTable
DROP TABLE `workorders`;

-- CreateTable
CREATE TABLE `AddressBooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NULL,
    `name` VARCHAR(255) NULL,
    `address1` TEXT NULL,
    `address2` TEXT NULL,
    `country` VARCHAR(255) NULL,
    `state` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phoneNo` VARCHAR(255) NULL,
    `phoneNo2` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `AddressBooks_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CostCharts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NULL,
    `current` BOOLEAN NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `startDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `endDate` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CostCharts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityModels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `pivotId` INTEGER NULL,
    `modelName` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CommunityModels_id_key`(`id`),
    UNIQUE INDEX `CommunityModels_slug_key`(`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityModelCost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `communityModelId` INTEGER NULL,
    `pivotId` INTEGER NULL,
    `current` BOOLEAN NULL,
    `title` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `startDate` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `endDate` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CommunityModelCost_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `addressId` INTEGER NULL,
    `customerTypeId` INTEGER NULL,
    `walletId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `businessName` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phoneNo` VARCHAR(255) NULL,
    `phoneNo2` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Customers_id_key`(`id`),
    UNIQUE INDEX `Customers_walletId_key`(`walletId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `coefficient` DOUBLE NULL,
    `defaultProfile` BOOLEAN NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CustomerTypes_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Homes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archived` BOOLEAN NULL,
    `projectId` INTEGER NOT NULL,
    `builderId` INTEGER NULL,
    `homeTemplateId` INTEGER NULL,
    `communityTemplateId` INTEGER NULL,
    `homeKey` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `modelName` VARCHAR(255) NULL,
    `modelNo` VARCHAR(255) NULL,
    `lotBlock` VARCHAR(255) NULL,
    `lot` VARCHAR(255) NULL,
    `block` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `installedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `search` VARCHAR(255) NULL,
    `punchoutAt` TIMESTAMP(0) NULL,
    `installCost` DOUBLE NULL,
    `punchoutCost` DOUBLE NULL,

    UNIQUE INDEX `Homes_id_key`(`id`),
    UNIQUE INDEX `Homes_slug_key`(`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeTasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archived` BOOLEAN NULL,
    `homeId` INTEGER NULL,
    `type` VARCHAR(255) NULL,
    `taskName` VARCHAR(255) NULL,
    `taskUid` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `producerName` VARCHAR(255) NULL,
    `search` VARCHAR(255) NULL,
    `productionStatus` VARCHAR(255) NULL,
    `checkNo` VARCHAR(255) NULL,
    `projectId` INTEGER NULL,
    `assignedToId` INTEGER NULL,
    `billable` BOOLEAN NULL,
    `produceable` BOOLEAN NULL,
    `installable` BOOLEAN NULL,
    `punchout` BOOLEAN NULL,
    `deco` BOOLEAN NULL,
    `addon` BOOLEAN NULL,
    `taxCost` DOUBLE NULL,
    `amountDue` DOUBLE NULL,
    `amountPaid` DOUBLE NULL,
    `completedAt` DATETIME(3) NULL,
    `jobId` INTEGER NULL,
    `checkDate` TIMESTAMP(0) NULL,
    `statusDate` TIMESTAMP(0) NULL,
    `sentToProductionAt` TIMESTAMP(0) NULL,
    `producedAt` TIMESTAMP(0) NULL,
    `prodStartedAt` TIMESTAMP(0) NULL,
    `productionStatusDate` TIMESTAMP(0) NULL,
    `productionDueDate` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `HomeTasks_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inbox` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NULL,
    `senderId` INTEGER NOT NULL,
    `parentId` INTEGER NULL,
    `subject` TEXT NULL,
    `from` TEXT NOT NULL,
    `to` TEXT NOT NULL,
    `type` TEXT NOT NULL,
    `body` TEXT NOT NULL,
    `meta` JSON NULL,
    `sentAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Inbox_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelHasPermissions` (
    `permissionId` INTEGER NOT NULL,
    `modelType` VARCHAR(255) NOT NULL,
    `modelId` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`permissionId`, `modelId`, `modelType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelHasRoles` (
    `roleId` INTEGER NOT NULL,
    `modelType` VARCHAR(255) NOT NULL,
    `modelId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `modelId`, `modelType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProductionSubmissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderId` INTEGER NULL,
    `salesOrderItemId` INTEGER NULL,
    `qty` INTEGER NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `meta` JSON NULL,

    UNIQUE INDEX `OrderProductionSubmissions_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `usedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `PasswordResets_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Permissions_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Roles_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NULL,
    `productId` INTEGER NULL,
    `supplier` VARCHAR(191) NULL,
    `swing` VARCHAR(255) NULL,
    `price` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `taxPercenatage` DOUBLE NULL,
    `discount` DOUBLE NULL,
    `discountPercentage` DOUBLE NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `qty` DOUBLE NULL,
    `prebuiltQty` DOUBLE NULL,
    `truckLoadQty` DOUBLE NULL,
    `salesOrderId` INTEGER NOT NULL,
    `profitMargin` DOUBLE NULL,
    `rate` DOUBLE NULL,
    `total` DOUBLE NULL,
    `salesPercentage` DOUBLE NULL,
    `prodStatus` VARCHAR(255) NULL,
    `prodStartedAt` TIMESTAMP(0) NULL,
    `sentToProdAt` TIMESTAMP(0) NULL,
    `prodCompletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesOrderItems_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `customerId` INTEGER NULL,
    `billingAddressId` INTEGER NULL,
    `shippingAddressId` INTEGER NULL,
    `salesRepId` INTEGER NOT NULL,
    `pickupId` INTEGER NULL,
    `prodId` INTEGER NULL,
    `summary` TEXT NULL,
    `instruction` TEXT NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NOT NULL,
    `inventoryStatus` VARCHAR(255) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `orderId` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NULL,
    `goodUntil` DATETIME(3) NULL,
    `paymentTerm` VARCHAR(191) NULL,
    `prodQty` DOUBLE NULL,
    `builtQty` DOUBLE NULL,
    `subTotal` DOUBLE NULL,
    `profitMargin` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `taxPercentage` DOUBLE NULL,
    `grandTotal` DOUBLE NULL,
    `amountDue` DOUBLE NULL,
    `invoiceStatus` VARCHAR(255) NULL,
    `prodStatus` VARCHAR(255) NULL,
    `prodDueDate` TIMESTAMP(0) NULL,
    `deliveredAt` DATETIME(3) NULL,
    `deliveryOption` VARCHAR(191) NULL,

    UNIQUE INDEX `SalesOrders_id_key`(`id`),
    UNIQUE INDEX `SalesOrders_orderId_key`(`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesPickup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pickupBy` VARCHAR(191) NULL,
    `pickupApprovedBy` INTEGER NOT NULL,
    `meta` JSON NULL,
    `pickupAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesPickup_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesPayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `transactionId` INTEGER NULL,
    `orderId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesPayments_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `coWorkerId` INTEGER NULL,
    `type` VARCHAR(255) NOT NULL,
    `homeId` INTEGER NULL,
    `projectId` INTEGER NULL,
    `amount` DOUBLE NOT NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `description` LONGTEXT NULL,
    `note` TEXT NULL,
    `status` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `adminNote` TEXT NULL,
    `statusDate` TIMESTAMP(0) NULL,
    `rejectedAt` TIMESTAMP(0) NULL,
    `approvedAt` TIMESTAMP(0) NULL,
    `approvedBy` INTEGER NULL,
    `paymentId` INTEGER NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Jobs_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobPayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `charges` INTEGER NULL,
    `subTotal` INTEGER NULL,
    `userId` INTEGER NOT NULL,
    `paidBy` INTEGER NOT NULL,
    `checkNo` VARCHAR(191) NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `JobPayments_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNo` VARCHAR(255) NULL,
    `phoneCode` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `emailVerifiedAt` TIMESTAMP(0) NULL,
    `password` VARCHAR(255) NULL,
    `rememberToken` VARCHAR(100) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `employeeProfileId` INTEGER NULL,

    UNIQUE INDEX `Users_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `techId` INTEGER NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `lot` VARCHAR(255) NULL,
    `block` VARCHAR(255) NULL,
    `projectName` VARCHAR(255) NULL,
    `builderName` VARCHAR(255) NULL,
    `requestDate` DATETIME(3) NULL,
    `supervisor` VARCHAR(255) NULL,
    `scheduleDate` TIMESTAMP(0) NULL,
    `scheduleTime` VARCHAR(255) NULL,
    `homeAddress` VARCHAR(255) NULL,
    `homeOwner` VARCHAR(255) NULL,
    `homePhone` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NULL,
    `assignedAt` TIMESTAMP(0) NULL,
    `completedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `WorkOrders_id_key`(`id`),
    UNIQUE INDEX `WorkOrders_slug_key`(`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meta` JSON NULL,
    `type` VARCHAR(191) NOT NULL,
    `fromUserId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `link` TEXT NULL,
    `seenAt` TIMESTAMP(0) NULL,
    `archivedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Notifications_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
