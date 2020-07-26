import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography'
import { green, red, orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    card: {
        width: 500,
        margin: "auto",
        marginTop: 40
    },
    title: {
        textAlign: "left",
        fontWeight: "bold",
        marginTop: 5,
        marginLeft: 5
    },
    divider: {
        margin: 10
    }
});

const Thing = React.memo(({ thing, onDelete, onEdit }) => {
    const classes = useStyle();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title}>{thing.title}</Typography>
                {thing.description ?
                    <>
                        <Divider className={classes.divider} />
                        <Typography variant="body2">{thing.description}</Typography>
                    </>
                    : null}
            </CardContent>
            <CardActions>
                <Grid container spacing={10}>
                    <Grid item xs={4}>
                        <IconButton style={{ color: green[500] }}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton style={{ color: orange[500] }} onClick={() => onEdit(thing)} >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <IconButton style={{ color: red[500] }} onClick={() => onDelete(thing.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions >
        </Card >
    );
});

export default Thing;