import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function TodoCreate({ addTodo }) {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      addTodo(value);
      setValue('');
      e.preventDefault();
    },
    [value],
  );

  return (
    <Container>
      <form className="TodoInsert" onSubmit={onSubmit}>
        <Input onChange={onChange} data-testid="new-todo-input" value={value} />
        <Button data-testid="new-todo-add-button" type="submit">
          추가
        </Button>
      </form>
    </Container>
  );
}

TodoCreate.propTypes = { addTodo: PropTypes.func.isRequired };

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0px;
`;

const Input = styled.input`
  width: 200px;
  font-size: 1rem;
  color: #db4804;
  outline: none;
  border: none;
  border-bottom: 1px solid orange;
`;

const Button = styled.button`
  font-size: 1rem;
  border: 1px solid orange;
  background-color: #fff;
  border-radius: 3px;
  padding: 3px 5px;
  margin-left: 10px;
  color: #db4804;
`;
