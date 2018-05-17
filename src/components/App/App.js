import React, { Component } from 'react';
import axios from 'axios';

import Intro from '../Introduction/Introduction';
import NewStar from '../NewStar/NewStar';
import StarList from '../starList/starList';
import NewStarForm from '../NewStarForm/NewStarForm';
import PlanetList from '../PlanetList/PlanetList';

const emptyStar = {
  name: '',
  diameter: '',
};

// const planetList = {};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starList: [
        {
          name: 'Menkar',
          diameter: 25,
        },
        {
          name: 'Kochab',
          diameter: 45,
        },
        {
          name: 'Hadar',
          diameter: 55,
        },
      ],
      newStar: emptyStar,
      planetList: [],
    };

  }

  handleChangeFor = propertyName => event => {
    this.setState({
      newStar: {
        ...this.state.newStar,
        [propertyName]: event.target.value,
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.starList);
    this.setState({
      starList: [
        ...this.state.starList,
        this.state.newStar,
      ]
    });
    this.setState({
      newStar: emptyStar,
    });
  }



  componentDidMount() {
    this.getPlanets('https://swapi.co/api/planets/?format=json');
  }

  getPlanets = (nextUrl) => {
    if (nextUrl) {
      axios({
        method: 'GET',
        url: nextUrl,
      })
        .then(response => {
          console.log(response.data.results);
          this.setState({
            planetList: [...this.state.planetList, ...response.data.results,]
          });
          this.getPlanets(response.data.next);
        }).catch(error => {
          console.log(error);
        });
    }
  }





  render() {

    return (

      <div>
        <Intro />
        <NewStarForm newStar={this.state.newStar} handleChangeForChild={this.handleChangeFor} handleSubmitForChild={this.handleSubmit} />
        <NewStar newStar={this.state.newStar} />
        <StarList starList={this.state.starList} />
        {/* {JSON.stringify(this.state.planetList)} */}
        <PlanetList planetList={this.state.planetList} />
      </div>
    );
  }
}

export default App;
