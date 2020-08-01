import React, { useReducer, useEffect } from "react";
import { thingsReducer } from "../../../reducers/thingsReducer/thingsReducer";
import useFetch from "../../../hooks/useFetch/useFetch";
import Swal from "sweetalert2";

const defaultState = {
    CRUD: {},
    actions: {},
    data: {}
}

export const ThingsContext = React.createContext(defaultState);

const createList = (json) => {
    const thingsList = [];
    for (const key in json) {
        thingsList.push({
            id: key,
            title: json[key].title,
            description: json[key].description,
        });
    }
    return thingsList.reverse();
};

const ThingsProvider = ({ children }) => {
    const [thingList, dispatch] = useReducer(thingsReducer, []);
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
                        id: reqExtra,
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
    };

    const deleteThing = (id) => {
        sendRequest(
            "DELETE_THING",
            `https://thingsto-57b9a.firebaseio.com/things/${id}.json`,
            "DELETE",
            id
        );
    };

    return (
        <ThingsContext.Provider
            value={{
                CRUD: { addThing, updateThing, deleteThing },
                data: { thingList, isLoading }
            }}>
            {children}
        </ThingsContext.Provider >
    );
};

export default ThingsProvider;
