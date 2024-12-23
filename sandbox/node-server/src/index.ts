import { i, id, init, type InstaQLEntity } from "@dorilama/instantdb-server";
import schema from "../instant.schema";

const APP_ID = process.env["INSTANT_APP_ID"]!;

type Todo = InstaQLEntity<typeof schema, "todos">;

const { onQuery } = init({ appId: APP_ID, schema });

const q1 = { todos: { $: { where: { test: { $isNull: true } } } } };

onQuery(q1, (ctx) => {
  if (ctx.res.data?.todos.length) {
    console.log(`got ${ctx.res.data?.todos.length} records`);
    const chunks = ctx.res.data.todos.map((todo) => {
      return ctx.db.tx.todos[todo.id].update({ test: Date.now() });
    });
    ctx.db.transact(chunks);
    const q = { ...ctx.query.value } as typeof q1;
    ctx.query.value = q;
  }
});

console.log("started!");
