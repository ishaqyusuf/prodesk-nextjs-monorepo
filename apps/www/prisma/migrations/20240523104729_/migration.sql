-- CreateIndex
CREATE INDEX `AddressBooks_customerId_idx` ON `AddressBooks`(`customerId`);

-- CreateIndex
CREATE INDEX `Blogs_authorId_idx` ON `Blogs`(`authorId`);

-- CreateIndex
CREATE INDEX `CommissionPayment_userId_idx` ON `CommissionPayment`(`userId`);

-- CreateIndex
CREATE INDEX `CommissionPayment_paidBy_idx` ON `CommissionPayment`(`paidBy`);

-- CreateIndex
CREATE INDEX `CommissionPayment_usersId_idx` ON `CommissionPayment`(`usersId`);

-- CreateIndex
CREATE INDEX `CommunityModelCost_communityModelId_idx` ON `CommunityModelCost`(`communityModelId`);

-- CreateIndex
CREATE INDEX `CommunityModelCost_pivotId_idx` ON `CommunityModelCost`(`pivotId`);

-- CreateIndex
CREATE INDEX `CommunityModels_pivotId_idx` ON `CommunityModels`(`pivotId`);

-- CreateIndex
CREATE INDEX `CommunityModels_projectId_idx` ON `CommunityModels`(`projectId`);

-- CreateIndex
CREATE INDEX `CommunityTemplateHistory_userId_idx` ON `CommunityTemplateHistory`(`userId`);

-- CreateIndex
CREATE INDEX `CommunityTemplateHistory_communityModelsId_idx` ON `CommunityTemplateHistory`(`communityModelsId`);

-- CreateIndex
CREATE INDEX `CostCharts_parentId_idx` ON `CostCharts`(`parentId`);

-- CreateIndex
CREATE INDEX `CustomerTransaction_walletId_idx` ON `CustomerTransaction`(`walletId`);

-- CreateIndex
CREATE INDEX `Customers_customerTypeId_idx` ON `Customers`(`customerTypeId`);

-- CreateIndex
CREATE INDEX `DykeProducts_categoryId_idx` ON `DykeProducts`(`categoryId`);

-- CreateIndex
CREATE INDEX `DykeSalesDoors_housePackageToolId_idx` ON `DykeSalesDoors`(`housePackageToolId`);

-- CreateIndex
CREATE INDEX `DykeSalesDoors_salesOrderItemId_idx` ON `DykeSalesDoors`(`salesOrderItemId`);

-- CreateIndex
CREATE INDEX `DykeSalesDoors_salesOrderId_idx` ON `DykeSalesDoors`(`salesOrderId`);

-- CreateIndex
CREATE INDEX `DykeSalesShelfItem_salesOrderItemId_idx` ON `DykeSalesShelfItem`(`salesOrderItemId`);

-- CreateIndex
CREATE INDEX `DykeSalesShelfItem_productId_idx` ON `DykeSalesShelfItem`(`productId`);

-- CreateIndex
CREATE INDEX `DykeSalesShelfItem_categoryId_idx` ON `DykeSalesShelfItem`(`categoryId`);

-- CreateIndex
CREATE INDEX `DykeShelfProducts_categoryId_idx` ON `DykeShelfProducts`(`categoryId`);

-- CreateIndex
CREATE INDEX `DykeShelfProducts_parentCategoryId_idx` ON `DykeShelfProducts`(`parentCategoryId`);

-- CreateIndex
CREATE INDEX `DykeStepForm_salesId_idx` ON `DykeStepForm`(`salesId`);

-- CreateIndex
CREATE INDEX `DykeStepForm_salesItemId_idx` ON `DykeStepForm`(`salesItemId`);

-- CreateIndex
CREATE INDEX `DykeStepForm_stepId_idx` ON `DykeStepForm`(`stepId`);

-- CreateIndex
CREATE INDEX `DykeStepProducts_dykeStepId_idx` ON `DykeStepProducts`(`dykeStepId`);

-- CreateIndex
CREATE INDEX `DykeStepProducts_dykeProductId_idx` ON `DykeStepProducts`(`dykeProductId`);

-- CreateIndex
CREATE INDEX `DykeSteps_rootStepValueId_idx` ON `DykeSteps`(`rootStepValueId`);

-- CreateIndex
CREATE INDEX `DykeSteps_stepValueId_idx` ON `DykeSteps`(`stepValueId`);

