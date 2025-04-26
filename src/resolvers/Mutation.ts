import { CvEventType } from "../constants.js";
import { publishCvEvent } from "../utils/publishCvEvent.js";

export const Mutation = {
    createCV: async (_: any, { input }: any, context: any) => {
        const newCV = await context.prisma.CV.create({
            data: {
                name: input.name,
                age: input.age,
                job: input.job,
                ownerId: input.ownerId,
                cvSkills: {
                    create: input.skillIds.map((skillId: number) => ({
                        skillId: skillId
                    }))
                }
            },
            include: {
                cvSkills: {
                    include: {
                        skill: true
                    }
                }
            }
        });

        publishCvEvent(context.pubSub, CvEventType.CREATED, newCV);

        return {
            ...newCV,
            skills: newCV.cvSkills.map((cvSkill: any) => cvSkill.skill) // Map to expected response shape
        };
    },

    updateCV: async (parent: any, { id, input }: any, context: any) => {
        const existingCV = await context.prisma.cv.findUnique({
            where: { id: Number(id) }
        });
        if (!existingCV) {
            throw new Error(`CV with ID ${id} not found`);
        }

        if (input.skillIds) {
            const skillsCount = await context.prisma.skill.count({
                where: { id: { in: input.skillIds } }
            });
            if (skillsCount !== input.skillIds.length) {
                throw new Error('One or more skills not found');
            }

            await context.prisma.cvSkill.deleteMany({
                where: { cvId: Number(id) }
            });

            await context.prisma.cv.update({
                where: { id: Number(id) },
                data: {
                    skills: {
                        create: input.skillIds.map((skillId: number) => ({
                            skillId: skillId
                        }))
                    }
                }
            });
        }

        const { skillIds, ...updateData } = input;
        const updatedCV = await context.prisma.cv.update({
            where: { id: Number(id) },
            data: updateData,
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });

        publishCvEvent(context.pubSub, CvEventType.UPDATED, updatedCV);
        return updatedCV;
    },

    deleteCV: async (parent: any, { id }: any, context: any) => {
        const existingCV = await context.prisma.cv.findUnique({
            where: { id: Number(id) }
        });
        if (!existingCV) {
            throw new Error(`CV with ID ${id} not found`);
        }

        const deletedCV = await context.prisma.cv.delete({
            where: { id: Number(id) }
        });

        publishCvEvent(context.pubSub, CvEventType.DELETED, deletedCV);
        return true;
    },

    createUser: async (_: any, { input }: any, context: any) => {
        return context.prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                role: input.role
            }
        });
    },

    createSkill: async (_: any, { input }: any, context: any) => {
        return context.prisma.skill.create({
            data: {
                designation: input.designation
            }
        });
    }
};