import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import LocalizedStrings from 'react-localization';
import localization from './localization';
import ReportPopup from './views/ReportPopup/ReportPopup';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

const DEFAULT_LOCALE = 'en';
class App extends Component {

  appLocalization = new LocalizedStrings(localization);
  selectedLocale = DEFAULT_LOCALE;
  constructor(props, state) {
    super(props, state);
    this.setLocale();
    this.appLocalization.setLanguage(this.selectedLocale);
    this.state = {
      localization: this.appLocalization,
      selectedLocale: this.selectedLocale
    }
  }

  setLocale() {
    this.selectedLocale = this.getLocale();

  }

  getLocale() {
    const locale = localStorage.getItem('locale');
    if (locale) {
      return locale;
    }

    return DEFAULT_LOCALE;
  }

  changeLanguage(code) {
    if (Object.keys(localization).includes(code)) {
      this.appLocalization.setLanguage(code);
      localStorage.setItem('locale', code);
      this.setState({
        selectedLocale: code
      });
    }
  }

  render() {
    const localizationProps = {
      localization: this.state.localization,
      updateLanguage: this.changeLanguage.bind(this)
    };

    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <ReportPopup />
          <Switch>
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} {...localizationProps} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