-- CreateIndex
CREATE INDEX `DykeSteps_prevStepValueId_idx` ON `DykeSteps`(`prevStepValueId`);

-- CreateIndex
CREATE INDEX `ErrorLog_userId_idx` ON `ErrorLog`(`userId`);

-- CreateIndex
CREATE INDEX `ErrorLogTags_errorLogId_idx` ON `ErrorLogTags`(`errorLogId`);

-- CreateIndex
CREATE INDEX `ErrorLogTags_errorTagId_idx` ON `ErrorLogTags`(`errorTagId`);

-- CreateIndex
CREATE INDEX `Event_usersId_idx` ON `Event`(`usersId`);

-- CreateIndex
CREATE INDEX `HomeTasks_projectId_idx` ON `HomeTasks`(`projectId`);

-- CreateIndex
CREATE INDEX `HomeTasks_jobId_idx` ON `HomeTasks`(`jobId`);

-- CreateIndex
CREATE INDEX `HomeTasks_assignedToId_idx` ON `HomeTasks`(`assignedToId`);

-- CreateIndex
CREATE INDEX `HomeTemplates_builderId_idx` ON `HomeTemplates`(`builderId`);

-- CreateIndex
CREATE INDEX `Homes_projectId_idx` ON `Homes`(`projectId`);

-- CreateIndex
CREATE INDEX `Homes_homeTemplateId_idx` ON `Homes`(`homeTemplateId`);

