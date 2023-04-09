/*
  Warnings:

  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `notes` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`, `uid`);
