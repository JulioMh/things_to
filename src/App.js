import React, { useState } from 'react';
import Things from './components/Things/ThingList/ThingList';
import ThingForm from './components/Things/ThingForm/ThingForm';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { blue } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    textAlign: "center"
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    backgroundColor: blue[500],
    color: "white"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const list = [
  {
    title: "Hacer una app en React",
    description: "Lista de TODO con futuras extensiones, la idea es que acabe siendo una app en la que puedes tener distintas listas de distintos tipos, para hacer rutinas, recetas, TODO, compras etc."
  },
  {
    title: "Comprar comida",
    description: "Preferiblemente sin lactosa"
  },
  {
    title: "Hacer surf",
    description: "Por favor que haya olas"
  }
];

function App() {
  const classes = useStyle();
  const [thingList, setThingList] = useState([...list]);
  const [open, setOpen] = useState(false);

  const addThing = (title, description) => {
    setThingList(prevState =>
      [
        {
          title: title,
          description: description
        },
        ...prevState]
    )
  }

  return (
    <div className={classes.root}>
      <Fab className={classes.fab} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <Typography variant="h3" style={{ marginTop: 20 }}>TODO</Typography>
      <Things things={thingList} />
      <ThingForm onClose={setOpen} open={open} addThing={addThing} />
    </div>
  );
}

export default App;
