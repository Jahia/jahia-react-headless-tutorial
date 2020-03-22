import React from 'react';
import './App.css';
import TutorialsList from './components/TutorialsList';
import data from './data/items.json';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Container>
      <TutorialsList items={data} />
    </Container>
  );
}

export default App;
