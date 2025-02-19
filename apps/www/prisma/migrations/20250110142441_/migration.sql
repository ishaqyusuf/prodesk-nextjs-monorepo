-- AlterTable
ALTER TABLE `DykeStepForm` ADD COLUMN `componentId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `DykeStepForm_componentId_idx` ON `DykeStepForm`(`componentId`);

-- CreateIndex
CREATE INDEX `DykeStepProducts_doorId_idx` ON `DykeStepProducts`(`doorId`);
