import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom'

const PotholeRow = props => {
  const pothole = props.pothole;
  const formattedDate = moment(pothole.createdAt).format('dddd MMMM D Y');
  const [day, month, dayNumber, year] = formattedDate.split(' ');
  const date = [month, ' ', dayNumber, ', ', year].join('');

  return (
    <Table.Row>
      <Table.Cell selectable><Link to={`/potholes/${pothole.id}`}>{pothole.serviceNumber}</Link></Table.Cell>
      <Table.Cell>{pothole.status}</Table.Cell>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>{pothole.mostRecentAction || 'No Recent Actions'}</Table.Cell>
      <Table.Cell>{pothole.ward}</Table.Cell>
      <Table.Cell>
        {pothole.zip}
      </Table.Cell>
    </Table.Row>
  );
};

export default PotholeRow
