import React, { useState } from "react";
import is from "@sindresorhus/is";
import client from "common/client/client";
import useSubscribe from "common/hooks/use-subscribe";
const todosSvc = client.service("todos");
const todoInitialState = { name: "", isDone: false, description: "" };

function Todos() {
  const [todos, todosErr] = useSubscribe(todosSvc, {
    query: { $limit: 5000 },
  });
  const [todo, setTodo] = useState(todoInitialState);

  if (is.undefined(todos)) {
    return <div>Loading ...</div>;
  }

  if (todosErr) {
    return <div>{todosErr.message}</div>;
  }

  const updateTodo = (k, v) => setTodo((p) => ({ ...p, [k]: v }));

  const create = (todo) => {
    todosSvc
      .create(todo)
      .then((_) => window.toaster.success("Done"))
      .catch((err) => window.toaster.failure(err.message));
  };

  const deleteTodo = (todo) => {
    todosSvc
      .remove(todo._id)
      .then((_) => window.toaster.success("Done"))
      .catch((err) => window.toaster.failure(err.message));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            {t.name}, {t._id}, {t.description}
            <button onClick={(_) => deleteTodo(t)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={todo.name}
        onChange={(event) => updateTodo("name", event.target.value)}
      />
      <input
        type="text"
        value={todo.description}
        onChange={(event) => updateTodo("description", event.target.value)}
      />
      <button
        onClick={(_) => {
          create(todo);
          setTodo(todoInitialState);
        }}
      >
        Create
      </button>
    </div>
  );
}

export default Todos;
