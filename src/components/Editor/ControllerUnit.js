require('normalize.css/normalize.css');
require('styles/ImgEditor.scss');

import React from 'react';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        // 要把this绑定到handleClick()函数上
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.arrange.isCenter) {
            this.props.inverse();
        }
        else {
            this.props.center();
        }
    }

    render() {

        var controllerUnitClassName = 'controller-unit';
        //如果对应的是居中的图片，显示控制按钮的居中态

        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center ';
            //如果翻转显示翻转状态
            if (this.props.arrange.isInverse) {
                controllerUnitClassName += 'is-inverse'
            }
        }
        return (
            <span className={ controllerUnitClassName } onClick={this.handleClick}></span>
        )
    }
}
AppComponent.defaultProps = {
};

export default AppComponent;
