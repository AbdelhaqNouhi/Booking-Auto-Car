/*
  Warnings:

  - Added the required column `travelId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `travelId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Travel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
