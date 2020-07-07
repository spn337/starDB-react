import React from 'react';
import { withRouter } from 'react-router-dom';

import Row from '../row';
import ErrorBoundry from '../error-boundry';
import { PersonList, PersonDetails } from '../sw-components';

const PeoplePage = ({ history, match }) => {

    const { id } = match.params;

    return (
        <ErrorBoundry>
            <Row
                left={<PersonList onItemSelected={(id) => history.push(id)} />}
                right={<PersonDetails itemId={id} />} />
        </ErrorBoundry>
    );
};

export default withRouter(PeoplePage);