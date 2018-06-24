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
  Dimmer,
  Loader,
  Image,
  GridRow,
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
    console.log(potholeId);
    await this.props.getPothole(potholeId);
  }

  render() {
    const { pothole } = this.props.potholes;
    console.log(pothole);

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

                <Grid.Column
                  width={4}
                  color="blue"
                  style={{ margin: '0 0 12px 0', padding: '1rem 0 0 0' }}
                >
                  <Header textAlign="center" as="h2">
                    Pothole Details
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
