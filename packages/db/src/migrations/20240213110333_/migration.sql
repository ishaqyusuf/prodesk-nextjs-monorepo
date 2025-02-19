-- AlterTable
ALTER TABLE `SalesOrderItems` MODIFY `description` VARCHAR(300) NULL,
    MODIFY `dykeDescription` VARCHAR(300) NULL;

-- CreateIndex
CREATE INDEX `SalesOrderItems_salesOrderId_idx` ON `SalesOrderItems`(`salesOrderId`);

-- CreateIndex
CREATE INDEX `Users_name_idx` ON `Users`(`name`);
