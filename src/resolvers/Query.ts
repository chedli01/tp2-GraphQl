export const Query = {
    hello: (parent: any, args: any) => `hello ${args.name}`,

    getCVs: (parent: any, args: any, context: any) => {
        return context.prisma.CV.findMany({
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    },

    getCV: (parent: any, { id }: { id: number }, context: any) => {
        return context.prisma.cV.findUnique({
            where: {id: Number(id)},
            include: {
                owner: true,
                cvSkills: {
                    include: {
                        skill: true
                    }
                }
            }
        }).then((cv: any) => {
            if (!cv) {
                throw new Error(`CV with ID ${id} not found`);
            }

            return {
                ...cv,
                skills: cv.cvSkills.map((cs: any) => cs.skill)
            };
        });
    }
};