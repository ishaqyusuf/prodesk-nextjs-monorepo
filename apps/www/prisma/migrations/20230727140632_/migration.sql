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
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `AddressBooks_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Builders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Builders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CacheManagers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cacheKey` TEXT NOT NULL,
    `tags` JSON NULL,
    `data` JSON NULL,
    `rememberTill` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CacheManagers_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Categories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityModels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NOT NULL,
    `modelName` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CommunityModels_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CostCharts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `addressId` INTEGER NULL,
    `customerTypeId` INTEGER NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phoneNo` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `meta` LONGTEXT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Customers_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerTypes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `coefficient` DOUBLE NULL,
    `meta` LONGTEXT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CustomerTypes_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FailedJobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `connection` TEXT NOT NULL,
    `queue` TEXT NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `exception` LONGTEXT NOT NULL,
    `failedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `FailedJobs_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Homes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archived` BOOLEAN NULL,
    `projectId` INTEGER NULL,
    `builderId` INTEGER NULL,
    `homeTemplateId` INTEGER NULL,
    `homeKey` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `modelName` VARCHAR(255) NULL,
    `modelNo` VARCHAR(255) NULL,
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

    UNIQUE INDEX `Homes_id_key`(`id`)
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
    `payrollCheckNo` VARCHAR(255) NULL,
    `payrollApprovedByName` VARCHAR(255) NULL,
    `installersName` VARCHAR(255) NULL,
    `search` VARCHAR(255) NULL,
    `installationStatus` VARCHAR(255) NULL,
    `productionStatus` VARCHAR(255) NULL,
    `installNote` VARCHAR(255) NULL,
    `extraInstallReason` VARCHAR(255) NULL,
    `installStatus` VARCHAR(255) NULL,
    `extraInstallCostReason` VARCHAR(255) NULL,
    `checkNo` VARCHAR(255) NULL,
    `projectId` INTEGER NULL,
    `payrollApprovedById` INTEGER NULL,
    `billable` BOOLEAN NULL,
    `produceable` BOOLEAN NULL,
    `installable` BOOLEAN NULL,
    `extraInstallCost` DOUBLE NULL,
    `taxCost` DOUBLE NULL,
    `amountDue` DOUBLE NULL,
    `amountPaid` DOUBLE NULL,
    `payableInstallerCost` DOUBLE NULL,
    `payableInstallerExtraCost` DOUBLE NULL,
    `payableInstallerTotalCost` DOUBLE NULL,
    `completedAt` DOUBLE NULL,
    `totalInstallCost` DOUBLE NULL,
    `installCost` DOUBLE NULL,
    `checkDate` TIMESTAMP(0) NULL,
    `statusDate` TIMESTAMP(0) NULL,
    `payrollCheckDate` TIMESTAMP(0) NULL,
    `sentToProductionAt` TIMESTAMP(0) NULL,
    `producedAt` TIMESTAMP(0) NULL,
    `prodStartedAt` TIMESTAMP(0) NULL,
    `productionStatusDate` TIMESTAMP(0) NULL,
    `productionDueDate` TIMESTAMP(0) NULL,
    `installApprovedAt` TIMESTAMP(0) NULL,
    `installStatusDate` TIMESTAMP(0) NULL,
    `installedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `HomeTasks_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HomeTemplates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `builderId` INTEGER NULL,
    `slug` VARCHAR(255) NULL,
    `modelNo` VARCHAR(255) NULL,
    `modelName` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `HomeTemplates_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InboundOrderItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inboundOrderId` INTEGER NULL,
    `salesOrderItemId` INTEGER NULL,
    `salesOrderId` INTEGER NULL,
    `productVariantId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `meta` LONGTEXT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `productId` INTEGER NOT NULL,
    `unitCost` DOUBLE NOT NULL,
    `totalCost` DOUBLE NOT NULL,

    UNIQUE INDEX `InboundOrderItems_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InboundOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `orderId` VARCHAR(255) NOT NULL,
    `supplierId` INTEGER NULL,
    `totalCost` DOUBLE NULL,
    `status` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `InboundOrders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `productVariantId` INTEGER NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Inventories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderInventory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `meta` JSON NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NULL,
    `parentId` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `OrderInventory_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryProducts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `multiVariant` BOOLEAN NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `categoryId` INTEGER NULL,
    `subCategoryId` INTEGER NULL,
    `weight` DOUBLE NULL,
    `meta` LONGTEXT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `priceUpdateAt` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(255) NULL,
    `barcode` VARCHAR(255) NULL,
    `qty` INTEGER NULL,
    `price` DOUBLE NULL,
    `minimumStockLevel` INTEGER NULL,
    `img` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `category` VARCHAR(255) NULL,
    `subCategory` VARCHAR(255) NULL,
    `supplier` VARCHAR(255) NULL,

    UNIQUE INDEX `InventoryProducts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER NULL,
    `homeId` INTEGER NULL,
    `refNo` VARCHAR(255) NULL,
    `lot` VARCHAR(255) NULL,
    `block` VARCHAR(255) NULL,
    `taskId` INTEGER NULL,
    `checkNo` VARCHAR(255) NULL,
    `amount` DOUBLE NULL,
    `taskName` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `taskUid` VARCHAR(255) NULL,
    `checkDate` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Invoices_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MailGrids` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NULL,
    `html` TEXT NULL,
    `message` TEXT NULL,
    `design` LONGTEXT NULL,
    `fromName` VARCHAR(255) NULL,
    `fromEmail` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `slug` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,

    UNIQUE INDEX `MailGrids_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Migrations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INTEGER NOT NULL,

    UNIQUE INDEX `Migrations_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelHasPermissions` (
    `permissionId` INTEGER NOT NULL,
    `modelType` VARCHAR(255) NOT NULL,
    `modelId` BIGINT UNSIGNED NOT NULL,

    INDEX `model_has_permissions_model_id_model_type_index`(`modelId`, `modelType`),
    PRIMARY KEY (`permissionId`, `modelId`, `modelType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModelHasRoles` (
    `roleId` INTEGER NOT NULL,
    `modelType` VARCHAR(255) NOT NULL,
    `modelId` INTEGER NOT NULL,

    INDEX `model_has_roles_model_id_model_type_index`(`modelId`, `modelType`),
    PRIMARY KEY (`roleId`, `modelId`, `modelType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProductionSubmissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderId` INTEGER NOT NULL,
    `salesOrderItemId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `meta` JSON NULL,

    UNIQUE INDEX `OrderProductionSubmissions_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` TEXT NULL,
    `orderId` VARCHAR(255) NULL,
    `name` VARCHAR(255) NULL,
    `createdBy` INTEGER NOT NULL,
    `phone` VARCHAR(255) NULL,
    `supplier` VARCHAR(255) NULL,
    `date` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Orders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTemplateItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderTemplateId` INTEGER NOT NULL,
    `description` TEXT NULL,
    `qty` INTEGER NOT NULL,
    `productVariantId` INTEGER NULL,
    `productId` INTEGER NULL,
    `price` DOUBLE NULL,
    `retailCost` DOUBLE NULL,
    `salesCost` DOUBLE NULL,
    `subTotal` DOUBLE NULL,
    `totalCost` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `taxPercenatage` DOUBLE NULL,
    `discount` DOUBLE NULL,
    `discountPercentage` DOUBLE NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `OrderTemplateItems_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTemplates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `subTotal` DOUBLE NULL,
    `discount` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `taxPercentage` DOUBLE NULL,
    `discountPercentage` DOUBLE NULL,
    `grandTotal` DOUBLE NULL,

    UNIQUE INDEX `OrderTemplates_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `PasswordResets_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `guardName` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Permissions_id_key`(`id`),
    UNIQUE INDEX `permissions_name_guard_name_unique`(`name`, `guardName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalAccessTokens` (
    `id` INTEGER NULL,
    `tokenableType` VARCHAR(255) NOT NULL,
    `tokenableId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `abilities` TEXT NULL,
    `meta` JSON NULL,
    `lastUsedAt` TIMESTAMP(0) NULL,
    `expiresAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `PersonalAccessTokens_tokenableId_key`(`tokenableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `type` VARCHAR(255) NOT NULL,
    `content` TEXT NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NULL,
    `parentId` INTEGER NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Posts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PriceLists` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `slug` TEXT NULL,
    `category` VARCHAR(255) NULL,
    `item` TEXT NULL,
    `price` DOUBLE NULL,
    `sellingPrice` DOUBLE NULL,
    `size` VARCHAR(255) NULL,
    `supplier` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `PriceLists_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `ProductCategories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `section` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `size` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `box` VARCHAR(255) NULL,
    `price` DOUBLE NOT NULL,
    `finish` VARCHAR(255) NULL,
    `length` VARCHAR(255) NULL,
    `per` VARCHAR(255) NULL,
    `unitQty` VARCHAR(255) NULL,
    `itemNumber` VARCHAR(255) NULL,
    `lastUpdate` VARCHAR(255) NOT NULL,
    `note` TEXT NULL,
    `priceType` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Products_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductTags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `ProductTags_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductVariants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `weight` DOUBLE NULL,
    `price` DOUBLE NULL,
    `description` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `slug` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `variantTitle` TEXT NULL,
    `sku` VARCHAR(255) NULL,
    `barcode` VARCHAR(255) NULL,
    `qty` INTEGER NULL,
    `minimumStockLevel` INTEGER NULL,
    `img` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `category` VARCHAR(255) NULL,
    `subCategory` VARCHAR(255) NULL,
    `supplier` VARCHAR(255) NULL,

    UNIQUE INDEX `ProductVariants_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NULL,
    `progressableId` INTEGER NULL,
    `progressableType` VARCHAR(255) NULL,
    `userId` INTEGER NULL,
    `status` VARCHAR(255) NULL,
    `type` VARCHAR(255) NULL,
    `headline` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Progress_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `archived` BOOLEAN NULL,
    `title` VARCHAR(255) NULL,
    `builderId` INTEGER NULL,
    `address` VARCHAR(255) NULL,
    `slug` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `refNo` VARCHAR(255) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Projects_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoleHasPermissions` (
    `permissionId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    INDEX `role_has_permissions_role_id_foreign`(`roleId`),
    PRIMARY KEY (`permissionId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `guardName` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Roles_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesInvoiceItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `salesInvoiceId` INTEGER NOT NULL,
    `item` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `qty` INTEGER NOT NULL,
    `salesPercentage` DOUBLE NULL,
    `costPrice` DOUBLE NULL,
    `salesPrice` DOUBLE NULL,
    `total` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesInvoiceItems_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesInvoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `invoiceNumber` VARCHAR(255) NOT NULL,
    `customerName` VARCHAR(255) NULL,
    `sumTax` DOUBLE NULL,
    `subTotal` DOUBLE NULL,
    `total` DOUBLE NOT NULL,
    `salesPercentage` DOUBLE NULL,
    `taxPercentage` DOUBLE NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesInvoices_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesJobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` VARCHAR(255) NULL,
    `salesOrderId` INTEGER NOT NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesJobs_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItemComponents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `salesOrderId` INTEGER NOT NULL,
    `salesOrderItemId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `cost` DOUBLE NULL,
    `qty` DOUBLE NULL,
    `total` DOUBLE NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesOrderItemComponents_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NULL,
    `productVariantId` INTEGER NULL,
    `productId` INTEGER NULL,
    `casingId` INTEGER NULL,
    `frameId` INTEGER NULL,
    `hingeId` INTEGER NULL,
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
    `orderTemplateId` INTEGER NULL,
    `orderTemplateItemId` INTEGER NULL,
    `salesOrderId` INTEGER NOT NULL,
    `rate` DOUBLE NULL,
    `total` DOUBLE NULL,
    `profitMargin` DOUBLE NULL,
    `salesPercentage` DOUBLE NULL,
    `prodStatus` VARCHAR(255) NULL,
    `prodStartedAt` TIMESTAMP(0) NULL,
    `sentToProdAt` TIMESTAMP(0) NULL,
    `prodCompletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesOrderItems_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrderProducts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderId` INTEGER NOT NULL,
    `salesOrderItemId` INTEGER NOT NULL,
    `qty` INTEGER NULL,
    `stockQty` INTEGER NULL,
    `shortQty` INTEGER NULL,
    `productVariantId` INTEGER NULL,
    `productId` INTEGER NULL,
    `status` VARCHAR(255) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesOrderProducts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `customerId` INTEGER NULL,
    `billingAddressId` INTEGER NULL,
    `shippingAddressId` INTEGER NULL,
    `salesRepId` INTEGER NOT NULL,
    `prodId` INTEGER NULL,
    `summary` TEXT NULL,
    `instruction` TEXT NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `orderId` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NULL,
    `prodQty` DOUBLE NULL,
    `builtQty` DOUBLE NULL,
    `subTotal` DOUBLE NULL,
    `discount` DOUBLE NULL,
    `profitMargin` DOUBLE NULL,
    `tax` DOUBLE NULL,
    `taxPercentage` DOUBLE NULL,
    `discountPercentage` DOUBLE NULL,
    `grandTotal` DOUBLE NULL,
    `amountDue` DOUBLE NULL,
    `invoiceStatus` VARCHAR(255) NULL,
    `paidAt` TIMESTAMP(0) NULL,
    `prodStatus` VARCHAR(255) NULL,
    `prodDueDate` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesOrders_id_key`(`id`),
    UNIQUE INDEX `SalesOrders_orderId_key`(`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesPayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NULL,
    `orderId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesPayments_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SubCategories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Suppliers_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Tags_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `homeId` INTEGER NULL,
    `unitId` INTEGER NULL,
    `projectId` INTEGER NULL,
    `taskId` INTEGER NULL,
    `amount` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `note` TEXT NULL,
    `doneBy` VARCHAR(255) NULL,
    `status` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `adminNote` TEXT NULL,
    `statusDate` TIMESTAMP(0) NULL,
    `rejectedAt` TIMESTAMP(0) NULL,
    `approvedAt` TIMESTAMP(0) NULL,
    `paidAt` TIMESTAMP(0) NULL,
    `approvedBy` INTEGER NULL,
    `paidBy` INTEGER NULL,
    `checkNo` VARCHAR(255) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Tasks_id_key`(`id`)
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

    UNIQUE INDEX `Users_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Variants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Variants_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkOrders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `lot` VARCHAR(255) NULL,
    `block` VARCHAR(255) NULL,
    `projectName` VARCHAR(255) NULL,
    `builderName` VARCHAR(255) NULL,
    `requestDate` VARCHAR(255) NULL,
    `supervisor` VARCHAR(255) NULL,
    `scheduleDate` VARCHAR(255) NULL,
    `scheduleTime` VARCHAR(255) NULL,
    `homeAddress` VARCHAR(255) NULL,
    `homeOwner` VARCHAR(255) NULL,
    `homePhone` VARCHAR(255) NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NULL,
    `completedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `WorkOrders_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meta` JSON NULL,
    `fromUserId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `seenAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Notifications_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
