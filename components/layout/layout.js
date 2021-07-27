import { Fragment } from 'react';

import Navbar from './navbar';

function Layout(props) {
  return (
    <Fragment >
      <Navbar />
      <main style={{ background: '#D5DBDB',}}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
