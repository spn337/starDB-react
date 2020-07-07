import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SwapiService from '../../services/swapi-service';
import DummyService from '../../services/dummy-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';

import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from '../pages';

import './app.css';
import { StarshipDetails } from '../sw-components';


export default class App extends React.Component {


  state = {
    hasError: false,
    isLoggedIn: false,
    swapiService: new SwapiService()
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummyService : SwapiService;
      return {
        swapiService: new Service()
      }
    });
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  }

  render() {

    const { hasError, isLoggedIn } = this.state;

    if (hasError) {
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <Header onServiceChange={this.onServiceChange} />
            <RandomPlanet />

            <Switch>
              <Route path="/"
                render={() => <h1>Welcome to StarDB</h1>}
                exact />

              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" component={StarshipsPage} exact />
              <Route path="/starships/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={id} />
                }} />
              <Route
                path="/login"
                render={() => (
                  <LoginPage
                    isLoggedIn={isLoggedIn}
                    onLogin={this.onLogin} />
                )} />
              <Route path="/secret"
                render={() => (
                  <SecretPage isLoggedIn={isLoggedIn} />
                )} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};