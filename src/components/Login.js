import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  // useEffect({}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    console.log(formValues);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', formValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
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
