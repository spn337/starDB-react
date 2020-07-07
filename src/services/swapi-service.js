export default class SwapiService {

  _apiBase = 'http://localhost:57299/api/';
  _imageBase = 'https://starwars-visualguide.com/assets/img/';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    // console.log(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }

    return await res.json();
  }

  //get images
  getPersonImage = ({ id }) => {
    return `${this._imageBase}characters/${id}.jpg`;
  }

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}planets/${id}.jpg`;
  }

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}starships/${id}.jpg`;
  }

  //get all 
  getAllPeople = async () => {
    const res = await this.getResource('people');
    return res
      .map(this._transformPerson)
      .slice(0, 10);
  };

  getAllPlanets = async () => {
    const res = await this.getResource('planets');
    return res
      .map(this._transformPlanet)
      .slice(0, 10);
  };

  getAllStarships = async () => {
    const res = await this.getResource('starships');
    return res
      .map(this._transformStarship)
      .slice(0, 10);
  };

  //get by id
  getPerson = async (id) => {
    const person = await this.getResource(`people/${id}`);
    return this._transformPerson(person);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`planets/${id}`);
    return this._transformPlanet(planet);
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`starships/${id}`);
    return this._transformStarship(starship);
  };


  _extractId(item) {

    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotationPeriod,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      costInCredits: starship.costInCredits,
      length: starship.length
    }
  };
}

