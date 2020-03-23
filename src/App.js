import React from 'react';
import './App.css';
import TutorialsList from './components/TutorialsList';
import { Container } from '@material-ui/core';
import { HashRouter, Route } from 'react-router-dom';
import TutorialDetail from './components/TutorialDetail';
import request from 'graphql-request';
import environment from './config';

function App() {

  const [tutorialItems, setTutorialItems] = React.useState([]);

  const query = `{
    jcr (workspace: LIVE) {
      queryResults: nodesByCriteria(criteria: {
        nodeType: "jntuto:tutorialItem"
      }) {
        nodes {
          uuid
          title: property(name:"jcr:title") { value }
          image: property(name: "image") { refNode {path} }
        }
      }
    }
  }`

  React.useEffect(() => {
    request(environment.graphQLEndpoint, query).then(results => {
      let items = [];
      results.jcr.queryResults.nodes.forEach(node => {
        items.push({
          id: node.uuid,
          title: node.title.value,
          image: `${environment.mediaBasePath}/${node.image.refNode.path}`
        });
      })

      setTutorialItems(items);
    })
    .catch(error => console.log(error));

  }, [query]);

  return (
    <Container>
      <HashRouter>
        <Route exact path="/tutorial/:tutorialId" render={ () => <TutorialDetail /> } />
        <Route exact path="/" render={() => <TutorialsList items={tutorialItems} /> } /> 
      </HashRouter>
    </Container>
  );
}

export default App;