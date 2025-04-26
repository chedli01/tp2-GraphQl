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
        try {
            const cvId = Number(id);

            const existingCV = await context.prisma.CV.findUnique({
                where: { id: cvId }
            });
            if (!existingCV) {
                throw new Error(`CV with ID ${id} not found`);
            }

            if (input.skillIds) {
                const skillIds = input.skillIds.map((id: any) => Number(id));

                const skillsCount = await context.prisma.skill.count({
                    where: { id: { in: skillIds } }
                });
                if (skillsCount !== skillIds.length) {
                    throw new Error('One or more skills not found');
                }

                await context.prisma.$transaction([
                    context.prisma.cvSkill.deleteMany({
                        where: { cvId }
                    }),
                    context.prisma.cvSkill.createMany({
                        data: skillIds.map((skillId: number) => ({
                            cvId,
                            skillId
                        }))
                    })
                ]);
            }

            const { skillIds, ...updateData } = input;
            const updatedCV = await context.prisma.CV.update({
                where: { id: cvId },
                data: updateData,
                include: {
                    cvSkills: {
                        include: {
                            skill: true
                        }
                    }
                }
            });

            const result = {
                ...updatedCV,
                skills: updatedCV.cvSkills.map((cs: any) => cs.skill)
            };

            publishCvEvent(context.pubSub, CvEventType.UPDATED, result);
            return result;
        } catch (error: any) {
            console.error('Update CV error:', error);
            throw new Error(error.message || 'Failed to update CV');
        }
    },

    deleteCV: async (parent: any, { id }: any, context: any) => {
        try {
            const cvId = Number(id);

            const existingCV = await context.prisma.CV.findUnique({
                where: { id: cvId },
                include: {
                    cvSkills: {
                        include: {
                            skill: true
                        }
                    },
                    CvEvent: true
                }
            });

            if (!existingCV) {
                throw new Error(`CV with ID ${id} not found`);
            }

            const cvForEvent = {
                ...existingCV,
                skills: existingCV.cvSkills.map((cs: any) => cs.skill)
            };

            await context.prisma.$transaction([
                context.prisma.cvSkill.deleteMany({
                    where: { cvId }
                }),
                context.prisma.cvEvent.deleteMany({
                    where: { cvId }
                }),
                context.prisma.cV.delete({
                    where: { id: cvId }
                })
            ]);

            if (context.pubSub) {
                publishCvEvent(context.pubSub, CvEventType.DELETED, cvForEvent);
            }

            return true;
        } catch (error: any) {
            console.error('Delete CV error:', error);
            throw new Error(error.message || 'Failed to delete CV');
        }
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