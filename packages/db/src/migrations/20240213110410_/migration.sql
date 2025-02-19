-- DropIndex
DROP INDEX `SalesOrderItems_salesOrderId_idx` ON `SalesOrderItems`;

-- CreateIndex
CREATE INDEX `SalesOrderItems_salesOrderId_description_idx` ON `SalesOrderItems`(`salesOrderId`, `description`);
