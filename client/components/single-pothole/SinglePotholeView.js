import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapAccessToken from '../../../secrets';

const Map = ReactMapboxGl({
  accessToken: mapAccessToken,
});

class SinglePothole extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <h1>Hello</h1>,
      (
        <Map
          style={'mapbox://styles/mapbox/streets-v9'}
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>
      )
    );
  }
}

export default SinglePothole;
