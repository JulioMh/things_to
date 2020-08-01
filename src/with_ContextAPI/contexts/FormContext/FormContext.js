import React, { useReducer } from 'react';
import { formReducer, initialState } from "../../../reducers/formReducer/formReducer";

const defaultState = {
    formState: {}
}

export const FormContext = React.createContext(defaultState)

const FormProvider = ({ children, updateThing, addThing }) => {
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const setTitle = (title) => {
        dispatch({ type: "SET_TITLE", title: title })
    }

    const setDescription = (description) => {
        dispatch({ type: "SET_DESCRIPTION", description: description })
    }

    const handleSubmit = () => {
        const thing = {
            id: formState.id,
            title: formState.title,
            description: formState.description
        }
        if (thing.id) {
            updateThing(thing);
        } else {
            addThing(thing);
        }
        onClose()
    };

    const handleToEdit = (thing) => {
        dispatch({
            type: 'SET_ALL',
            id: thing.id,
            title: thing.title,
            description: thing.description
        })
    };

    const openForm = () => {
        dispatch({ type: "NEW" })
    }

    const onClose = () => {
        dispatch({ type: "CLEAR" })
    }

    return (
        <FormContext.Provider value={{ formState, handleSubmit, handleToEdit, onClose, setTitle, setDescription, openForm }}>
            {children}
        </FormContext.Provider>)
}

export default FormProvider;