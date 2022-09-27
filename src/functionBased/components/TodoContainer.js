/* eslint-disable */
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';

const TodoContainer = () => {
  const [todos, setTodos] = useState(getInitialTodos());

  const handleChange = (id) => {
    setTodos(prevState =>
      prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  }

  const delTodo = (id) => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id
      }),
    ])
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    setTodos([...todos, newTodo])
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      })
    )
  }

  useEffect(() => {
    console.log("test run");

    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
  
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [setTodos]);

  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo addTodoProps={addTodoItem} />
        <TodoList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={delTodo}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
  
}

export default TodoContainer;
