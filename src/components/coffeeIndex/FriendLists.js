require('normalize.css/normalize.css');
require('styles/coffeeIndex.scss');

import React from 'react';

var FriendDatas = require('./friend.json');

 function getImgURL(imageDataArr)  {
for(let i=0; i < imageDataArr.length; i++){
  let singleImageData = imageDataArr[i];
      singleImageData.imageURL = require('./images/'+singleImageData.filename);
      imageDataArr[i] = singleImageData;
}
return imageDataArr;
}

FriendDatas = getImgURL(FriendDatas);

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
       this.state = {
           listTop: 0,
      }
    }

    componentDidMount() {
       this.ListTimer = setInterval(()=>{
        var Top = this.state.listTop;
        var item = [];
        if(Top > -75){
             Top -= 15;
        }
        if(Top == -60){
             item = FriendDatas.shift();
             FriendDatas.push(item);
             console.log(FriendDatas.length);
             Top = 0;
        }
         this.setState({
          listTop: Top
        });
         console.log(Top)
    },1000);

    }
    componentWillUnmount(){
    clearInterval(this.ListTimer);
    }

  render(){
     var  Lists = [];
     var styleObj = {};
     styleObj.top = this.state.listTop;
     FriendDatas.forEach((value,index) => {
      Lists.push(<li className="friend-li">
        <img src={value.imageURL} className="friend-img"/>
        <div className="friend-brief">
         <span className="friend-name">{value.name}</span>
         <p className="friend-qianming">{value.desc}</p>
        </div>
      </li>);
    });
      return(
        <div>
          <section  className="friend">
           <h4 className="title-s friend-title">咖啡好友</h4>
           <div className="friend-list">
           <ul className="friend-ul" ref="friendlist" style = {styleObj}>{Lists}</ul>
           </div>
           </section>
        </div>
        )
         }
  }


AppComponent.defaultProps = {};

export default AppComponent;
