-- DropIndex
DROP INDEX `AddressBooks_name_idx` ON `AddressBooks`;

-- CreateIndex
CREATE INDEX `AddressBooks_name_address1_idx` ON `AddressBooks`(`name`, `address1`);
