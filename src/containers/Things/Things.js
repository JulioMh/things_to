import React, { useReducer, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch/useFetch';
import ThingForm from '../../components/Things/ThingForm/ThingForm';
import ThingList from '../../components/Things/ThingList/ThingList';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Swal from 'sweetalert2'
import { blue } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
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
    backdrop: {
        zIndex: 1,
        color: '#fff',
    },
});

const thingsReducer = (currentThings, actions) => {
    switch (actions.type) {
        case 'SET':
            return [...actions.thingList]
        case 'ADD':
            return [actions.thing, ...currentThings]
        case 'DELETE':
            return currentThings.filter(thing => thing.id !== actions.selectedThing)
        default:
            throw new Error("ADD NEW CASE");
    }
}

const createList = (json) => {
    const thingsList = [];
    for (const key in json) {
        thingsList.push({
            id: key,
            title: json[key].title,
            description: json[key].description
        });
    }
    return thingsList
}

const Things = () => {
    const classes = useStyle();
    const [thingList, dispatch] = useReducer(thingsReducer, []);
    const [open, setOpen] = useState(false);
    const [isLoading, data, error, reqIdentifier, reqExtra, sendRequest] = useFetch()

    const addThing = (thing) => {
        sendRequest("ADD_THING", "https://thingsto-57b9a.firebaseio.com/things.json", 'POST', '', JSON.stringify(thing), thing)
    }

    const deleteThing = (id) => {
        sendRequest("DELETE_THING", `https://thingsto-57b9a.firebaseio.com/things/${id}.json`, 'DELETE', '', '', id)
    }

    useEffect(() => {
        sendRequest("GET_THINGS", "https://thingsto-57b9a.firebaseio.com/things.json", 'GET')
    }, [sendRequest])

    useEffect(() => {
        if (!isLoading && !error && reqIdentifier) {
            switch (reqIdentifier) {
                case 'ADD_THING':
                    return dispatch({ type: "ADD", thing: { id: data.name, ...reqExtra } })
                case 'GET_THINGS':
                    return dispatch({ type: "SET", thingList: createList(data) })
                case 'DELETE_THING':
                    return dispatch({ type: "DELETE", selectedThing: reqExtra })
                default:
                    throw new Error("SOMETHING IS FAILING")

            }
        } else if (error) {
            Swal.fire({
                title: "Error",
                text: error,
                confirmButtonText: "Okay",
                icon: 'error'
            })
        }
    }, [isLoading, data, error, reqIdentifier, reqExtra])

    return (
        <>
            <Fab className={classes.fab} onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
            <Typography variant="h3" style={{ marginTop: 20 }}>TODO</Typography>
            <ThingList things={thingList} onDelete={deleteThing} />
            <ThingForm onClose={setOpen} open={open} addThing={addThing} />
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default Things;
