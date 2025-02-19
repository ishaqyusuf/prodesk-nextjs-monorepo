-- DropIndex
DROP INDEX `HomeTasks_homeId_deletedAt_produceable_billable_addon_deco_p_idx` ON `HomeTasks`;

-- CreateIndex
CREATE INDEX `HomeTasks_homeId_deletedAt_produceable_billable_addon_deco_p_idx` ON `HomeTasks`(`homeId`, `deletedAt`, `produceable`, `billable`, `addon`, `deco`, `punchout`, `installable`, `taskName`, `projectId`);
