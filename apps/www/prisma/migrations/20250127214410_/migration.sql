-- CreateTable
CREATE TABLE `NotePad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdById` INTEGER NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `NotePad_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteTags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagName` VARCHAR(191) NOT NULL,
    `tagValue` VARCHAR(191) NOT NULL,
    `notePadId` INTEGER NULL,

    UNIQUE INDEX `NoteTags_id_key`(`id`),
    INDEX `NoteTags_notePadId_idx`(`notePadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteComments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notePadId` INTEGER NULL,
    `commentNotePadId` INTEGER NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `NoteComments_id_key`(`id`),
    INDEX `NoteComments_notePadId_idx`(`notePadId`),
    INDEX `NoteComments_commentNotePadId_idx`(`commentNotePadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
