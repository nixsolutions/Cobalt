/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { KEY_ENTER } from '../../utils/keys';
import { getElementSize } from '../../utils/size';

class MenuViewCollection extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  componentDidMount() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const style = window.getComputedStyle(ReactDOM.findDOMNode(this));
    const { width } = getElementSize(rect, style);
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }

  getTranslateValue = () => {
    return this.props.isShowMenu
      ? 0
      : -((this.props.selectedCollectionIndex * this.state.width) - (this.state.width / 2.5));
  }

  handleKeyDown = event => {
    if (event.keyCode === KEY_ENTER) {
      this.props.setCurrentPage(1);
    } else {
      this.props.onKeyDown && this.props.onKeyDown(event, this.props.index);
    }
  }

  render() {
    return (
      <div
        className="collection -js-goto-innerpage"
        onClick={() => { this.props.setCurrentPage(1); }}
        onKeyDown={this.handleKeyDown}
        role="button"
        style={{ transform: `translateX(${this.getTranslateValue()}px)` }}
        tabIndex="1"
      >
        <div className="collection-back__one" />
        <div className="collection-back__two" />
        <div className={`collection-holder collection-bg${this.props.index + 1}`}>
          <div className="collection-text">
            <span className="collection-title">Collection</span>
            <span className="collection-subtitle">{this.props.name}</span>
          </div>
          <div className="collection-count">
            <div className="collection-count-holder">
              <span className="collection-count__icon" />
              <span className="collection-count__count">{this.props.count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuViewCollection;

