import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AnimatedModal from '../../UI/Modal/Modal';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    submitButton: {
        paddingTop: 20,
    }
});

const initialState = {
    title: '',
    description: '',
    error: false
}

const formReducer = (currentForm, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...currentForm, title: action.title };
        case 'SET_DESCRIPTION':
            return { ...currentForm, description: action.description };
        case 'CLEAR':
            return initialState;
        case 'BAD_INPUT':
            return { ...currentForm, error: true };
        default:
            throw new Error("You should add new case");
    }
}

const ThingForm = (props) => {
    const classes = useStyle();

    const [{ title, description, error }, dispatch] = useReducer(formReducer, initialState)

    const handleSubmit = e => {
        e.preventDefault();
        if (title !== '') {
            props.addThing(title, description)
            onClose(false)
        } else {
            dispatch({ type: "BAD_INPUT" })
        }
    }

    const onClose = () => {
        dispatch({ type: "CLEAR" })
        props.onClose()
    }

    return (
        <AnimatedModal
            open={props.open}
            onClose={onClose}>
            <form noValidate autoComplete="off">
                <TextField error={error} required label="Name" onChange={e => dispatch({ type: "SET_TITLE", title: e.target.value })} />
                <br />
                <TextField label="Description" onChange={e => dispatch({ type: "SET_DESCRIPTION", description: e.target.value })} />
                <br />
                <Button className={classes.submitButton} onClick={handleSubmit} color="primary">Save new Thing</Button>
            </form>
        </AnimatedModal>
    );
}

export default ThingForm;
