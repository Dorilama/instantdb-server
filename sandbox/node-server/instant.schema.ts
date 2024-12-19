// Docs: https://www.instantdb.com/docs/schema

import { i } from "@dorilama/instantdb-server";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    todos: i.entity({
      completed: i.boolean(),
      createdAt: i.number(),
      done: i.boolean(),
      test: i.number(),
      text: i.string(),
    }),
  },
  links: {},
  // If you use presence, you can define a room schema here
  // https://www.instantdb.com/docs/schema#defining-rooms
  rooms: {},
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
