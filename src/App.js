import React from 'react';
import './App.css';
import TutorialsList from './components/TutorialsList';
import data from './data/items.json';
import { Container } from '@material-ui/core';
import { HashRouter, Route } from 'react-router-dom';
import TutorialDetail from './components/TutorialDetail';

function App() {
  
  return (
    <Container>
      <HashRouter>
        <Route exact path="/tutorial/:tutorialId" render={ () => <TutorialDetail /> } />
        <Route exact path="/" render={() => <TutorialsList items={data} /> } />
      </HashRouter>
    </Container>
  );
}

export default App;
