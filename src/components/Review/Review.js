import { Button } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Review = () => {
    const history = useHistory();
    const handleGoShipment = () => {
        history.push('/shipment');
    }
    return (
        <div style={{marginLeft: '5%'}}>
            <h1>This Review</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam at, aspernatur non recusandae impedit adipisci. Voluptas nisi adipisci voluptatibus eveniet, earum debitis iure, sunt harum expedita accusamus in, veniam eos.</p>
            {/* go to shipment from here */}
            <Button onClick={handleGoShipment} color="secondary" variant="contained">Go Shipment</Button>
        </div>
    );
};

export default Review;