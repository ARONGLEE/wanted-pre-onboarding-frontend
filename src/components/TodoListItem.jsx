import React, { useCallback, useState } from 'react';
import { CiEdit, CiEraser, CiCircleRemove } from 'react-icons/ci';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TodoListItem({ todos, editTodo, deleteTodo }) {
  const { id, todo, isCompleted } = todos;
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(false);

  const checkHandler = () => {
    editTodo(id, todo, !isCompleted);
  };

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const updateButton = () => {
    if (value === '') {
      editTodo(id, todo, isCompleted);
    } else {
      editTodo(id, value, isCompleted);
    }
    setStatus(false);
  };

  const editCancel = () => {
    setStatus(false);
  };

  const deleteButton = () => {
    deleteTodo(id);
  };

  return (
    <Container>
      {status ? (
        <EditLayout>
          <Li>
            <TodoItem>
              <CheckBox
                type="checkbox"
                onChange={() => {
                  checkHandler();
                }}
                checked={isCompleted}
              />
              <Input type="text" defaultValue={todo} data-testid="modify-input" onChange={onChange} />
            </TodoItem>
            <Button data-testid="submit-button" onClick={updateButton}>
              <CiEdit style={{ marginTop: '10px' }} />
            </Button>
            <Button data-testid="cancel-button" onClick={editCancel}>
              <CiCircleRemove style={{ marginTop: '10px' }} />
            </Button>
          </Li>
        </EditLayout>
      ) : (
        <div>
          <Li>
            <TodoItem>
              <CheckBox
                type="checkbox"
                onChange={() => {
                  checkHandler();
                }}
                checked={isCompleted}
              />
              <Text completed={isCompleted}>{todo}</Text>
            </TodoItem>
            <Button data-testid="modify-button" onClick={() => setStatus(true)}>
              <CiEdit style={{ marginTop: '10px' }} />
            </Button>
            <Button data-testid="delete-button" onClick={deleteButton}>
              <CiEraser style={{ marginTop: '10px' }} />
            </Button>
          </Li>
        </div>
      )}
    </Container>
  );
}

TodoListItem.propTypes = { todos: PropTypes.object.isRequired, editTodo: PropTypes.func.isRequired, deleteTodo: PropTypes.func.isRequired };

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditLayout = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const TodoItem = styled.label`
  display: flex;
  flex: 1;
  align-itmes: center;
`;

const Li = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const CheckBox = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid orange;
  border-radius: 0.35rem;
  margin-top: 16px;

  &:checked {
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: orange;
  }
`;

const Input = styled.input`
  width: 200px;
  margin-left: 6px;
  color: #db4804;
  outline: none;
  border: none;
  font-size: 1rem;
  border-bottom: 1px solid orange;
`;

const Text = styled.p`
  width: 200px;
  margin-left: 10px;
  color: ${({ completed }) => (completed ? 'orange' : '#db4804')};
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : '')};
`;

const Button = styled.button`
  border: none;
  color: orange;
  background-color: #fff;
  font-size: 25px;
`;
