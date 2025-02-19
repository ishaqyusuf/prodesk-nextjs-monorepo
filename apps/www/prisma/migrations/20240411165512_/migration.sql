/*
  Warnings:

  - The primary key for the `ModelHasPermissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `modelId` on the `ModelHasPermissions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `UnsignedBigInt`.

*/
-- AlterTable
ALTER TABLE `Blogs` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `CustomerTransaction` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Jobs` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `MailGrids` MODIFY `design` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `ModelHasPermissions` DROP PRIMARY KEY,
    MODIFY `modelId` BIGINT UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`permissionId`, `modelId`, `modelType`);

-- AlterTable
ALTER TABLE `WorkOrders` MODIFY `requestDate` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `role_has_permissions_role_id_foreign` ON `RoleHasPermissions`(`roleId`);
