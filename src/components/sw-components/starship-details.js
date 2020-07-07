import React from 'react';
import { withSwapiService } from '../hoc-helpers';
import ItemDetails, { Record } from '../item-details';


const StarshipDetails = (props) => {

    return (
        <ItemDetails {...props}>
            <Record label="Model" field="model" />
            <Record label="Length" field="length" />
            <Record label="Cost" field="costInCredits" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImage: swapiService.getStarshipImage
    };
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);