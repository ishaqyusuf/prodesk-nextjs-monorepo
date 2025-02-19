-- DropIndex
DROP INDEX `AddressBooks_name_address1_idx` ON `AddressBooks`;

-- DropIndex
DROP INDEX `Customers_name_email_phoneNo_idx` ON `Customers`;

-- DropIndex
DROP INDEX `HomeTasks_homeId_deletedAt_produceable_billable_addon_deco_p_idx` ON `HomeTasks`;

-- DropIndex
DROP INDEX `Homes_modelName_search_idx` ON `Homes`;

-- DropIndex
DROP INDEX `Notifications_userId_seenAt_archivedAt_idx` ON `Notifications`;

-- DropIndex
DROP INDEX `SalesOrderItems_salesOrderId_description_idx` ON `SalesOrderItems`;

-- DropIndex
DROP INDEX `SalesOrders_deletedAt_orderId_grandTotal_prodId_type_prodDue_idx` ON `SalesOrders`;

-- DropIndex
DROP INDEX `Users_name_idx` ON `Users`;

-- AlterTable
ALTER TABLE `AddressBooks` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Notifications` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `AddressBooks_createdAt_deletedAt_name_address1_idx` ON `AddressBooks`(`createdAt`, `deletedAt`, `name`, `address1`);

-- CreateIndex
CREATE INDEX `Customers_createdAt_deletedAt_name_email_phoneNo_idx` ON `Customers`(`createdAt`, `deletedAt`, `name`, `email`, `phoneNo`);

-- CreateIndex
CREATE INDEX `HomeTasks_createdAt_homeId_deletedAt_produceable_billable_ad_idx` ON `HomeTasks`(`createdAt`, `homeId`, `deletedAt`, `produceable`, `billable`, `addon`, `deco`, `punchout`, `installable`, `taskName`, `projectId`, `jobId`);

-- CreateIndex
CREATE INDEX `Homes_createdAt_deletedAt_modelName_search_idx` ON `Homes`(`createdAt`, `deletedAt`, `modelName`, `search`);

-- CreateIndex
CREATE INDEX `Notifications_createdAt_deletedAt_userId_seenAt_archivedAt_idx` ON `Notifications`(`createdAt`, `deletedAt`, `userId`, `seenAt`, `archivedAt`);

-- CreateIndex
CREATE INDEX `SalesOrderItems_createdAt_salesOrderId_description_idx` ON `SalesOrderItems`(`createdAt`, `salesOrderId`, `description`);

-- CreateIndex
CREATE INDEX `SalesOrders_createdAt_deletedAt_orderId_grandTotal_prodId_ty_idx` ON `SalesOrders`(`createdAt`, `deletedAt`, `orderId`, `grandTotal`, `prodId`, `type`, `prodDueDate`);

-- CreateIndex
CREATE INDEX `Users_createdAt_deletedAt_name_idx` ON `Users`(`createdAt`, `deletedAt`, `name`);
