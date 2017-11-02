/* eslint default-case: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuOption from '../MenuOption/MenuOption';
import { KEY_LEFT, KEY_UP, KEY_DOWN } from '../../utils/keys';

class Menu extends Component {
  componentDidMount() {
    this.setFocusOnMenuOption(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocusMenu && nextProps.isFocusMenu !== this.props.isFocusMenu) {
      this.setFocusOnMenuOption(nextProps);
    }
    if (nextProps.isShow !== this.props.isShow) {
      this.showAppearAnimation = nextProps.isShow;
    }
  }

  setFocusOnMenuOption = props => {
    const selectedOptionIndex = this.props.menuOptions.indexOf(props.selectedOption);
    ReactDOM.findDOMNode(this[`menuOptionBtn${selectedOptionIndex || 0}`]).focus();
  }

  handleKeyNavigation = (event, index) => {
    switch (event.keyCode) {
      case KEY_LEFT:
        this.props.focusBackBtn();
        break;
      case KEY_DOWN:
        if (index < this.props.menuOptions.length - 1) ReactDOM.findDOMNode(this[`menuOptionBtn${index + 1}`]).focus();
        break;
      case KEY_UP:
        if (index > 0) ReactDOM.findDOMNode(this[`menuOptionBtn${index - 1}`]).focus();
        break;
    }
  }

  render() {
    return (
      <div className={`nav-hidden ${this.props.isShow ? '' : 'hide-menu'}${this.showAppearAnimation ? 'show-menu' : ''}`}>
        <div className="nav-hidden__holder">
          <span className="nav-hidden-title">Catalogue</span>
          <div id="jsNavList" className="nav-hidden-list">
            {this.props.menuOptions.map((option, index) => (
              <MenuOption
                handeOptionSelect={this.props.handeOptionSelect}
                onOptionFocus={this.props.onOptionFocus}
                key={option}
                onKeyDown={event => { this.handleKeyNavigation(event, index); }}
                option={option}
                ref={node => { this[`menuOptionBtn${index}`] = node; }}
                selectedOption={this.props.selectedOption}
              />))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
