import React, { useCallback, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isEmailValue, setIsEmailValue] = useState('');
  const [isPasswordValue, setIsPasswordValue] = useState('');

  const navigate = useNavigate();

  const onChangeEmail = useCallback((e) => {
    const emailRegex = /[\w\-.]+@[\w\-.]+/g;
    setIsEmailValue(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  }, []);

  const onChangePassword = useCallback((e) => {
    const passwordRegex = /.{8,}$/;
    setIsPasswordValue(e.target.value);
    if (!passwordRegex.test(e.target.value)) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
  }, []);

  const clickMove = (emailValue, passwordValue) => {
    axios
      .post(
        'https://www.pre-onboarding-selection-task.shop/auth/signup',
        {
          email: emailValue,
          password: passwordValue,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(() => {
        navigate('/signin');
      })
      .catch((error) => {
        window.console.log(error);
      });
  };

  return (
    <Container>
      <Title>SIGNUP</Title>
      <InputLayout>
        <label htmlFor="email" style={{ color: '#db4804' }}>
          이메일
          <Input style={{ marginLeft: '19px' }} data-testid="email-input" type="email" id="email" required onChange={onChangeEmail} />
        </label>
      </InputLayout>
      <InputLayout>
        <label htmlFor="password" style={{ color: '#db4804' }}>
          비밀번호
          <Input data-testid="password-input" type="password" id="password" required onChange={onChangePassword} />
        </label>
      </InputLayout>
      <ButtonLayout>
        <Button
          data-testid="signup-button"
          type="submit"
          disabled={!(isEmail && isPassword)}
          onClick={() => clickMove(isEmailValue, isPasswordValue)}
        >
          회원가입
        </Button>
      </ButtonLayout>
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

const InputLayout = styled.div`
  display: flex;
  align-itmes: center;
  margin: 20px auto;
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

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Button = styled.button`
  font-size: 1rem;
  border: 1px solid ${({ disabled }) => (disabled ? 'gray' : 'orange')};
  background-color: ${({ disabled }) => (disabled ? 'white' : 'orange')};
  border-radius: 3px;
  padding: 5px 10px;
  margin: 30px 10px;
  color: ${({ disabled }) => (disabled ? 'gray' : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
