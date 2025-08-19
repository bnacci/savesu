import { CookiesProvider, useCookies } from 'react-cookie';
import React, { ReactNode, useEffect } from 'react';

import moment from 'moment-timezone';

interface CookieValues {
  timezone?: string;
}

function CookieProvider({ children }: { children: ReactNode }) {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      {children}
    </CookiesProvider>
  );
}

function Provider({ children }: { children: ReactNode }) {
  return <CookieProvider>{children}</CookieProvider>;
}

function App({ children }: { children: ReactNode }) {
  const [cookies, setCookie] = useCookies<'timezone', CookieValues>([
    'timezone',
  ]);

  useEffect(() => {
    if (!cookies.timezone) {
      setCookie('timezone', btoa(moment.tz.guess()));
    }
  }, []);

  return children;
}

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <App>{children}</App>
    </Provider>
  );
}