-- CreateIndex
CREATE INDEX `Homes_communityTemplateId_idx` ON `Homes`(`communityTemplateId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_orderItemId_idx` ON `HousePackageTools`(`orderItemId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_salesOrderId_idx` ON `HousePackageTools`(`salesOrderId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_dykeDoorId_idx` ON `HousePackageTools`(`dykeDoorId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_doorId_idx` ON `HousePackageTools`(`doorId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_jambSizeId_idx` ON `HousePackageTools`(`jambSizeId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_casingId_idx` ON `HousePackageTools`(`casingId`);

-- CreateIndex
CREATE INDEX `HousePackageTools_moldingId_idx` ON `HousePackageTools`(`moldingId`);

-- CreateIndex
CREATE INDEX `Inbox_senderId_idx` ON `Inbox`(`senderId`);

-- CreateIndex
CREATE INDEX `Invoices_projectId_idx` ON `Invoices`(`projectId`);

-- CreateIndex
CREATE INDEX `Invoices_homeId_idx` ON `Invoices`(`homeId`);

-- CreateIndex
CREATE INDEX `JobPayments_userId_idx` ON `JobPayments`(`userId`);

-- CreateIndex
CREATE INDEX `JobPayments_paidBy_idx` ON `JobPayments`(`paidBy`);

-- CreateIndex
CREATE INDEX `Jobs_paymentId_idx` ON `Jobs`(`paymentId`);

-- CreateIndex
CREATE INDEX `Jobs_homeId_idx` ON `Jobs`(`homeId`);

-- CreateIndex
CREATE INDEX `Jobs_userId_idx` ON `Jobs`(`userId`);

-- CreateIndex
CREATE INDEX `Jobs_coWorkerId_idx` ON `Jobs`(`coWorkerId`);

-- CreateIndex
CREATE INDEX `Jobs_projectId_idx` ON `Jobs`(`projectId`);

-- CreateIndex
CREATE INDEX `ModelHasRoles_modelId_idx` ON `ModelHasRoles`(`modelId`);

-- CreateIndex
CREATE INDEX `Notifications_userId_idx` ON `Notifications`(`userId`);

-- CreateIndex
CREATE INDEX `Notifications_fromUserId_idx` ON `Notifications`(`fromUserId`);

-- CreateIndex
CREATE INDEX `OrderInventory_parentId_idx` ON `OrderInventory`(`parentId`);

-- CreateIndex
CREATE INDEX `OrderItemDelivery_orderId_idx` ON `OrderItemDelivery`(`orderId`);

-- CreateIndex
CREATE INDEX `OrderItemDelivery_orderItemId_idx` ON `OrderItemDelivery`(`orderItemId`);

-- CreateIndex
CREATE INDEX `OrderItemDelivery_orderDeliveryId_idx` ON `OrderItemDelivery`(`orderDeliveryId`);

-- CreateIndex
CREATE INDEX `OrderItemProductionAssignments_orderId_idx` ON `OrderItemProductionAssignments`(`orderId`);

-- CreateIndex
CREATE INDEX `OrderItemProductionAssignments_itemId_idx` ON `OrderItemProductionAssignments`(`itemId`);

-- CreateIndex
CREATE INDEX `OrderItemProductionAssignments_assignedToId_idx` ON `OrderItemProductionAssignments`(`assignedToId`);

-- CreateIndex
CREATE INDEX `OrderItemProductionAssignments_assignedById_idx` ON `OrderItemProductionAssignments`(`assignedById`);

-- CreateIndex
CREATE INDEX `OrderItemProductionAssignments_salesDoorId_idx` ON `OrderItemProductionAssignments`(`salesDoorId`);

-- CreateIndex
CREATE INDEX `OrderProductionSubmissions_salesOrderId_idx` ON `OrderProductionSubmissions`(`salesOrderId`);

-- CreateIndex
CREATE INDEX `OrderProductionSubmissions_salesOrderItemId_idx` ON `OrderProductionSubmissions`(`salesOrderItemId`);

-- CreateIndex
CREATE INDEX `OrderProductionSubmissions_assignmentId_idx` ON `OrderProductionSubmissions`(`assignmentId`);

-- CreateIndex
CREATE INDEX `PageView_usersId_idx` ON `PageView`(`usersId`);

-- CreateIndex
CREATE INDEX `Payday_invoiceId_idx` ON `Payday`(`invoiceId`);

-- CreateIndex
CREATE INDEX `ProductVariants_productId_idx` ON `ProductVariants`(`productId`);

-- CreateIndex
CREATE INDEX `Projects_builderId_idx` ON `Projects`(`builderId`);

-- CreateIndex
CREATE INDEX `SalesCommision_orderId_idx` ON `SalesCommision`(`orderId`);

-- CreateIndex
CREATE INDEX `SalesCommision_userId_idx` ON `SalesCommision`(`userId`);

-- CreateIndex
CREATE INDEX `SalesCommision_orderPaymentId_idx` ON `SalesCommision`(`orderPaymentId`);

-- CreateIndex
CREATE INDEX `SalesCommision_commissionPaymentId_idx` ON `SalesCommision`(`commissionPaymentId`);

-- CreateIndex
CREATE INDEX `SalesItemSupply_salesOrderId_idx` ON `SalesItemSupply`(`salesOrderId`);

-- CreateIndex
CREATE INDEX `SalesItemSupply_salesOrderItemId_idx` ON `SalesItemSupply`(`salesOrderItemId`);

-- CreateIndex
CREATE INDEX `SalesOrders_customerId_idx` ON `SalesOrders`(`customerId`);

-- CreateIndex
CREATE INDEX `SalesOrders_shippingAddressId_idx` ON `SalesOrders`(`shippingAddressId`);

-- CreateIndex
CREATE INDEX `SalesOrders_billingAddressId_idx` ON `SalesOrders`(`billingAddressId`);

-- CreateIndex
CREATE INDEX `SalesOrders_prodId_idx` ON `SalesOrders`(`prodId`);

-- CreateIndex
CREATE INDEX `SalesOrders_salesRepId_idx` ON `SalesOrders`(`salesRepId`);

-- CreateIndex
CREATE INDEX `SalesOrders_pickupId_idx` ON `SalesOrders`(`pickupId`);

-- CreateIndex
CREATE INDEX `SalesPayments_orderId_idx` ON `SalesPayments`(`orderId`);

-- CreateIndex
CREATE INDEX `SalesPayments_customerId_idx` ON `SalesPayments`(`customerId`);

-- CreateIndex
CREATE INDEX `SalesPayments_transactionId_idx` ON `SalesPayments`(`transactionId`);

-- CreateIndex
CREATE INDEX `SalesPickup_pickupApprovedBy_idx` ON `SalesPickup`(`pickupApprovedBy`);

-- CreateIndex
CREATE INDEX `UserDocuments_userId_idx` ON `UserDocuments`(`userId`);

-- CreateIndex
CREATE INDEX `Users_employeeProfileId_idx` ON `Users`(`employeeProfileId`);

-- CreateIndex
CREATE INDEX `WorkOrders_techId_idx` ON `WorkOrders`(`techId`);
