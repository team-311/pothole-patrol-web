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
  { key: 'in-progress', text: 'In-progress', value: 'In-progess' },
  { key: 'closed', text: 'Closed', value: 'Closed' },
];

class SinglePothole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Open',
      pothole: this.props.pothole,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const potholeId = this.props.match.params.id;

    await this.props.getPothole(potholeId);
  }

  UNSAFE_componentWillReceiveProps(prevProps, nextProps) {
    this.setState({ pothole: prevProps.potholes.pothole });
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
    const pothole = this.state.pothole;
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

      return (
        <div>
          <Container>
            <Segment>
              <Grid divided="vertically">
                <Grid.Row columns={2}>
                  <Grid.Column width={12} style={{ padding: 0 }}>
                    <div style={{ height: '100vh', width: '100%' }}>
                      <Map
                        google={this.props.google}
                        initialCenter={{
                          lat: latitude || '‎41.977226',
                          lng: longitude || '-87.836723',
                        }}
                        zoom={14}
                      >
                        <Marker
                          name={'Pothole'}
                          position={{
                            lat: latitude || '‎41.977226',
                            lng: longitude || '-87.836723',
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
                      src="https://upload.wikimedia.org/wikipedia/commons/1/10/Newport_Whitepit_Lane_pot_hole.JPG"
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
          <Container>
            <br />
            <Header as="h2">Comments</Header>
            <SinglePotholeComments
              potholeId={this.props.pothole.id}
              style={{ margin: '0 1rem' }}
            />
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

const WrappedContainer = GoogleApiWrapper({
  apiKey: accessToken,
})(SinglePothole);

export default connect(
  mapToProps,
  mapDispatch
)(WrappedContainer);
