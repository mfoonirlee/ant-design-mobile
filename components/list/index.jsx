import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './index.less';
function noop() {
}

const List = React.createClass({
  propTypes: {
    style: PropTypes.object,
  },
  getDefaultProps() {
    return {

    };
  },
  render() {
    let { className } = this.props;
    const wrapCls = classNames({
      'am-list': true,
      [className]: className
    });

    return (
      <div className={wrapCls} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
});

const Header = React.createClass({
  propTypes: {
    style: PropTypes.object,
  },
  getDefaultProps() {
    return {
    };
  },
  render() {
    let { style, children, className } = this.props;
    const wrapCls = classNames({
      'am-list-header': true,
      [className]: className
    });

    return (
      <div className={wrapCls} style={style}>{children}</div>
    );
  }
});
const Body = React.createClass({
  propTypes: {
    style: PropTypes.object,
  },
  render() {
    let { style, children, className } = this.props;
    const listBodyCls = classNames({
      'am-list-body': true,
      [className]: className
    });
    return (
      <div className={listBodyCls} style={style}>
        {children}
      </div>
    );
  }
});

const Footer = React.createClass({
  propTypes: {
    content: PropTypes.string,
    style: PropTypes.object,
    align: PropTypes.string,
    onClick: PropTypes.func,
  },
  getDefaultProps() {
    return {
      align: 'left',
      onClick: noop,
    };
  },
  _onFooterClick(e) {
    this.props.onClick(e);
  },
  render() {
    let { style, align, children, className } = this.props;
    const wrapCls = classNames({
      'am-list-footer': true,
      'am-ft-right': align === 'right',
      [className]: className
    });
    return (
      <div className={wrapCls} style={style} onClick={this._onFooterClick}>
        {children}
      </div>
    );
  }
});

const Item = React.createClass({
  propTypes: {
    line: PropTypes.number,
    extra: PropTypes.any,
    icon: PropTypes.string,
    thumb: PropTypes.oneOfType([PropTypes.string, React.PropTypes.object, React.PropTypes.node]),
    arrow: PropTypes.string,
    needActive: PropTypes.bool,
    onClick: PropTypes.func,
    error: PropTypes.bool,
    style: PropTypes.object,
    align: PropTypes.string,
  },
  getDefaultProps() {
    return {
      link: '',
      line: 1,
      onClick: noop,
      needActive: true,
      error: false,
      align: 'middle',
    };
  },
  _handleClick(e) {
    this.props.onClick(e);
  },
  _handleTouchStart() {
    if (this.props.needActive) {
      this.refs.listitem.style.backgroundColor = '#d9d9d9';
    }
  },
  _handleTouchEnd() {
    if (this.props.needActive) {
      this.refs.listitem.style.backgroundColor = '#fff';
    }
  },
  render() {
    let { style, thumb, arrow, line, error, children, extra, className, align } = this.props;
    let thumbDom;
    let arrowDom;

    const wrapCls = classNames({
      'am-list-item': true,
      'am-list-item-13': line === 2,
      'am-list-item-error': error,
      'am-list-item-top': align === 'top',
      'am-list-item-middle': align === 'middle',
      'am-list-item-bottom': align === 'bottom',
      [className]: className
    });

    if (thumb) {
      if (typeof(thumb) === 'string') {
        if (line === 1) {
          thumbDom = <div className="am-list-thumb"><img src={thumb} /></div>;
        } else {
          thumbDom = <div className="am-list-thumb"><img src={thumb} /></div>;
        }
      } else {
        thumbDom = <div className="am-list-thumb">{thumb}</div>;
      }
    }

    let extraDom = extra ? <div className="am-list-extra">{extra}</div> : '';

    /* arrow有值，则保留这个dom坑位 */
    if (!!arrow) {
      /* 当值是horizontal时,渲染水平箭头 */
      if (arrow === 'horizontal') {
        arrowDom = (<div className="am-list-arrow"><span className="am-icon am-icon-arrow-horizontal" /></div>);
        /* 当值是vertical时,渲染垂直箭头 */
      } else if (arrow === 'down') {
        arrowDom = (<div className="am-list-arrow"><span className="am-icon am-icon-arrow-vertical" /></div>);
      } else if (arrow === 'up') {
        arrowDom = (<div className="am-list-arrow"><span className="am-icon am-icon-arrow-vertical am-icon-arrow-vertical-up" /></div>);
      } else {
        arrowDom = (<div className="am-list-arrow" />);
      }
    } else {
      arrowDom = null;
    }

    return (
      <div className={wrapCls} style={style} onClick={this._handleClick} onTouchStart={this._handleTouchStart} onTouchEnd={this._handleTouchEnd} onTouchCancel={this._handleTouchEnd} ref="listitem">
        {thumbDom}
        <div className="am-list-content">{children}</div>
        {extraDom}
        {arrowDom}
      </div>
    );
  }
});

List.Header = Header;
List.Body = Body;
List.Footer = Footer;
List.Item = Item;

module.exports = List;
