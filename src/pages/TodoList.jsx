import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TodoCreate from '../components/TodoCreate';
import TodoListItem from '../components/TodoListItem';

export default function TodoList() {
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    axios
      .get('https://www.pre-onboarding-selection-task.shop/todos', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 200) {
          setTodos(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTodo = (value) => {
    axios
      .post(
        'https://www.pre-onboarding-selection-task.shop/todos',
        { todo: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.status === 201) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTodo = (id, value, isCompleted) => {
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: value,
          isCompleted,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.status === 200) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 204) {
          getTodos();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container>
      <Title>MY TODOLIST</Title>
      <Line />
      <TodoCreate addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoListItem todos={todo} key={todo.id} editTodo={editTodo} deleteTodo={deleteTodo} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  max-width: 350px;
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid orange;
`;

const Title = styled.h1`
  color: #db4804;
  text-align: center;
`;

const Line = styled.hr`
  border: 0.5px solid orange;
`;
