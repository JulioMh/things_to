import React, { useReducer, useEffect } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import ThingForm from "../../components/Things/ThingForm/ThingForm";
import ThingList from "../../components/Things/ThingList/ThingList";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Swal from "sweetalert2";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const createList = (json) => {
    const thingsList = [];
    for (const key in json) {
        thingsList.push({
            id: key,
            title: json[key].title,
            description: json[key].description,
        });
    }
    return thingsList;
};

const useStyle = makeStyles({
    fab: {
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        backgroundColor: blue[500],
        color: "white",
    },
    backdrop: {
        zIndex: 1,
        color: "#fff",
    },
});

const thingsReducer = (currentThings, actions) => {
    switch (actions.type) {
        case "SET":
            return [...actions.thingList];
        case "ADD":
            console.log(actions.thing)
            return [actions.thing, ...currentThings];
        case "EDIT":
            return currentThings.map(thing => thing.id === actions.id ? { id: actions.id, ...actions.thing } : thing)
        case "DELETE":
            return currentThings.filter(
                (thing) => thing.id !== actions.selectedThing
            );
        default:
            throw new Error("ADD NEW CASE");
    }
};

const formInitialState = {
    open: false,
    thingToEdit: null,
};

const formReducer = (_, actions) => {
    switch (actions.type) {
        case "NEW":
            return { open: true, thingToEdit: null };
        case "EDIT":
            return { open: true, thingToEdit: actions.thingToEdit };
        case "CLOSE":
            return formInitialState;
        default:
            throw new Error("ADD NEW CASE");
    }
};


const Things = () => {
    const classes = useStyle();
    const [thingList, dispatch] = useReducer(thingsReducer, []);
    const [{ open, thingToEdit }, dispatchForm] = useReducer(formReducer, formInitialState);
    const [
        isLoading,
        data,
        error,
        reqIdentifier,
        reqExtra,
        sendRequest,
    ] = useFetch();

    useEffect(() => {
        sendRequest(
            "GET_THINGS",
            "https://thingsto-57b9a.firebaseio.com/things.json",
            "GET"
        );
    }, [sendRequest]);

    useEffect(() => {
        if (!isLoading && !error && reqIdentifier) {
            switch (reqIdentifier) {
                case "ADD_THING":
                    return dispatch({
                        type: "ADD",
                        thing: { ...reqExtra, id: data.name },
                    });
                case "UPDATE_THING":
                    return dispatch({
                        type: "EDIT",
                        thing: data,
                        id: reqExtra
                    });
                case "GET_THINGS":
                    return dispatch({ type: "SET", thingList: createList(data) });
                case "DELETE_THING":
                    return dispatch({ type: "DELETE", selectedThing: reqExtra });
                default:
                    throw new Error("SOMETHING IS FAILING");
            }
        } else if (error) {
            Swal.fire({
                title: "BAD REQUEST",
                text: error,
                confirmButtonText: "Okay",
                icon: "error",
            });
        }
    }, [isLoading, data, error, reqIdentifier, reqExtra]);

    const addThing = (thing) => {
        console.log(thing)
        sendRequest(
            "ADD_THING",
            "https://thingsto-57b9a.firebaseio.com/things.json",
            "POST",
            thing,
            JSON.stringify(thing)
        );
    };

    const updateThing = (thing) => {
        sendRequest(
            "UPDATE_THING",
            `https://thingsto-57b9a.firebaseio.com/things/${thing.id}.json`,
            "PUT",
            thing.id,
            JSON.stringify(thing)
        );
    }

    const deleteThing = (id) => {
        sendRequest(
            "DELETE_THING",
            `https://thingsto-57b9a.firebaseio.com/things/${id}.json`,
            "DELETE",
            id
        );
    };

    const handleSubmit = (thing) => {
        if (thing.id) {
            updateThing(thing)
        } else {
            addThing(thing)
        }
    }

    const handleToEdit = (thing) => {
        dispatchForm({ type: "EDIT", thingToEdit: thing })
    };

    return (
        <>
            <Fab className={classes.fab} onClick={() => dispatchForm({ type: "NEW" })}>
                <AddIcon />
            </Fab>
            <Typography variant="h3" style={{ marginTop: 20 }}>
                TODO
            </Typography>
            <ThingList things={thingList} onDelete={deleteThing} handleToEdit={handleToEdit} />
            <ThingForm
                selectedThing={thingToEdit}
                onClose={() => dispatchForm({ type: "CLOSE" })}
                open={open}
                onSubmit={handleSubmit}
            />
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Things;
