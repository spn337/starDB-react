import React from 'react';

import './error-button.css';


export default class ErrorButton extends React.Component {
    state = {
        renderError: false
    };

    render() {
        if (this.state.renderError) {
            this.foo.bar = 0;
        }
        return (
            <button
                className="btn btn-danger error-button"
                onClick={() => this.setState({ renderError: true })}>
                Throw Error</button>
        )
    };
}