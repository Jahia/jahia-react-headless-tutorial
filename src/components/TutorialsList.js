import React from 'react';
import TutorialItem from './TutorialItem';
import { Grid } from '@material-ui/core';

const TutorialsList = props => {
  return (
    <Grid container spacing={2}>
      {props.items.map((item) => (
        <Grid 
          item sm={12} md={3}
          key={item.id}>
          <TutorialItem item={item} />
        </Grid>
      ))}
    </Grid>
  )
};

export default TutorialsList;