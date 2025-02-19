-- DropIndex
DROP INDEX `SalesOrderItems_createdAt_salesOrderId_description_idx` ON `SalesOrderItems`;

-- CreateIndex
CREATE INDEX `SalesOrderItems_createdAt_salesOrderId_description_swing_idx` ON `SalesOrderItems`(`createdAt`, `salesOrderId`, `description`, `swing`);
