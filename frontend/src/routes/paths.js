const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
  };
  
  // ----------------------------------------------------------------------
  
  export const paths = {
    minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
    // MAIN
    main: {
      settings: '/settings',
    },
    // AUTH
    auth: {
      firebase: {
        login: `${ROOTS.AUTH}/login`,
        register: `${ROOTS.AUTH}/register`,
      },
      jwt: {
        login: `${ROOTS.AUTH}/jwt/login`,
        register: `${ROOTS.AUTH}/jwt/register`,
      },
    },
    // DASHBOARD
    dashboard: {
      root: ROOTS.DASHBOARD,
      one: `${ROOTS.DASHBOARD}/one`,
      two: `${ROOTS.DASHBOARD}/two`,
      three: `${ROOTS.DASHBOARD}/three`,
      group: {
        root: `${ROOTS.DASHBOARD}/group`,
        five: `${ROOTS.DASHBOARD}/group/five`,
        six: `${ROOTS.DASHBOARD}/group/six`,
      },
    },
  };
  