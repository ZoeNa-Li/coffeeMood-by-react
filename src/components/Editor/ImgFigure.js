require('normalize.css/normalize.css');
require('styles/ImgEditor.scss');

import React from 'react';

class ImgFigure extends React.Component {



constructor(props) {
    super(props);
       this.state = {
           editorContent: "请留下你的心情😊",
      }
    }
 componentWillMount(){


  }

  render() {
  var ImgFigureOrEditor = [];
  var styleObj = {};

    if (this.props.arrange.pos) {
            styleObj =  this.props.arrange.pos;
        }
    if (this.props.arrange.rotate) {
      (['Moz', 'Ms', 'Webkit', '']).forEach((value) => {
        styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      })
    }
      if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }
       if (this.props.arrange.isCenter && this.props.arrange.isInverse ) {
           ImgFigureOrEditor =<div className = "back-editor" >
            <textarea ref="Textarea" cols={28} rows={6}  defaultValue = {this.state.editorContent} className = "TextContent"
             onChange = {(e) => {
               this.setState({
            editorContent: e.target.value
        });
             }}></textarea>
            <button type="button" className = "btn-save" onClick = {() => {}}>保存</button>
            <button type="button" className = "btn-invase"
             onClick = {this.props.inverse}>翻转</button>
           </div>

        } else{
           ImgFigureOrEditor = <div className ="img-box"
               onClick = {(e) =>{
                    if (this.props.arrange.isCenter) {
                        this.props.inverse();
                    }
                    else {
                        this.props.center();
                    }
                    e.stopPropagation();
                    e.preventDefault();}}>
                  <img className="img-s" src={this.props.data.imageURL} alt={this.props.data.title} />
                    </div>;
        }

  var imgFigureClassName = 'img-figure';
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse ' : '';
  var imgTitleClassName = 'img-title';
      imgTitleClassName += this.props.arrange.isInverse ? ' is-inverse ' : '';

    return (
      <div className = {imgFigureClassName}  style = {styleObj}>
                    {ImgFigureOrEditor}
                    <figcaption >
                        <h2 className= {imgTitleClassName} >第{this.props.index+1}张图</h2>
                    </figcaption>
        </div>
    );
  }
}

ImgFigure.defaultProps = {
};

export default ImgFigure;
