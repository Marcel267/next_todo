import React from "react";

type Props = {
  promise: Promise<Todo[]>;
};

export default async function Todos({ promise }: Props) {
  const todos = await promise;

  const content = todos.map((todo) => {
    return (
      <li
        key={todo.id}
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-[450px] p-4"
      >
        <div className="flex">
          {/* <Checkbox /> */}
          <span>{todo.title}</span>
        </div>
      </li>
    );
  });

  return content;
}
