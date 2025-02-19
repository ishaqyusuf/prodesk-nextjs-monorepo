/*
  Warnings:

  - A unique constraint covering the columns `[tagName,tagValue,notePadId]` on the table `NoteTags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `NoteTags_tagName_tagValue_notePadId_key` ON `NoteTags`(`tagName`, `tagValue`, `notePadId`);
