
import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { formatNumber } from '../../../core/common';
import './Level.scss';

function Level(props) {
  const [data, setData] = useState(props.data);

  useEffectOnce(() => {
    setData({
      active: +props.data.active,
      confirmed: +props.data.confirmed,
      recovered: +props.data.recovered,
      deaths: +props.data.deaths,
      deltaconfirmed: +props.data.deltaconfirmed,
      deltadeaths: +props.data.deltadeaths,
      deltarecovered: +props.data.deltarecovered,
    });
  });

  const { localization } = props;

  return (
    <div className="row">
      <div className="col-12">

        <div className="container">

          <div className="Level row">
            <div
              onClick={(event) => {
                props.onSetMapOption('confirmed');
              }}
              className="level-item is-cherry fadeInUp col-6 col-sm-6 col-lg-3"
              style={{ animationDelay: '1s' }}
            >
              <h5>{localization.status.confirmed}</h5>
              <h4>
                [
                {isNaN(data.deltaconfirmed)
                  ? ''
                  : data.deltaconfirmed > 0
                    ? '+' + formatNumber(data.deltaconfirmed)
                    : '+0'}
                ]
              </h4>
              <h1>{formatNumber(data.confirmed)} </h1>
            </div>

            <div
              onClick={(event) => {
                props.onSetMapOption('active');
              }}
              className="level-item is-blue fadeInUp col-6 col-sm-6 col-lg-3"
              style={{ animationDelay: '1.1s' }}
            >
              <h5 className="heading">{localization.status.active}</h5>
              <h4>&nbsp;</h4>
              <h1 className="title has-text-info">{formatNumber(data.active)}</h1>
            </div>

            <div
              onClick={(event) => {
                props.onSetMapOption('recovered');
              }}
              className="level-item is-green fadeInUp col-6 col-sm-6 col-lg-3"
              style={{ animationDelay: '1.2s' }}
            >
              <h5 className="heading">{localization.status.recovered}</h5>
              <h4>
                [
                {isNaN(data.deltarecovered)
                  ? ''
                  : data.deltarecovered > 0
                    ? '+' + formatNumber(data.deltarecovered)
                    : '+0'}
                ]
              </h4>
              <h1 className="title has-text-success">
                {formatNumber(data.recovered)}{' '}
              </h1>
            </div>

            <div
              onClick={(event) => {
                props.onSetMapOption('deceased');
              }}
              className="level-item is-gray fadeInUp col-6 col-sm-6 col-lg-3"
              style={{ animationDelay: '1.3s' }}
            >
              <h5 className="heading">{localization.status.deceased}</h5>
              <h4>
                [
                {isNaN(data.deltadeaths)
                  ? ''
                  : data.deltadeaths > 0
                    ? '+' + formatNumber(data.deltadeaths)
                    : '+0'}
                ]
              </h4>
              <h1 className="title has-text-grey">{formatNumber(data.deaths)}</h1>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default React.memo(Level);
