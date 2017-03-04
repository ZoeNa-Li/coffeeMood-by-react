
require('normalize.css/normalize.css');
require('styles/ImgEditor.scss');

import ReactDOM from 'react-dom';
import React from 'react';
import ImgFigure from './Editor/ImgFigure';
import ControllerUnit from './Editor/ControllerUnit';

var imageDatas = require('../data/imageData.json');
var addImgDatas = require('../data/addImgData.json');

/*
*获取image的地址
*/

 function getImgURL(imageDataArr)  {
for(let i=0; i < imageDataArr.length; i++){
  let singleImageData = imageDataArr[i];
      singleImageData.imageURL = require('../images/imgEditor/'+singleImageData.fileName);
      imageDataArr[i] = singleImageData;
}
return imageDataArr;
}
 imageDatas = getImgURL(imageDatas);
 addImgDatas = getImgURL(addImgDatas);

var getRangeRandom = (low, high) => Math.floor(Math.random() * (high - low) + low);


var get30DegRandom = () =>{
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

/*
*默认输出组件
*/
class AppComponent extends React.Component {

   /*state初始化*/
  constructor(props) {
        super(props);
        // 在子类constructor中，super代表父类的constructor.bind(this)。是个函数。
        // 此处相当于React.Component的props传递进入GalleryByReactApp子组件。成为一个属性。

    /*Constant 元素解释*/
    // centerPos: 中心图片位置
    // hPosRange ==>  leftSecX 左侧图片X轴的取值范围  rightSecX 右侧图片X轴的取值范围
    //                y  左侧、右侧图片Y轴的取值范围（它们相同）
    //vPosRange ==>  x 上侧图片X轴的取值范围    topY 上侧图片Y轴的取值范围

        this.Constant = {
            centerPos : {
                left : 0,
                right : 0
            },
            hPosRange : {
                leftSecX : [0,0],
                rightSecX : [0,0],
                y : [0,0]
            },
            vPosRange : {
                x : [0,0],
                topY : [0,0]
            }
        };
       // imgsArrangeArr 存储所有图片的位置和状态的向量
        this.state = {
            imgsArrangeArr: [
                // {
                //  pos : {
                //      left : '0',
                //      top : '0'
                //  },
                //  isCenter: true/false,  是否为居中图片
                //   rotate: 0/1,    是否要翻转，居中图片点击后才可以翻转，其余图片点击后居中。
                // }
            ]
        };
    }


    /* rearrange()函数: 重新布局所有图片*/
    rearrange(centerIndex) {
    //获取Constant各参数值
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgSpliceIndex = 0,
        topImgNum = Math.floor(Math.random() * 2),//计算上侧图片的个数 0~1个
                /* 布局居中 centerIndex 的图片 */
        // 居中的 centerIndex 的图片不需要 get30DegRandom(),只有翻转操作
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };

      /*布局上侧图片*/


        // 取出要布局上侧的图片的状态信息向量
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach( (value, index) => {
            imgsArrangeTopArr[index] = {
              pos: {
                  top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                  left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };

        });
        /* 布局左右两侧的图片 */
        //量测的图片状态向量在愿状态向量imgsArrangeArr上操作，因为居中和上侧图片已经被splice了
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;
            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };
        }

    /*将上侧和左右两侧的图片布局状态向量返回原状态向量*/
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
       console.log(this.imgsArrangeArr);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
  }

  /*图片翻转函数*/
 inverse(index) {
        return () => {
            var imgsArrangeArr = this.state.imgsArrangeArr;
            //取反
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr : imgsArrangeArr
            });
        }
    }

  /*居中图片发生变化时，重新布局每个图片的位置*/
   center(index) {
        return () => {
            this.rearrange(index);
        }
    }
/*添加图片*/
addImage(index){

      return () => {
      //  console.log(addImgDatas[index]);
      imageDatas.push(addImgDatas[index]);
      this.rearrange(imageDatas.length-1);
      }
}
/*componentDidMount()函数是React封装的一个函数，在组件渲染完成 已经出现在dom文档里的时候调用，这与组件的生命周期有关*/
  componentDidMount(){
       var stageDOM = ReactDOM.findDOMNode(this.refs.imgstage);
        // scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。
        // clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。
        // offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。
        var stageW = stageDOM.scrollWidth,stageH = stageDOM.scrollHeight;
        // Math.ceil取整

        var halfStageW = Math.ceil(stageW / 2),halfStageH = Math.ceil(stageH / 2);
        // 拿到一个imageFigure的大小,因此我们给ImgFigures的每一项添加ref，分别关联数组key值。

        // 使用findDOMNode()方法获取真实的DOM节点。

        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0);

        var imgW = imgFigureDOM.scrollWidth,imgH = imgFigureDOM.scrollHeight;
        var halfImgW = Math.ceil(imgW / 2),halfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置点,需要在组件渲染完成之后才能计算，因此写在componentDidMount()中。

        this.Constant.centerPos = {
            left : halfStageW - halfImgW,
            top : halfStageH - halfImgH
        }

        // 计算左侧，右侧区域图片排布位置的取值范围，见附图


    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;
      //计算上测区域图片排布的取值范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;

      var num = Math.ceil(Math.random() * 5);

        // num是1到10的整数
        this.rearrange(num);//???第一次出现页面/刷新页面时的居中图片

  }


  render() {
    var controllerUnits = [];
    var ImgFigures = [];
    var AddImages = [];
    var ImgFiguresOrEditors = [];
    imageDatas.forEach((value,index) => {
        if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos : {
                        left : '0',
                        top : '0'
                    },
                    rotate : 0,
                    isInverse : false,
                    isCenter : false
            }
        }
            ImgFigures.push(<ImgFigure data={value} ref={'ImgFigure' + index} index={index} key={index}
                            arrange = {this.state.imgsArrangeArr[index]}
                            inverse={this.inverse(index)} center={this.center(index)}
                            />);
            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
                                           inverse={this.inverse(index)}
                                           center={this.center(index)}/>);
        });

    addImgDatas.forEach((value,index) => {
      AddImages.push(<section className="add-imgDiv"
      onClick = { this.addImage(index)}
      >
      <img src= {value.imageURL} className ="unit-img"
      onMouseDown = {(e) => {
        e.target.style.borderColor ='hsla(40, 83%, 49%, 0.54)' }}
      onMouseUp = {(e) => {
         e.target.style.borderColor ='rgba(177, 176, 165, 0.32)' }}
      />
      </section>)
    });


    return (

      <section className='stage' >
        <section className='add-image' >
        <h3>添加图片</h3>
        {AddImages}
         </section>
         <section className='img-sec' ref="imgstage" >
         {ImgFigures}
         </section>
       <nav className='controller-nav' >
         {controllerUnits}
      </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
