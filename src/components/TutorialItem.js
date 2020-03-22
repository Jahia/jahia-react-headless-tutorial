import React from 'react';
import { 
  makeStyles, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography
} from '@material-ui/core';

const TutorialItem = props => {
  const classes = useStyles();
  const tutorial = props.item;

  return (
    <Card 
      key={tutorial.id}
      className={classes.root}>
      <CardMedia
        className={classes.media}
        image={tutorial.image}/>
      <CardContent>
        <Typography variant="h5">
          {tutorial.title}
        </Typography>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    marginTop: 20
  },
  media: {
    height: 250
  }
}));

export default TutorialItem;