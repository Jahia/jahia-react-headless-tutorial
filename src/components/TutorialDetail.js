import React from 'react';
import { Paper, Typography, CardMedia, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import data from '../data/items.json';

const TutorialDetail = (props) => {
  const classes = useStyles();

  const [tutorial, setTutorial] = React.useState({
    image: "",
    body: "",
    title: "",
    id: ""
  });

  let { tutorialId } = useParams();

  React.useEffect(() => {
    setTutorial(data.find((tutorial => tutorial.id === tutorialId)));
  },[tutorialId, tutorial]);

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