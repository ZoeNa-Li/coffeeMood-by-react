require('normalize.css/normalize.css');
require('styles/coffeeIndex.scss');

import React from 'react';
import FriendLists from './FriendLists'

var ImgDatas = require('./coffee.json');

 function getImgURL(imageDataArr)  {
for(let i=0; i < imageDataArr.length; i++){
  let singleImageData = imageDataArr[i];
      singleImageData.imageURL = require('./images/'+singleImageData.filename);
      imageDataArr[i] = singleImageData;
}
return imageDataArr;
}

ImgDatas = getImgURL(ImgDatas);


class AppComponent extends React.Component {

  constructor(props) {
    super(props);
       this.state = {
           index: 0,
      }
    }

   componentDidMount() {
    this.Timer = setInterval(()=>{
        var index = this.state.index;
        if(index < ImgDatas.length - 1){
                index++;
        }else{
          index = 0;
        }
         this.setState({
           index: index
        });
    },3000);
    }

    componentWillUnmount(){
    clearInterval(this.Timer);
    }


  render() {
    var TimerScroll = [];
    var ImgLists = [];

     TimerScroll = <div>
      <img src={ImgDatas[this.state.index].imageURL} className="scroll-img" />
      <p>{ImgDatas[this.state.index].desc}</p>
     </div> ;
      ImgDatas.forEach((value,index) => {
        let briefOfCoffee = value.desc.slice(0,30);
        var listClass="";
        if(index == this.state.index){
         listClass = "pre-list list-unit";
        }else{
          listClass = "other-list list-unit";
        }
        ImgLists.push(<li className = {listClass}
        onClick = {() => {
          clearInterval(this.Timer);
          this.setState({
           index: index
        });
        this.Timer = setInterval((e)=>{
        var index = this.state.index;
        if(index < ImgDatas.length - 1){
                index++;
        }else{
          index = 0;
        }
         this.setState({
           index: index
        });
    },3000);
        }}>
        <img src={value.imageURL} className="img-list"/>
        <p className="topright-p">{briefOfCoffee}...</p>
        </li>)
      });


    return (
       <div className = "top">
          <section className = "top-left scroll-img">
             {TimerScroll}
           </section>
            <section className = "top-right scroll-list">
              <ul>
            {ImgLists}
            </ul>
           </section>
           <section className = "index-log">
           <span>欢迎加入我们>>></span>
           <ul  className="index-reg">登录:</ul>
           <ul>
              <li className="login-list">账号：<input type="text" /></li>
              <li className="login-list">密码：<input type="password" className="index-password" />
               <input type="button" className="login-btn" value="登录" />
              </li>
           </ul>
           </section>

           <FriendLists />

       </div>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
