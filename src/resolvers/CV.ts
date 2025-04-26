export const CV = {
    owner: (parent: any, _args: any, context: any) => {
        return context.prisma.user.findUnique({
            where: { id: parent.ownerId }
        });
    },
    skills: async (parent: any, _args: any, context: any) => {
        const cvWithSkills = await context.prisma.CV.findUnique({
            where: { id: parent.id },
            include: {
                cvSkills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
        return cvWithSkills?.cvSkills.map((cvSkill: any) => cvSkill.skill) || [];
    }
};