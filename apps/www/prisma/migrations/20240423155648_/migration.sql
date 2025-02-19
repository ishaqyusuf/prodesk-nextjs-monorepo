-- DropIndex
DROP INDEX `SalesOrderItems_createdAt_salesOrderId_description_swing_idx` ON `SalesOrderItems`;

-- CreateIndex
CREATE INDEX `SalesOrderItems_createdAt_description_swing_idx` ON `SalesOrderItems`(`createdAt`, `description`, `swing`);

-- CreateIndex
CREATE INDEX `idx_SalesOrderItems_on_salesOrderId` ON `SalesOrderItems`(`salesOrderId`);
