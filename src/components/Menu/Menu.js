/* eslint default-case: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuOption from '../MenuOption/MenuOption';
import { KEY_LEFT, KEY_UP, KEY_DOWN } from '../../utils/keys';

const menuOptions = [
  { option: 'Featured' },
  { option: 'Recently Added' },
  { option: 'Best of Catch-Up' },
  { option: 'Subscriptions' },
  { option: 'Collections' },
  { option: 'Browse' }
];

class Menu extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.menuOptionBtn0).focus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocusMenu && nextProps.isFocusMenu !== this.props.isFocusMenu) {
      ReactDOM.findDOMNode(this.menuOptionBtn0).focus();
    }
  }

  handleKeyNavigation = (event, index) => {
    switch (event.keyCode) {
      case KEY_LEFT:
        this.props.focusBackBtn();
        break;
      case KEY_DOWN:
        if (index < menuOptions.length - 1) ReactDOM.findDOMNode(this[`menuOptionBtn${index + 1}`]).focus();
        break;
      case KEY_UP:
        if (index > 0) ReactDOM.findDOMNode(this[`menuOptionBtn${index - 1}`]).focus();
        break;
    }
  }

  render() {
    return (
      <div className={`nav-hidden ${this.props.isShow ? '' : 'hide-menu'}`}>
        <div className="nav-hidden__holder">
          <span className="nav-hidden-title">Catalogue</span>
          <div id="jsNavList" className="nav-hidden-list">
            {menuOptions.map((option, index) => (
              <MenuOption
                handeOptionSelect={this.props.handeOptionSelect}
                onOptionFocus={this.props.onOptionFocus}
                key={option.option}
                link={option.link}
                onKeyDown={event => { this.handleKeyNavigation(event, index); }}
                option={option.option}
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
