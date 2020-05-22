
import React, { useState, Suspense, useRef } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Alert,
  CardTitle
} from 'reactstrap';
import axios from 'axios';
import anime from 'animejs';
import { useEffectOnce, useMeasure } from 'react-use';

import { ScaleGraph } from './ScaleGraph';
import { CHHATTISGARH, STATE_CODES, MAP_META } from '../../core/constants';
import { parseStateTimeseries } from '../../core/common';
import { Level } from './Level';
import Minigraph from './Minigraph/Minigraph';
import MapExplorer from './MapExplorer/MapExplorer';
import { Fab } from '@material-ui/core';
import { Share } from '@material-ui/icons';
import { openSharingTray } from '../../core/share';
import { Link } from 'react-router-dom';
import './Dashboard.scss';

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const Dashboard = (props) => {
  const mapRef = useRef();

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState({});
  const [stateData, setStateData] = useState({});
  const [testData, setTestData] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [stateName] = useState(STATE_CODES['CT']);
  const [mapOption, setMapOption] = useState('confirmed');

  const [{ width }] = useMeasure();

  useEffectOnce(() => {
    getState(CHHATTISGARH);
    window.FB.XFBML.parse(document.getElementById('fbLikeBtn'));
    window.twttr.widgets.createFollowButton(
      "CGCoronaUpdate",
      document.getElementById("twitterFollowBtn"),
      {
        showScreenName: "false",
        showCount: true,
        size: "large"
      }
    );
  });

  const getState = async (code) => {
    try {
      const [
        { data: dataResponse },
        { data: stateDistrictWiseResponse },
        { data: statesDailyResponse },
        { data: stateTestResponse }
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/states_daily.json'),
        axios.get('https://api.covid19india.org/state_test_data.json'),
      ]);
      const states = dataResponse.statewise;
      const ts = parseStateTimeseries(statesDailyResponse)[code];
      const statesTests = stateTestResponse.states_tested_data;
      const name = STATE_CODES[code];

      setStateData(states.find((s) => s.statecode === code));
      setTimeseries(ts);
      setTestData(
        statesTests.filter(
          (obj) => obj.state === name && obj.totaltested !== ''
        )
      );
      setDistrictData({
        [name]: stateDistrictWiseResponse[name],
      });
      // setSources(sourceList.filter((state) => state.statecode === code));
      setFetched(true);

      anime({
        targets: '.highlight',
        duration: 200,
        delay: 3000,
        translateX:
          mapOption === 'confirmed'
            ? `${width * 0}px`
            : mapOption === 'active'
              ? `${width * 0.25}px`
              : mapOption === 'recovered'
                ? `${width * 0.5}px`
                : mapOption === 'deceased'
                  ? `${width * 0.75}px`
                  : '0px',
        easing: 'spring(1, 80, 90, 10)',
        opacity: 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  const { localization } = props;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Alert color='secondary'>
            <Link to="/migrant-details" className="alert-link">
              Click here to know migrant details
            </Link>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col lg={10}>
          <Row>
            <Col>
              <Card>
                <CardBody style={{ paddingBottom: 5 }}>
                  <div>
                    <Suspense fallback={loading()}>
                      <ScaleGraph localization={{ ...localization.common, ...localization.covid }} />
                    </Suspense>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <Card>
                <CardBody>
                  {fetched && <Level
                    localization={{ ...localization.common, ...localization.covid }}
                    onSetMapOption={setMapOption}
                    data={stateData} />}
                  {fetched && <Minigraph
                    timeseries={timeseries} />}
                  {fetched && <>
                    {
                      <MapExplorer
                        localization={{ ...localization.common, ...localization.covid }}
                        forwardRef={mapRef}
                        mapMeta={MAP_META[stateName]}
                        states={[stateData]}
                        stateDistrictWiseData={districtData}
                        stateTestData={testData}
                        isCountryLoaded={false}
                        mapOptionProp={mapOption}
                      />
                    }
                  </>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={2}>
          <Row>
            <Col>
              <Card>
                <CardBody style={{ paddingBottom: 5 }}>
                  <div>
                    <CardTitle>Follow us on Social Media</CardTitle>
                    <div className="fb_container" id="fbLikeBtn">
                      <div className="fb-like"
                        data-href="https://www.facebook.com/CGCoronaUpdate"
                        data-width=""
                        data-layout="button_count"
                        data-action="like"
                        data-size="large"
                        data-share="true"
                      ></div>
                    </div>
                    <div id="twitterFollowBtn">
                    </div>
                    <br />
                    <a
                      href='https://www.instagram.com/cgcoronaupdate/'
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="https://cdn-wp.weshareapps.com/wp-content/uploads/2017/06/24214610/instagram-app.png"
                        alt='Follow on instagram' width="32"
                      />
                    </a>
                    <br />
                    <hr />
                    <div>
                      <blockquote>
                        CG Corona Update is a crowd sourced platform created voluntarily by people of Chhattisgarh for creating largest database of Chhattisgarh on Corona Virus for the common people. Anyone can use the information for making firm opinion, perception and decisions.
                      </blockquote>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>


      <Fab onClick={(event) => openSharingTray()} color="primary" aria-label="add" style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
        <Share />
      </Fab>

    </div>
  );
}

export default Dashboard;
