import React, { Component } from 'react';
import {
  Container,
  Divider,
  Grid,
  Header,
  Menu,
  Message,
  Segment,
  Table,
  GridColumn,
} from 'semantic-ui-react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapAccessToken from '../../../secrets';
import { createGotPotholeThunk } from '../../store';
import { connect } from 'react-redux';

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

  async componentDidMount() {
    const potholeId = this.props.match.params.id;
    await this.props.getPothole(potholeId);
  }

  render() {
    const { pothole } = this.props.potholes;
    const latitude = +pothole.latitude || 41.8885;
    const longitude = +pothole.longitude || -87.6354;

    return (
      <div>
        <Container>
          <Grid columns={2} styles={{ display: 'flex' }}>
            <Grid.Column width={12}>
              <Map
                style={style}
                containerStyle={{
                  height: '100vh',
                  width: '75vw',
                }}
                center={[longitude, latitude]}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ 'icon-image': 'harbor-15' }}
                >
                  <Feature coordinates={[longitude, latitude]} />
                </Layer>
              </Map>
            </Grid.Column>

            <Grid.Column width={4}>
              <Header as="h2">Pothole Details</Header>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapToProps = state => {
  return {
    potholes: state.potholes,
  };
};

const mapDispatch = dispatch => {
  return {
    getPothole: potholeId => dispatch(createGotPotholeThunk(potholeId)),
  };
};

export default connect(
  mapToProps,
  mapDispatch
)(SinglePothole);
