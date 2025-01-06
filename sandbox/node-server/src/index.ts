import {
  i,
  id,
  init,
  type InstaQLEntity,
  effect,
} from "@dorilama/instantdb-server";
import schema from "../instant.schema";

const APP_ID = process.env["INSTANT_APP_ID"]!;

type Todo = InstaQLEntity<typeof schema, "todos">;

const db = init({ appId: APP_ID, schema });

const q1 = { todos: { $: { where: { test: { $isNull: true } } } } };

const { data } = db.useQuery(q1);

effect(() => {
  if (data.value?.todos.length) {
    console.log(`got ${data.value?.todos.length} records`);
    const chunks = data.value.todos.map((todo) => {
      return db.tx.todos[todo.id].update({ test: Date.now() });
    });
    db.transact(chunks);
  }
});

console.log("started!");
