import { init, i, id, type InstaQLEntity } from "@dorilama/instantdb-server";

const APP_ID = process.env["INSTANT_APP_ID"]!;

const schema = i.schema({
  entities: {
    todos: i.entity({
      text: i.string(),
      done: i.boolean(),
      createdAt: i.number(),
      test: i.number(),
    }),
  },
  links: {},
  rooms: {},
});

type Todo = InstaQLEntity<typeof schema, "todos">;

const { onQuery } = init({ appId: APP_ID, schema });

onQuery({ todos: { $: { where: { test: { $isNull: true } } } } }, (ctx) => {
  if (ctx.res.data?.todos.length) {
    console.log(`got ${ctx.res.data?.todos.length} records`);
    const chunks = ctx.res.data.todos.map((todo) => {
      return ctx.db.tx.todos[todo.id].update({ test: Date.now() });
    });
    ctx.db.transact(chunks);
  }
});

console.log("started!");
