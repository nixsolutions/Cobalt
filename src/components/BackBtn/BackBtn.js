import React, { Component } from 'react';
import { KEY_ENTER } from '../../utils/keys';

class BackBtn extends Component {
  handleKeyDown = event => {
    if (event.keyCode === KEY_ENTER) {
      this.props.setCurrentPage && this.props.setCurrentPage(Number(this.props.pageNum) || 0);
    }
    this.props.onKeyDown && this.props.onKeyDown(event);
  }

  handleClick = () => {
    this.props.setCurrentPage && this.props.setCurrentPage(Number(this.props.pageNum) || 0);
    this.props.onClick && this.props.onClick();
  }

  render() {
    return (
      <div
        className="nav-arrow -js-goto-startpage"
        name="back"
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex="1"
      />
    );
  }
}

export default BackBtn;

