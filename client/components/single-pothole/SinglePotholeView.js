import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
  Dimmer,
  Loader,
  Image,
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
    this.state = {};
  }

  async componentDidMount() {
    const potholeId = this.props.match.params.id;
    await this.props.getPothole(potholeId);
  }

  render() {
    const { pothole } = this.props.potholes;

    if (!pothole) {
      return (
        <div>
          {' '}
          <Segment>
            <Dimmer active>
              <Loader size="mini">Loading</Loader>
            </Dimmer>
          </Segment>{' '}
        </div>
      );
    }
    const latitude = +pothole.latitude || -87.6354;
    const longitude = +pothole.longitude || 41.8885;
    return (
      <div>
        <Container>
          <Segment>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={12}>
                  <Map
                    style={style}
                    styles={{ display: 'flex' }}
                    containerStyle={{
                      height: '75vh',
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

                <Grid.Column
                  width={4}
                  color="blue"
                  style={{ margin: '0 0 12px 0', padding: '1rem 0 0 0' }}
                >
                  <Header textAlign="center" as="h2">
                    Pothole Details
                  </Header>
                  <Image
                    style={{ margin: '1rem' }}
                    src="https://upload.wikimedia.org/wikipedia/commons/1/10/Newport_Whitepit_Lane_pot_hole.JPG"
                    size="small"
                  />
                  <Header as="h5" style={{ margin: '0 1rem' }}>
                    {pothole.streetAddress} {pothole.zip}
                  </Header>
                  <Header as="h5" style={{ margin: '0 1rem' }}>
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since the 1500s
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
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
