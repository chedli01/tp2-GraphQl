import { GraphQLError } from "graphql";

export function getAll(model: any[]) {
  return () => model;
}

export function getOne(model: any[], id: number | string, key: string = "id") {
  const data = model.find((item: any) => item[key] == id);
  if (!data) {
    throw new GraphQLError("Not found")
  }
  return data
}

export function createItem(model: any[], data: any, additionalData = {}) {
  const newItem = {
    id: model.length + 1,
    ...data,
    ...additionalData,
  };
  model.push(newItem);
  return newItem;
}

export function updateItem(model: any[], id: number | string, data: any) {
  const index = model.findIndex((item) => item.id == id);
  if (index === -1) return null;
  const updated = { ...model[index], ...data };
  model[index] = updated;
  return updated;
}

export function deleteItem(model: any[], id: number | string) {
  const index = model.findIndex((item) => item.id == id);

  if (index === -1) throw new GraphQLError("Not found");
  const [deleted] = model.splice(index, 1);
  return deleted;
}
