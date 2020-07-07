import React from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
    return class extends React.Component {

        state = {
            data: null,
            loading: false,
            error: false
        }

        componentDidMount() {
            this.update();
        };

        componentDidUpdate(prevProps) {
            if (this.props.getData !== prevProps.getData) {
                this.update();
            }
        }

        update() {
            this.setState({
                loading: true,
                error: false
            })
            this.props.getData()
                .then(this.onDataLoaded)
                .catch(this.onError);
        }
        onDataLoaded = (data) => {
            this.setState({
                data,
                loading: false
            })
        };
        onError = () => {
            this.setState({
                loading: false,
                error: true
            })
        }
        render() {
            const { data, loading, error } = this.state;

            if (loading || !data) {
                return <Spinner />
            }
            if (error) {
                return <ErrorIndicator />
            }

            return <View {...this.props} data={data} />
        }
    }
}

export default withData;