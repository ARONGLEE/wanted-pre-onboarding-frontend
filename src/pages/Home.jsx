import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>TODOLIST</Title>
      <Button
        onClick={() => {
          navigate('/signin');
        }}
      >
        START
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Button = styled.button`
  font-size: 1rem;
  border: 1px solid orange;
  background-color: orange;
  border-radius: 3px;
  padding: 3px 5px;
  margin: 30px auto;
  color: #fff;
`;
