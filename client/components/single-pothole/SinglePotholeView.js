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
import SinglePotholeComments from './SinglePotholeComments';
import { createGotPotholeThunk, createUpdateStatusThunk } from '../../store';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const accessToken = 'AIzaSyAd3YEc_nthBh2bFt5l-elcqgGc9KiMm2A';

const options = [
  { key: 'open', text: 'Open', value: 'Open' },
  { key: 'open - dup', text: 'Open - Dup', value: 'Open - Dup' },
  { key: 'in-progress', text: 'In-progress', value: 'In-progess' },
  { key: 'completed', text: 'Completed', value: 'Completed' },
  { key: 'completed - dup', text: 'Completed - Dup', value: 'Completed - Dup' },
  { key: 'closed', text: 'Closed', value: 'Closed' },
];

class SinglePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    if (!pothole || !pothole.id) {
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
      console.log(pothole.status);
      const value = pothole.status;
      const latitude = +pothole.latitude || 41.882702;
      const longitude = +pothole.longitude || -87.619392;

      return (
        <Container>
          <Container>
            <Segment style={{ margin: '2rem' }}>
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column width={12} style={{ padding: 0 }}>
                    <div style={{ height: '75vh', width: '100%' }}>
                      <Map
                        google={this.props.google}
                        initialCenter={{
                          lat: latitude,
                          lng: longitude,
                        }}
                        className={'map'}
                        zoom={17}
                      >
                        <Marker
                          name={'Pothole'}
                          position={{
                            lat: latitude,
                            lng: longitude,
                          }}
                          icon={{
                            url: 'http://localhost:8080/icon.png',
                          }}
                        />
                      </Map>
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
                      src={
                        this.props.pothole.imageUrl ||
                        'https://upload.wikimedia.org/wikipedia/commons/1/10/Newport_Whitepit_Lane_pot_hole.JPG'
                      }
                      size="small"
                    />
                    <Header as="h4" style={{ margin: '0 1rem' }}>
                      {' '}
                      Address:{' '}
                    </Header>
                    <Header as="h5" style={{ margin: '0 1rem' }}>
                      {this.props.pothole.streetAddress}{' '}
                      {this.props.pothole.zip}
                    </Header>
                    <br />
                    <Header as="h4" style={{ margin: '0 1rem' }}>
                      {' '}
                      Description:{' '}
                    </Header>
                    <Header as="h5" style={{ margin: '0 1rem' }}>
                      {this.props.pothole.description ||
                        `Lorem Ipsum has been the industry's standard dummy text
                      ever since the 1500s`}
                    </Header>
                    <br />
                    <Header as="h4" style={{ margin: '0 2rem' }}>
                      {' '}
                      Status:{' '}
                    </Header>
                    <Dropdown
                      style={{ margin: '0 1rem' }}
                      options={options}
                      selection
                      value={value}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Container>
          <Container style={{ margin: '0 1rem' }}>
            <Header as="h2" dividing>
              Comments
            </Header>
            <SinglePotholeComments style={{ margin: '1rem 1rem' }} />
          </Container>
        </Container>
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

const WrappedContainer = GoogleApiWrapper({
  apiKey: accessToken,
})(SinglePothole);

export default connect(
  mapToProps,
  mapDispatch
)(WrappedContainer);
