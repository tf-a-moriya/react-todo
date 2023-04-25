import React from "react";
import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompliteTodos, setIncompliteTodos] = useState([]);
  const [compliteTodos, setCompliteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompliteTodos, todoText];
    setIncompliteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompliteTodos];
    newTodos.splice(index, 1);
    setIncompliteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompliteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...compliteTodos, incompliteTodos[index]];

    setIncompliteTodos(newIncompleteTodos);
    setCompliteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...compliteTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompliteTodos, compliteTodos[index]];

    setCompliteTodos(newCompleteTodos);
    setIncompliteTodos(newIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompliteTodos.length >= 5}
      />
      {incompliteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodo5個までだよ～。消化しろ～。
        </p>
      )}
      <IncompleteTodos
        todos={incompliteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={compliteTodos} onClickBack={onClickBack} />
    </>
  );
};
