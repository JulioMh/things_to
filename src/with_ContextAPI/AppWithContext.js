import React from 'react';
import Things from './containers/Things/Things';
import ThingsProvider from "../contexts/ThingsContext/ThingsContext"
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    textAlign: "center"
  }
});

const AppWithContext = () => {
  const classes = useStyle();

  return (
    <ThingsProvider>
      <div className={classes.root}>
        <Things />
      </div>
    </ThingsProvider>
  );
}

export default AppWithContext;
