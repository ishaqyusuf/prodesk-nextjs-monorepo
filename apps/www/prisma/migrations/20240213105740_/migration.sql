-- CreateIndex
CREATE INDEX `SalesOrders_deletedAt_orderId_grandTotal_prodId_type_idx` ON `SalesOrders`(`deletedAt`, `orderId`, `grandTotal`, `prodId`, `type`);
