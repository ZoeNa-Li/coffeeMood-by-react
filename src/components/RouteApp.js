require('normalize.css/normalize.css');
require('styles/comment.scss');


import React from 'react';
import {Link} from 'react-router'

class RouteApp extends React.Component {
  render() {
      return (
      <div  className="body-app">
        <div className ="header">
          <ul role="nav"  >
          <li className="li-left" className="header-li"><Link to="/brief" activeStyle={{}}> 简介 </Link> </li>
          <li className="li-left" className="header-li"><Link to="/imgeditor" activeStyle={{}}>图片日志</Link></li>
          <li className="li-right" className="header-li"><Link to="/about" activeStyle={{}}>关于我们</Link></li>
        </ul>
        </div>
        <div className="container" >
        {this.props.children}
        </div>
        <div className="bottom-bar">
        <div className="line">
        <p>私人制作</p>
        </div>
        </div>
      </div>
    )
  }
}

RouteApp.defaultProps = {
};

export default RouteApp;
