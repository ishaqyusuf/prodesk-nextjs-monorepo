-- DropIndex
DROP INDEX `Homes_createdAt_deletedAt_modelName_search_idx` ON `Homes`;

-- CreateIndex
CREATE INDEX `Homes_createdAt_deletedAt_modelName_search_projectId_idx` ON `Homes`(`createdAt`, `deletedAt`, `modelName`, `search`, `projectId`);

-- CreateIndex
CREATE INDEX `Jobs_createdAt_homeId_type_status_userId_idx` ON `Jobs`(`createdAt`, `homeId`, `type`, `status`, `userId`);
