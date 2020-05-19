import React, { useState, Suspense } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import WorkIcon from '@material-ui/icons/Work';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import axios from 'axios';
import './Migrants.scss';

import Widget02 from '../Widgets/Widget02';
import { useEffectOnce } from 'react-use';

const Migrants = (props) => {

  const [data, setData] = useState(null);

  useEffectOnce(() => {
    (async () => {
      const { data } = await axios.get('/assets/migrants/migrants.json');
      setData(data);
    })();
  });

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  return <div>
    <Suspense fallback={loading()}>
      {data && (
        <>
          <Row>
            <Col xs="12">
              <Alert color="secondary">
                <a href="https://epass.cgcovid19.in/" target="_blank" rel="noopener noreferrer" className="alert-link">Apply for Interstate Movement Pass</a>
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6" lg="3">
              <Widget02 mainText="No. of Enquiries Today" icon="fa fa-phone" color="primary" header={'' + data.no_of_migrants_today}></Widget02>
              <Widget02 mainText="Total no. of migrants" icon="fa fa-user" color="info" header={'' + data.total_no_of_migrants}></Widget02>
              <Widget02 mainText="Migrants reached Chhattisgarh today with our assistance" icon="fa fa-user" color="warning" header={'' + data.migrants_helped_with_our_assistance}></Widget02>
            </Col>
            {data.media && data.media.length > 0 &&
              <Col xs="12" sm="6" lg="6">
                <VerticalTimeline layout={'1-column'}>
                  {data.media.map((mediaValue, key) => <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={mediaValue.date}
                    key={key}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<WorkIcon />}
                  >
                    <h3 className="vertical-timeline-element-title">{mediaValue.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{mediaValue.subtitle}</h4>
                    <p>
                      {mediaValue.description}
                    </p>

                    <div>
                      {mediaValue.image &&
                        <a href={mediaValue.link || mediaValue.image} target="_blank" rel="noopener noreferrer">
                          <img className="img-fluid" src={mediaValue.image} alt="Migrant Information" />
                        </a>
                      }
                    </div>

                  </VerticalTimelineElement>
                  )}
                </VerticalTimeline>
              </Col>
            }
            <Col xs="12" sm="6" lg="3">
              <Widget02 mainText="Migrant Registration" icon="fa fa-user" color="primary" newTab footer link="http://www.cglabour.nic.in/covid19MigrantRegistrationService.aspx" header={''}></Widget02>
            </Col>

          </Row>
        </>
      )
      }
    </Suspense>
  </div>
}

export default Migrants;
