
import React, { lazy, useState, Suspense, useRef } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
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
const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

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

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

const Dashboard = (props) => {
  const mapRef = useRef();

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState({});
  const [graphOption, setGraphOption] = useState(1);
  const [timeseriesMode, setTimeseriesMode] = useState(true);
  const [timeseriesLogMode, setTimeseriesLogMode] = useState(false);
  const [stateData, setStateData] = useState({});
  const [testData, setTestData] = useState({});
  const [sources, setSources] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [stateName] = useState(STATE_CODES['CT']);
  const [mapOption, setMapOption] = useState('confirmed');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [radioSelected, setRadioSelected] = useState(false);

  const [mapSwitcher, { width }] = useMeasure();

  // const toggle = toggle.bind(this);
  // const onRadioBtnClick = onRadioBtnClick.bind(this);

  useEffectOnce(() => {
    getState(CHHATTISGARH);
  });

  const getState = async (code) => {
    try {
      const [
        { data: dataResponse },
        { data: stateDistrictWiseResponse },
        { data: statesDailyResponse },
        { data: stateTestResponse },
        { data: sourcesResponse },
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/states_daily.json'),
        axios.get('https://api.covid19india.org/state_test_data.json'),
        axios.get('https://api.covid19india.org/sources_list.json'),
      ]);
      const states = dataResponse.statewise;
      const ts = parseStateTimeseries(statesDailyResponse)[code];
      const statesTests = stateTestResponse.states_tested_data;
      const name = STATE_CODES[code];
      const sourceList = sourcesResponse.sources_list;

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
      setSources(sourceList.filter((state) => state.statecode === code));
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
        <Col xs={12} sm={6} md={6} lg={6} xl={3}>
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

      <Fab onClick={(event) => openSharingTray()} color="primary" aria-label="add" style={{ position: 'fixed', bottom: '40px', right: '40px' }}>
        <Share />
      </Fab>

    </div>
  );
}

export default Dashboard;
