import { formatDistance, format, parse } from 'date-fns';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Icon from 'react-feather';
import { useLocalStorage } from 'react-use';

import ChoroplethMap from './choropleth';
import { formatNumber, formatDate } from '../../../core/common';
import { MAP_TYPES, MAP_META } from '../../../core/constants';

const getRegionFromState = (state) => {
  if (!state) return;
  const region = { ...state };
  if (!region.name) region.name = region.state;
  return region;
};

const getRegionFromDistrict = (districtData, name) => {
  if (!districtData) return;
  const region = { ...districtData };
  if (!region.name) region.name = name;
  return region;
};

function MapExplorer({
  mapMeta,
  states,
  stateDistrictWiseData,
  stateTestData,
  regionHighlighted,
  onMapHighlightChange,
  isCountryLoaded,
  anchor,
  localization,
  mapOptionProp,
}) {
  const [selectedRegion, setSelectedRegion] = useState({});
  const [panelRegion, setPanelRegion] = useState(getRegionFromState(states[0]));
  const [currentHoveredRegion, setCurrentHoveredRegion] = useState(
    getRegionFromState(states[0])
  );
  const [testObj, setTestObj] = useState({});
  const [currentMap, setCurrentMap] = useState(mapMeta);
  const [mapOption, setMapOption] = useLocalStorage('mapOption', 'active');
  const [statistic, currentMapData] = useMemo(() => {
    const dataTypes = ['confirmed', 'active', 'recovered', 'deceased'];
    const statistic = dataTypes.reduce((acc, dtype) => {
      acc[dtype] = { total: 0, max: 0 };
      return acc;
    }, {});
    let currentMapData = {};

    if (currentMap.mapType === MAP_TYPES.COUNTRY) {
      currentMapData = states.reduce((acc, state) => {
        if (state.state === 'Total') {
          return acc;
        }
        acc[state.state] = {};
        dataTypes.forEach((dtype) => {
          const typeCount = parseInt(
            state[dtype !== 'deceased' ? dtype : 'deaths']
          );
          statistic[dtype].total += typeCount;
          if (typeCount > statistic[dtype].max) {
            statistic[dtype].max = typeCount;
          }
          acc[state.state][dtype] = typeCount;
        });
        return acc;
      }, {});
    } else if (currentMap.mapType === MAP_TYPES.STATE) {
      const districtWiseData = (
        stateDistrictWiseData[currentMap.name] || { districtData: {} }
      ).districtData;
      currentMapData = Object.keys(districtWiseData).reduce((acc, district) => {
        acc[district] = {};
        dataTypes.forEach((dtype) => {
          const typeCount = parseInt(districtWiseData[district][dtype]);
          statistic[dtype].total += typeCount;
          if (typeCount > statistic[dtype].max) {
            statistic[dtype].max = typeCount;
          }
          acc[district][dtype] = typeCount;
        });
        return acc;
      }, {});
    }
    return [statistic, currentMapData];
  }, [currentMap, states, stateDistrictWiseData]);

  const setHoveredRegion = useCallback(
    (name, currentMap) => {
      if (currentMap.mapType === MAP_TYPES.COUNTRY) {
        const region = getRegionFromState(
          states.find((state) => name === state.state)
        );
        setCurrentHoveredRegion(region);
        setPanelRegion(region);
        onMapHighlightChange(region);
      } else if (currentMap.mapType === MAP_TYPES.STATE) {
        const state = stateDistrictWiseData[currentMap.name] || {
          districtData: {},
        };
        let districtData = state.districtData[name];
        if (!districtData) {
          districtData = {
            confirmed: 0,
            active: 0,
            recovered: 0,
            deaths: 0,
          };
        }
        const currentHoveredRegion = getRegionFromDistrict(districtData, name);
        const panelRegion = getRegionFromState(
          states.find((state) => currentMap.name === state.state)
        );
        setPanelRegion(panelRegion);
        currentHoveredRegion.statecode = panelRegion.statecode;
        setCurrentHoveredRegion(currentHoveredRegion);
        panelRegion.districtName = currentHoveredRegion.name;
        if (onMapHighlightChange) onMapHighlightChange(panelRegion);
      }
    },
    [states, stateDistrictWiseData, onMapHighlightChange]
  );

  useEffect(() => {
    if (mapOptionProp) setMapOption(mapOptionProp);
  }, [mapOptionProp, setMapOption]);

  useEffect(() => {
    if (regionHighlighted === undefined || regionHighlighted === null) return;

    const isState = !('district' in regionHighlighted);
    if (isState) {
      const newMap = MAP_META['India'];
      setCurrentMap(newMap);
      const region = getRegionFromState(regionHighlighted.state);
      setHoveredRegion(region.name, newMap);
      setSelectedRegion(region.name);
    } else {
      const newMap = MAP_META[regionHighlighted.state.state];
      if (!newMap) {
        return;
      }
      setCurrentMap(newMap);
      setHoveredRegion(regionHighlighted.district, newMap);
      setSelectedRegion(regionHighlighted.district);
    }
  }, [regionHighlighted, setHoveredRegion]);

  const switchMapToState = useCallback(
    (name) => {
      const newMap = MAP_META[name];
      if (!newMap) {
        return;
      }
      setCurrentMap(newMap);
      setSelectedRegion(null);
      if (newMap.mapType === MAP_TYPES.COUNTRY) {
        setHoveredRegion(states[0].state, newMap);
      } else if (newMap.mapType === MAP_TYPES.STATE) {
        const { districtData } = stateDistrictWiseData[name] || {
          districtData: {},
        };
        const topDistrict = Object.keys(districtData)
          .filter((name) => name !== 'Unknown')
          .sort((a, b) => {
            return districtData[b].confirmed - districtData[a].confirmed;
          })[0];
        setHoveredRegion(topDistrict, newMap);
        setSelectedRegion(topDistrict);
      }
    },
    [setHoveredRegion, stateDistrictWiseData, states]
  );

  useEffect(() => {
    setTestObj(
      stateTestData[stateTestData.length - 1]
    );
  }, [panelRegion, stateTestData, testObj]);

  return (
    <div
      className={`MapExplorer fadeInUp ${
        anchor === 'mapexplorer' ? 'stickied' : ''
        }`}
      style={{
        animationDelay: '1.5s',
        display: anchor === 'timeseries' ? 'none' : '',
      }}
    >
      <div className="map-stats mt-2" style={{ marginBottom: '2rem' }}>
        <div
          className="stats is-purple tested fadeInUp"
          style={{ animationDelay: '2.4s' }}
        >
          <h5>{localization.status.tested}</h5>
          <div className="stats-bottom">
            <h1>{formatNumber(testObj?.totaltested)}</h1>
          </div>
          <h6 className="timestamp">
            {!isNaN(parse(testObj?.updatedon, 'dd/MM/yyyy', new Date()))
              ? `As of ${format(
                parse(testObj?.updatedon, 'dd/MM/yyyy', new Date()),
                'dd MMM'
              )}`
              : ''}
          </h6>
          {testObj?.totaltested?.length > 1 && (
            <a href={testObj.source} target="_noblank">
              <Icon.Link />
            </a>
          )}
        </div>
      </div>

      <div className="meta fadeInUp" style={{ animationDelay: '2.4s' }}>
        <h2 className={`${mapOption !== 'confirmed' ? mapOption : ''}`}>
          {currentHoveredRegion.name}
        </h2>
        {currentHoveredRegion.lastupdatedtime && (
          <div className="last-update">
            <h6>Last updated</h6>
            <h3>
              {isNaN(
                Date.parse(formatDate(currentHoveredRegion.lastupdatedtime))
              )
                ? ''
                : formatDistance(
                  new Date(formatDate(currentHoveredRegion.lastupdatedtime)),
                  new Date()
                ) + ' ago'}
            </h3>
          </div>
        )}

        {currentMap.mapType === MAP_TYPES.STATE &&
          currentHoveredRegion.name !== currentMap.name ? (
            <h1
              className={`district ${mapOption !== 'confirmed' ? mapOption : ''}`}
            >
              {currentMapData[currentHoveredRegion.name]
                ? currentMapData[currentHoveredRegion.name][mapOption]
                : 0}
              <br />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                {mapOption}
              </span>
            </h1>
          ) : null}

        {currentMap.mapType === MAP_TYPES.STATE &&
          currentMapData.Unknown &&
          currentMapData.Unknown[mapOption] > 0 ? (
            <h4 className="unknown">
              Districts unknown for {currentMapData.Unknown[mapOption]} people
            </h4>
          ) : null}
      </div>

      {mapOption && (
        <ChoroplethMap
          statistic={statistic}
          mapMeta={currentMap}
          mapData={currentMapData}
          setHoveredRegion={setHoveredRegion}
          changeMap={switchMapToState}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          isCountryLoaded={isCountryLoaded}
          mapOption={mapOption}
        />
      )}
    </div>
  );
}

export default React.memo(MapExplorer);
