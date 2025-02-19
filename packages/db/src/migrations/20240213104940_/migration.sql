-- CreateIndex
CREATE INDEX `Notifications_userId_seenAt_archivedAt_idx` ON `Notifications`(`userId`, `seenAt`, `archivedAt`);
