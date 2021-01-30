import React from 'react';
import { render, screen } from '@testing-library/react';
import BubblePage from './BubblePage';
import App from '../App';
import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorsMock = () => {
  axiosWithAuth()
    .get('/colors')
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });
};

test('Renders App without errors sanity test', () => {
  render(<App />);
});

test('Renders BubblePage without errors', () => {
  // Finish this test
  render(<BubblePage />);
});

test('Fetches data and renders the bubbles on mounting', async () => {
  // Finish this test
  fetchColorsMock();
  //Arrange
  render(<BubblePage />);
  //Act
  let colorAPI = await screen.findByText(/bubbles/i);
  //Assert
  expect(colorAPI).toBeInTheDocument();
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading
