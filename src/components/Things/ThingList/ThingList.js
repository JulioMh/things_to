import React from 'react';
import Thing from './Thing/Thing';

const ThingList = React.memo(props => {
    return (
        <>
            {props.things.map((thing) => <Thing key={thing.id} thing={thing} onDelete={props.onDelete} />)}
        </>)
});

export default ThingList;