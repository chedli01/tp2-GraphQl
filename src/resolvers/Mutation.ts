export const Mutation = {
    createCV: (parent: any, { input }: any, context: any) => {
        const userExists = context.db.users.find((user: any) => user.id == input.ownerId);
        if (!userExists) {
            throw new Error(`User with ID ${input.ownerId} not found`);
        }
        const skillsExist = input.skillIds.every((skillId: any) =>
            context.db.skills.some((skill: any) => skill.id == skillId)
        );
        if (!skillsExist) {
            throw new Error('One or more skills not found');
        }

        const newCV = {
            id: context.db.cvs.length + 1,
            name: input.name,
            age: input.age,
            job: input.job,
            owner: parseInt(input.ownerId)
        };
        context.db.cvs.push(newCV);

        input.skillIds.forEach((skillId: any) => {
            context.db.cvSkills.push({
                cvId: newCV.id,
                skillId: parseInt(skillId)
            });
        });

        return newCV;
    },

    updateCV: (parent: any, { id, input }: any, context: any) => {
        const cvIndex = context.db.cvs.findIndex((cv: any) => cv.id == id);
        if (cvIndex === -1) {
            throw new Error(`CV with ID ${id} not found`);
        }

        if (input.skillIds) {
            const skillsExist = input.skillIds.every((skillId: any) =>
                context.db.skills.some((skill: any) => skill.id == skillId)
            );
            if (!skillsExist) {
                throw new Error('One or more skills not found');
            }

            context.db.cvSkills = context.db.cvSkills.filter((cs: any) => cs.cvId != id);
            input.skillIds.forEach((skillId: any) => {
                context.db.cvSkills.push({
                    cvId: id,
                    skillId: parseInt(skillId)
                });
            });
        }

        const updatedCV = {
            ...context.db.cvs[cvIndex],
            ...input
        };
        context.db.cvs[cvIndex] = updatedCV;

        return updatedCV;
    },

    deleteCV: (parent: any, { id }: any, context: any) => {
        const cvIndex = context.db.cvs.findIndex((cv: any) => cv.id == id);
        if (cvIndex === -1) {
            throw new Error(`CV with ID ${id} not found`);
        }

        context.db.cvs.splice(cvIndex, 1);
        context.db.cvSkills = context.db.cvSkills.filter((cs: any) => cs.cvId != id);

        return true;
    }
}