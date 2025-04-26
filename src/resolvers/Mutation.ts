import { EventType } from "../constants.js";
import {
  createItem,
  deleteItem,
  getOne,
  updateItem,
} from "../utils/crudHelpers.js";
import { publishEvent } from "../utils/publishCvEvent.js";

export const Mutation = {
  createCV: (parent: any, { input }: any, context: any) => {
    const user = getOne(context.db.users, input.ownerId);
    if (!user) throw new Error("Owner not found");

    const skillsExist = input.skillIds.every((id: any) =>
      getOne(context.db.skills, id)
    );
    if (!skillsExist) throw new Error("Skill missing");

    const newCV = createItem(context.db.cvs, input, {
      owner: parseInt(input.ownerId),
    });

    input.skillIds.forEach((skillId: any) =>
      context.db.cvSkills.push({ cvId: newCV.id, skillId: parseInt(skillId) })
    );

    publishEvent(context.pubSub, "CV", EventType.CREATED, { cv: newCV });
    return newCV;
  },

  updateCV: (_: any, { id, input }: any, context: any) => {
    const existingCV = getOne(context.db.cvs, id);
    if (!existingCV) throw new Error(`CV with ID ${id} not found`);

    // Met à jour les skills si fournis
    if (input.skillIds) {
      const skillsExist = input.skillIds.every((skillId: any) =>
        getOne(context.db.skills, skillId)
      );
      if (!skillsExist) throw new Error("One or more skills not found");

      context.db.cvSkills = context.db.cvSkills.filter(
        (cs: any) => cs.cvId != id
      );

      input.skillIds.forEach((skillId: any) => {
        context.db.cvSkills.push({
          cvId: id,
          skillId: parseInt(skillId),
        });
      });
    }

    const updatedCV = updateItem(context.db.cvs, id, input);
    publishEvent(context.pubSub, "CV", EventType.UPDATED, { cv: updatedCV });
    return updatedCV;
  },

  deleteCV: (_: any, { id }: any, context: any) => {
    const deleted = deleteItem(context.db.cvs, id);
    if (!deleted) throw new Error(`CV with ID ${id} not found`);

    context.db.cvSkills = context.db.cvSkills.filter(
      (cs: any) => cs.cvId != id
    );

    publishEvent(context.pubSub, "CV", EventType.DELETED, { cv: deleted });
    return true;
  },
};
