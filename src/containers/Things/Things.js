import React, { useContext } from "react";
import { ThingsContext } from "../../contexts/ThingsContext/ThingsContext";
import FormProvider from "../../contexts/FormContext/FormContext";
import ThingForm from "../../components/Things/ThingForm/ThingForm";
import ThingList from "../../components/Things/ThingList/ThingList";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
    backdrop: {
        zIndex: 1,
        color: "#fff",
    },
});

const Things = () => {
    const classes = useStyle();
    const { CRUD, data } = useContext(ThingsContext);

    return (
        <FormProvider updateThing={CRUD.updateThing} addThing={CRUD.addThing}>
            <Typography variant="h3" style={{ marginTop: 20 }}>
                TODO
            </Typography>
            <ThingList />
            <ThingForm />
            <Backdrop className={classes.backdrop} open={data.isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </FormProvider>
    );
};

export default Things;
