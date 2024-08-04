import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Millen Mark | Super Store </title>
      </Helmet>

      <AppView />
    </>
  );
}
