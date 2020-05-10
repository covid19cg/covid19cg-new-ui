import React from 'react';
import { Col, Row } from 'reactstrap';

import HomeWidget from './HomeWidget/HomeWidget';

const Home = (props) => {
  return <div className="animated fadeIn">
    <Row>
      <Col xs="12" sm="6" lg="3">
        <HomeWidget header="" mainText="Migrant Details" icon="fa fa-user" color="primary" footer link="#/migrant-details" />
      </Col>
      {/* <Col xs="12" sm="6" lg="3">
        <HomeWidget header="" mainText="Government Updates & Helpline No." icon="fa fa-phone" color="info" footer link="#/government-updates-and-helpline-no" />
      </Col> */}
      <Col xs="12" sm="6" lg="3">
        <HomeWidget header="" mainText="Dashboard" icon="fa fa-bar-chart" color="warning" footer link="#/dashboard" />
      </Col>
      <Col xs="12" sm="6" lg="3">
        <HomeWidget header="" mainText="Reports" icon="fa fa-table" color="danger" link="#/reports" footer />
      </Col>
    </Row>
  </div>
}

export default Home;
