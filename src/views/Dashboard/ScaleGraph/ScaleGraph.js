import React, { Component } from 'react';
import axios from 'axios';
import { parseStateTimeseries } from '../../../core/common';
import { CHHATTISGARH } from '../../../core/constants';
import { TimeSeries } from '../../Charts/TimeSeries';

class ScaleGraph extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {
      timeseries: [],
      graphOption: 1,
      timeseriesMode: true,
      timeseriesLogMode: false
    };
  }
  componentDidMount() {
    axios.get('https://api.covid19india.org/states_daily.json').then(response => {

      const stateData = parseStateTimeseries(response.data);

      this.setState({
        timeseries: stateData[CHHATTISGARH]
      });
    });
  }
  render() {

    const { timeseries, timeseriesLogMode, graphOption, timeseriesMode } = this.state;
    const { localization } = this.props;

    return <>
      {timeseries.length > 0 &&
        <TimeSeries
          localization={localization}
          timeseries={timeseries}
          type={graphOption}
          mode={timeseriesMode}
          logMode={timeseriesLogMode}
        />}
    </>
  }
}

export default ScaleGraph;
