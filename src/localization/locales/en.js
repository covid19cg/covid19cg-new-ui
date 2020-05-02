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
      emergency_contacts: 'Emergency Contacts',
      reports: 'Reports'
    }
  },
  menus: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      name: 'Emergency Contacts',
      url: '/emergency-contacts',
      icon: 'icon-puzzle',
    },
    {
      name: 'Deep Dive',
      url: '/deep-dive',
      icon: 'icon-drop',
    },
    {
      name: 'Essentials',
      url: '/essentials',
      icon: 'icon-pencil',
    },
    {
      name: 'Reports',
      url: '/reports',
      icon: 'icon-puzzle'
    }
  ],
};
