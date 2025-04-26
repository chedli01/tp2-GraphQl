import { getAll, getOne } from "../utils/crudHelpers.js";

export const Query = {
  hello: (_: any, args: any) => `hello ${args.name}`,

  getCVs: (_: any, __: any, context: any) => getAll(context.db.cvs)(),

  getCV: (_: any, args: any, context: any) => getOne(context.db.cvs, args.id),

  //   getUsers: (_: any, __: any, context: any) => getAll(context.db.users)(),

  //   getUser: (_: any, args: any, context: any) =>
  //     getOne(context.db.users, args.id),
};
