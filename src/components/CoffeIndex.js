require('normalize.css/normalize.css');
require('styles/coffeeIndex.scss');

import React from 'react';
import IndexTop from './coffeeIndex/IndexTop';
import CoffeeThink from './coffeeIndex/CoffeeThink';
class AppComponent extends React.Component {

  render() {

    return (
       <div >
          <div className="head-text"></div>
          <IndexTop />
          <CoffeeThink />
       </div>


    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
