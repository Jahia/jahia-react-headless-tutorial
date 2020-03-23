import React from 'react';
import { Paper, Typography, CardMedia, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import request from 'graphql-request';
import environment from '../config';

const TutorialDetail = (props) => {
  const classes = useStyles();

  const [tutorial, setTutorial] = React.useState({
    image: "",
    body: "",
    title: "",
    id: ""
  });

  let { tutorialId } = useParams();

  const query = `{
    jcr (workspace: LIVE) {
      queryResults: nodeById(uuid: "${tutorialId}") {
        uuid
        title: property(name:"jcr:title") { value }
        body: property(name:"body") { value }
        image: property(name: "image") { refNode {path} }
        publishedDate: property(name: "jcr:lastModified") {value}
        publishedBy: property(name: "jcr:lastModifiedBy") {value}
      }
    }
  }`

  React.useEffect(() => {
    request(environment.graphQLEndpoint, query).then(results => {
      const tutorialNode = results.jcr.queryResults;

      let item = {
        id: tutorialNode.uuid,
        title: tutorialNode.title.value,
        body: tutorialNode.body.value,
        image: `${environment.mediaBasePath}/${tutorialNode.image.refNode.path}`,
        publishedDate: tutorialNode.publishedDate.value,
        publishedBy: tutorialNode.publishedBy.value
      }
      
      setTutorial(item);
    })
    .catch(error => console.log(error));
    
  },[query]);

  return (
    <Paper 
      className={classes.root}  elevation={3}>
      { tutorial !== undefined &&
        <>
          {/* Only output CardMedia if there's an actual image to use */}
          { tutorial.image !== "" && 
            <CardMedia 
              image={tutorial.image}
              className={classes.media} />
          }
          <div className={classes.content}>
            <Typography variant="h2" className={classes.title}>{tutorial.title}</Typography>
            <Typography variant="body2" component="p">by: {tutorial.publishedBy}</Typography>
            <Typography variant="body2" component="p">on: {new Date(tutorial.publishedDate).toLocaleDateString("en-US")}</Typography>
            <div dangerouslySetInnerHTML={{__html: tutorial.body}}/>
          </div>
        </>
      }
    </Paper>
  );
}

export default TutorialDetail;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20
  },
  content: {
    padding: 30
  },
  title: {
    marginTop: 20,
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: "50%"
  }
}));