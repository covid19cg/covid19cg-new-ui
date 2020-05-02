export default {
  common: {
    beginning: 'शुरुआत',
    month: 'महीना',
    weeks: 'सप्ताह',
    states: {
      chhattisgarh: 'छत्तीसगढ़'
    },
    months: {
      january: 'जनवरी',
      february: 'फरवरी',
      march: 'मार्च',
      april: 'अप्रैल',
      may: 'मई',
      june: 'जून',
      july: 'जुलाई',
      august: 'अगस्त',
      september: 'सितंबर',
      october: 'अक्टूबर',
      november: 'नवंबर',
      december: 'दिसंबर'
    },
    day: {
      yesterday: 'कल'
    }
  },
  covid: {
    status: {
      confirmed: 'पुष्टीकृत',
      active: 'सक्रिय',
      recovered: 'स्वस्थ',
      deceased: 'मृतक',
      tested: 'परीक्षण किया'
    },
    deep_dive: {
      total_cases: 'कुल मामले',
      daily_cases: 'दैनिक मामले',
      total_cases_by_state: 'राज्य द्वारा कुल मामले',
      states_growth_trend: 'राज्य - विकास की प्रवृत्ति',
      patient_gender: 'रोगी लिंग',
      patients_by_age: 'उम्र के हिसाब से मरीज',
      patients_by_nationality: 'राष्ट्रीयता के मरीज'
    }
  },
  breadcrumb: {
    home: 'होम',
    dashboard: 'डैशबोर्ड'
  },
  header: {
    menus: {
      dashboard: 'डैशबोर्ड',
      emergency_contacts: 'आपातकालीन संपर्क',
      reports: 'रिपोर्ट'
    }
  },
  menus: [
    {
      name: 'होम',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      name: 'आपातकालीन संपर्क',
      url: '/emergency-contacts',
      icon: 'icon-puzzle',
    },
    {
      name: 'विस्तृत विश्लेषण',
      url: '/deep-dive',
      icon: 'icon-drop',
    },
    {
      name: 'आवश्यक जानकारी',
      url: '/essentials',
      icon: 'icon-pencil',
    },
    {
      name: 'रिपोर्ट',
      url: '/reports',
      icon: 'icon-puzzle'
    }
  ]
};
