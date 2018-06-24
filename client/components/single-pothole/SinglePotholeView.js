import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
  Dimmer,
  Loader,
  Image,
  Dropdown,
} from 'semantic-ui-react';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import GoogleMapReact from 'google-map-react';
import mapAccessToken from '../../../secrets';
import { createGotPotholeThunk, createUpdateStatusThunk } from '../../store';
import { connect } from 'react-redux';

const accessToken = mapAccessToken;
const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </div>
);
const options = [
  { key: 'open', text: 'Open', value: 'Open' },
  { key: 'in-progress', text: 'In-progress', value: 'In-progess' },
  { key: 'closed', text: 'Closed', value: 'Closed' },
];

class SinglePothole extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const potholeId = this.props.match.params.id;
    await this.props.getPothole(potholeId);
  }

  handleClick(event) {
    event.preventDefault();
    console.log(event.target);
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
    const latitude = +pothole.longitude || -87.6354;
    const longitude = +pothole.latitude || 41.8885;
    const defaultProps = {
      center: {
        lat: longitude,
        lng: latitude,
      },
    };
    console.log(pothole);
    return (
      <div>
        <Container>
          <Segment>
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column width={12}>
                  <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: accessToken }}
                      center={defaultProps.center}
                      defaultZoom={15}
                    >
                      <AnyReactComponent
                        lat={longitude}
                        lng={latitude}
                        text={'Chicago'}
                      />
                    </GoogleMapReact>
                  </div>
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
                  <Dropdown
                    placeholder="Open"
                    selection
                    // search
                    options={options}
                    // value={pothole.status}
                    // defaultValue="Open"
                    name={pothole.status}
                    onClick={this.handleClick}
                  />
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
