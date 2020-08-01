import React, { useContext } from 'react';
import { ThingsContext } from '../../../contexts/ThingsContext/ThingsContext'
import Thing from './Thing/Thing';


const ThingList = () => {
    const { thingList } = useContext(ThingsContext).data;
    return (
        <>
            {thingList.map((thing) => <Thing key={thing.id} thing={thing}/>)}
        </>)
};

export default ThingList;