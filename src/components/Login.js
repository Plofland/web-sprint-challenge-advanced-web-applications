import React, { useState } from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';

const Login = () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });
  const [errorStatus, setErrorStaus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        window.location = 'http://localhost:3000/bubbles-page';
      })
      .catch((err) => {
        console.log(err.response.data.error);
        // const loginError = 'Username or Password not valid';
        setErrorStaus(err.response.data.error);
      });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="Username">
          Username:
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Password">
          Password:
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </label>
        <p>{errorStatus}</p>
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
