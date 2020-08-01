import React, { useContext } from 'react';
import { FormContext } from "../../../contexts/FormContext/FormContext"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AnimatedModal from '../../UI/Modal/Modal';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    submitButton: {
        paddingTop: 20,
    },
    fab: {
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
        backgroundColor: blue[500],
        color: "white",
    }
});

const ThingForm = () => {
    const classes = useStyle();
    const { formState, handleSubmit, onClose, openForm, setTitle, setDescription } = useContext(FormContext);

    return (
        formState.open ?
            <AnimatedModal
                open={formState.open}
                onClose={onClose}>
                <form noValidate autoComplete="off">
                    <TextField error={formState.error} required value={formState.title} label="Name" onChange={e => setTitle(e.target.value)} />
                    <br /><br />
                    <TextField multiline label="Description" value={formState.description} onChange={e => setDescription(e.target.value)} />
                    <br /><br />
                    <Button className={classes.submitButton} onClick={handleSubmit} color="primary">Save new Thing</Button>
                </form>
            </AnimatedModal>
            :
            <Fab className={classes.fab} onClick={openForm}>
                <AddIcon />
            </Fab>
    );
}

export default ThingForm;
