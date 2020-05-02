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
