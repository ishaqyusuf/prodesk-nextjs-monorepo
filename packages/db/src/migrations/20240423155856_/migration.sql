-- DropIndex
DROP INDEX `HomeTasks_createdAt_homeId_deletedAt_produceable_billable_ad_idx` ON `HomeTasks`;

-- CreateIndex
CREATE INDEX `HomeTasks_createdAt_deletedAt_produceable_billable_addon_dec_idx` ON `HomeTasks`(`createdAt`, `deletedAt`, `produceable`, `billable`, `addon`, `deco`, `punchout`, `installable`, `taskName`, `projectId`, `jobId`);

-- CreateIndex
CREATE INDEX `idx_HomeTasks_on_homeId` ON `HomeTasks`(`homeId`);
