-- CreateIndex
CREATE INDEX `OrderDelivery_salesOrderId_idx` ON `OrderDelivery`(`salesOrderId`);

-- CreateIndex
CREATE INDEX `OrderDelivery_driverId_idx` ON `OrderDelivery`(`driverId`);

-- CreateIndex
CREATE INDEX `OrderDelivery_createdById_idx` ON `OrderDelivery`(`createdById`);

-- CreateIndex
CREATE INDEX `OrderDelivery_orderDeliveryProgressId_idx` ON `OrderDelivery`(`orderDeliveryProgressId`);
