
require('normalize.css/normalize.css');
require('styles/coffeeIndex.scss');

import React from 'react';

var infoDatas = require('./think.json');

function getImgURL(imageDataArr)  {
for(let i=0; i < imageDataArr.length; i++){
  let singleImageData = imageDataArr[i];
      singleImageData.imageURL = require('./images/'+singleImageData.filename);
      imageDataArr[i] = singleImageData;
}
return imageDataArr;
}

infoDatas = getImgURL(infoDatas);


class AppComponent extends React.Component {
render() {
   var ThinkLists = [];
   infoDatas.forEach((value,index) => {
    ThinkLists.push(<li key={index} className = "think-li">
      <img className="think-img" src= {value.imageURL}/>
      <p className="think-p">{value.content}</p>
      </li>);
   });

    return (
       <div className="coffee-think">
          <h3 className="title-s"> Coffee印象</h3>
          <ul>
     {ThinkLists}
          </ul>
       </div>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
