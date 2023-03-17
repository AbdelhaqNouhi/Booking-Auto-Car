/*
  Warnings:

  - You are about to drop the column `mot_de_passe` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `naissance` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `user` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `mot_de_passe`,
    DROP COLUMN `naissance`,
    DROP COLUMN `nom`,
    DROP COLUMN `prenom`,
    DROP COLUMN `telephone`,
    ADD COLUMN `birthday` VARCHAR(191) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` INTEGER NOT NULL;
