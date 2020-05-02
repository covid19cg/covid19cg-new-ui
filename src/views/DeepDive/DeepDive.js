import AgeChart from './Charts/agechart';
import AllStatesChart from './Charts/allstates';
import DailyConfirmedChart from './Charts/dailyconfirmedchart';
import GenderChart from './Charts/genderchart';
import GrowthTrendChart from './Charts/growthtrendchart';
import NationalityChart from './Charts/nationalitychart';
import TotalConfirmedChart from './Charts/totalconfirmedchart';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

function DeepDive({ localization }) {
  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        response,
        rawDataResponse,
        stateDailyResponse,
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/raw_data.json'),
        axios.get('https://api.covid19india.org/states_daily.json'),
      ]);
      setTimeseries(response.data.cases_time_series);
      setStatesTimeSeries(stateDailyResponse.data.states_daily);
      setRawData(rawDataResponse.data.raw_data);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const { covid: { deep_dive } } = localization;

  return (
    <div className="cards-container">
      <section className="cards">
        <div className="card fadeInUp" style={{ animationDelay: '0.7s' }}>
          <TotalConfirmedChart title={deep_dive.total_cases} timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: '0.7s' }}>
          <DailyConfirmedChart title={deep_dive.daily_cases} timeseries={timeseries} />
        </div>

        <div
          className="card card-big fadeInUp"
          style={{ animationDelay: '0.7s' }}
        >
          <AllStatesChart
            title={deep_dive.total_cases_by_state}
            data={statesTimeSeries}
          />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: '0.7s' }}>
          <GrowthTrendChart
            title={deep_dive.states_growth_trend}
            data={statesTimeSeries}
          />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: '0.7s' }}>
          <GenderChart title={deep_dive.patient_gender} data={rawData} />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: '0.7s' }}>
          <AgeChart title={deep_dive.patients_by_age} data={rawData} />
        </div>

        <div className="card fadeInUp" style={{ animationDelay: '0.7s' }}>
          <NationalityChart title={deep_dive.patients_by_nationality} data={rawData} />
        </div>
      </section>
    </div>
  );
}

export default DeepDive;
