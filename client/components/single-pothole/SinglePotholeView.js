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
import GoogleMapReact from 'google-map-react';
import { createGotPotholeThunk, createUpdateStatusThunk } from '../../store';
import { connect } from 'react-redux';

const accessToken = 'AIzaSyAd3YEc_nthBh2bFt5l-elcqgGc9KiMm2A';

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
    this.state = {
      value: 'Open',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const potholeId = this.props.match.params.id;
    await this.props.getPothole(potholeId);
  }

  handleChange = (event, { value }) => {
    event.preventDefault();
    const pothole = {
      ...this.props.potholes.pothole,
      status: value,
    };
    this.props.updateStatus(pothole, pothole.id);
  };

  render() {
    const pothole = this.props.pothole;

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
    } else {
      const { value } = this.state.value;
      const latitude = +pothole.latitude;
      const longitude = +pothole.longitude;
      const defaultCenter = {
        center: {
          lat: parseFloat(pothole.latitude),
          lng: parseFloat(pothole.longitude),
        },
      };

      return (
        <div>
          <Container>
            <Segment>
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column width={12} style={{ padding: 0 }}>
                    <div style={{ height: '100vh', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: accessToken }}
                        defaultZoom={15}
                        center={defaultCenter.center}
                      >
                        <AnyReactComponent
                          lat={latitude}
                          lng={longitude}
                          text={'Pothole'}
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
                    <Header as="h4" style={{ margin: '0 1rem' }}>
                      {' '}
                      Address:{' '}
                    </Header>
                    <Header as="h5" style={{ margin: '0 1rem' }}>
                      {pothole.streetAddress} {pothole.zip}
                    </Header>
                    <br />
                    <Header as="h4" style={{ margin: '0 1rem' }}>
                      {' '}
                      Description:{' '}
                    </Header>
                    <Header as="h5" style={{ margin: '0 1rem' }}>
                      Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s
                    </Header>
                    <br />
                    <Header as="h4" style={{ margin: '0 1rem' }}>
                      {' '}
                      Status:{' '}
                    </Header>
                    <Dropdown
                      style={{ margin: '0 1rem' }}
                      options={options}
                      placeholder="Choose an option"
                      selection
                      value={value}
                      onChange={this.handleChange}
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
}

const mapToProps = state => {
  return {
    potholes: state.potholes,
    pothole: state.potholes.pothole,
  };
};

const mapDispatch = dispatch => {
  return {
    getPothole: potholeId => dispatch(createGotPotholeThunk(potholeId)),
    updateStatus: (pothole, potholeId) =>
      dispatch(createUpdateStatusThunk(pothole, potholeId)),
  };
};

export default connect(
  mapToProps,
  mapDispatch
)(SinglePothole);
