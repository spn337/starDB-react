import React from 'react';
import { withSwapiService } from '../hoc-helpers';
import ItemDetails, { Record } from '../item-details';


const PersonDetails = (props) => {

    return (
        <ItemDetails {...props}>
            <Record label="Gender" field="gender" />
            <Record label="Birth Year" field="birthYear" />
            <Record label="Eye Color" field="eyeColor" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImage: swapiService.getPersonImage
    };
};

export default withSwapiService(mapMethodsToProps)(PersonDetails);