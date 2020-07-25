import React from 'react';
import Thing from './Thing/Thing';

const ThingList = React.memo(
    props =>
        <>
            {props.things.map(({ title, description }) => <Thing title={title} description={description} />)}
        </>
);

export default ThingList;