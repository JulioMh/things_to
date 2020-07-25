import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";


const useStyle = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const AnimatedModal = (props) => {
    const classes = useStyle();

    return (
        <Modal
            className={classes.modal}
            open={props.open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            onClose={() => props.onClose(false)}>
            <Paper style={{padding:50}}>
                {props.children}
            </Paper>
        </Modal>
    );
}

export default AnimatedModal;
