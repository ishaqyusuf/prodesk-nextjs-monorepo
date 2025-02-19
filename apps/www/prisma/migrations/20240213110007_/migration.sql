-- AlterTable
ALTER TABLE `AddressBooks` MODIFY `address2` VARCHAR(300) NULL;

-- CreateIndex
CREATE INDEX `AddressBooks_name_idx` ON `AddressBooks`(`name`);
