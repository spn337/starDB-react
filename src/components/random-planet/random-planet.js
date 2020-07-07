import React from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends React.Component {

  static defaultProps = {
    updateInterval: 10000
  };

  static propTypes = {
    updateInterval: PropTypes.number
  };

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
    image: null
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 20) + 1;
    this.swapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
      image: this.swapiService.getPlanetImage(planet)
    })
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }
  render() {

    const { planet, loading, error, image } = this.state;

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <PlanetView planet={planet} image={image} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}


const PlanetView = ({ planet, image }) => {
  const { name, population, rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
        src={image} />
      <div>
        <h3>{name}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
