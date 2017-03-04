import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory,IndexRoute} from 'react-router';
import RouteApp from './components/RouteApp';
import CoffeIndex from './components/CoffeIndex';
import ImgEditor from './components/ImgEditor';
import About from './components/About';


// Render the main component into the dom
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={RouteApp}>
      <IndexRoute component={CoffeIndex}/>
      <Route path="/brief" component={CoffeIndex}/>
      <Route path="/imgeditor" component={ImgEditor}/>
      <Route path="/about" component={About}/>

    </Route>
  </Router>
), document.getElementById('app'));
