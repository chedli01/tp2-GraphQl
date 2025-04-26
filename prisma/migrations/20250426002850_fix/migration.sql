-- DropForeignKey
ALTER TABLE `cvskill` DROP FOREIGN KEY `CVSkill_cvId_fkey`;

-- DropForeignKey
ALTER TABLE `cvskill` DROP FOREIGN KEY `CVSkill_skillId_fkey`;

-- AddForeignKey
ALTER TABLE `CvSkill` ADD CONSTRAINT `CvSkill_cvId_fkey` FOREIGN KEY (`cvId`) REFERENCES `CV`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CvSkill` ADD CONSTRAINT `CvSkill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
