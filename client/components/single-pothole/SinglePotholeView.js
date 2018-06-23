import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapAccessToken from '../../../secrets';

const Map = new ReactMapboxGl({
  accessToken: mapAccessToken,
});

const style = 'mapbox://styles/mapbox/streets-v9';

class SinglePothole extends Component {
  constructor() {
    super();
    this.state = {
      potholePic: '',
    };
  }

  render() {
    return (
      <h1>Hello</h1>,
      (
        <Map
          style={style}
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
          center={[-87.6354, 41.8885]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'harbor-15' }}
          >
            <Feature coordinates={[-87.6354, 41.8885]} />
          </Layer>
        </Map>
      )
    );
  }
}

export default SinglePothole;
