import React from 'react';
import Things from './containers/Things/Things';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    textAlign: "center"
  }
});

const App = () => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Things />
    </div>
  );
}

export default App;
