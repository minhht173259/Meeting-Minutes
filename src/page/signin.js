import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderContainer, FooterContainer } from '../containers';
import { Form } from '../components';
import { FirebaseContext } from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Signin() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email === '' || password === '';

  const handleSigninSubmit = event => {
    event.preventDefault();

    // process Firebase
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch(err => {
        console.log('Error => ', err);
        setEmail('');
        setPassword('');
        setError(err.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title> Sign In </Form.Title>
          {!!error && <Form.Error> {error} </Form.Error>}
          <Form.Base onSubmit={handleSigninSubmit} method="POST">
            <Form.Input placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)} />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit data-testid="sign-in" type="submit" disabled={isValid}>
              {' '}
              Sign In{' '}
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
