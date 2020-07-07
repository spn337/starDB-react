import React from 'react';
import { withSwapiService } from '../hoc-helpers';
import ItemDetails, { Record } from '../item-details';


const PlanetDetails = (props) => {

    return (
        <ItemDetails {...props}>
            <Record label="Population" field="population" />
            <Record label="Rotation period" field="rotationPeriod" />
            <Record label="Diameter" field="diameter" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImage: swapiService.getPlanetImage
    };
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);