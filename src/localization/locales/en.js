export default {
  common: {
    beginning: 'Beginning',
    month: 'Months',
    weeks: 'Weeks',
    states: {
      chhattisgarh: 'Chhattisgarh'
    },
    months: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December'
    },
    day: {
      yesterday: 'Yesterday'
    }
  },
  covid: {
    status: {
      confirmed: 'Confirmed',
      active: 'Active',
      recovered: 'Recovered',
      deceased: 'Deceased',
      tested: 'Tested'
    },
    deep_dive: {
      total_cases: 'Total Cases',
      daily_cases: 'Daily Cases',
      total_cases_by_state: 'Total Cases By State',
      states_growth_trend: 'States - Growth Trend',
      patient_gender: 'Patient Gender',
      patients_by_age: 'Patients By Age',
      patients_by_nationality: 'Patients By Nationality'
    }
  },
  breadcrumb: {
    home: 'Home',
    dashboard: 'Dashboard'
  },
  header: {
    menus: {
      dashboard: 'Dashboard',
      essentials: 'Essentials',
      reports: 'Reports'
    }
  },
  menus: [
    {
      name: 'Home',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Migrant Information',
      url: '/migrant-details',
      icon: 'icon-user'
    },
    {
      name: 'Essentials',
      url: '/essentials',
      icon: 'icon-pencil',
     /*  attributes: {
        onClick: e => {
          ReactGA.event({
            category: "Essentials",
            action: "User visited Essentials page",
          });
        }
      } */
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'icon-puzzle'
    }
  ],
};
