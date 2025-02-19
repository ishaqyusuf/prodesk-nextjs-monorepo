/*
  Warnings:

  - The primary key for the `ModelHasPermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `modelId` on the `ModelHasPermissions` table. The data in that column could be lost. The data in that column will be cast from `UnsignedBigInt` to `BigInt`.

*/
-- DropIndex
DROP INDEX `DykeShelfProducts_title_idx` ON `DykeShelfProducts`;

-- DropIndex
DROP INDEX `role_has_permissions_role_id_foreign` ON `RoleHasPermissions`;

-- AlterTable
ALTER TABLE `Blogs` MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `CustomerTransaction` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Jobs` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `MailGrids` MODIFY `design` TEXT NULL;

-- AlterTable
ALTER TABLE `ModelHasPermissions` DROP PRIMARY KEY,
    MODIFY `modelId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`permissionId`, `modelId`, `modelType`);

-- AlterTable
ALTER TABLE `OrderInventory` ADD COLUMN `orderInventoryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `WorkOrders` MODIFY `requestDate` TIMESTAMP(0) NULL;
