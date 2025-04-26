export const Query = {
    hello: (parent: any, args: any) => `hello ${args.name}`,

    getCVs: (parent: any, args: any, context: any) => {
        return context.prisma.cv.findMany({
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    },

    getCV: (parent: any, args: any, context: any) => {
        return context.prisma.cv.findUnique({
            where: { id: Number(args.id) },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
    }
};