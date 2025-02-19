-- AlterTable
ALTER TABLE `AddressBooks` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Blogs` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Builders` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CommissionPayment` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CommunityModelCost` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CommunityModelPivot` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CommunityModels` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CommunityTemplateHistory` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CostCharts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CustomerTransaction` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CustomerTypes` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CustomerWallet` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Customers` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeCategories` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeDoors` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeProductPrices` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeProducts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeSalesDoors` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeSalesShelfItem` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeShelfProducts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeStepForm` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeStepProducts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeStepValues` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `DykeSteps` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `EmployeeProfile` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ErrorLog` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `HomeTasks` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `HomeTemplates` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Homes` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `HousePackageTools` MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Inventories` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `InventoryProducts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Invoices` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `JobPayments` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Jobs` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `MailGrids` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Notifications` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `OrderProductionSubmissions` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Payday` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `PaydayInvoice` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Permissions` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Posts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ProductCategories` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `ProductVariants` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Products` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Progress` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Projects` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Roles` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesCommision` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesInvoiceItems` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesInvoices` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesItemSupply` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesJobs` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesOrderItems` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesOrderProducts` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesOrders` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesPayments` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SalesPickup` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Settings` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `UserDocuments` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Users` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `WorkOrders` MODIFY `updatedAt` DATETIME(3) NULL;
