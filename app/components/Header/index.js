import React from 'react';

import { Link } from 'react-router';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Link to="/sign-up">
          Sign up
        </Link>
      </div>
    );
  }
}

export default Header;