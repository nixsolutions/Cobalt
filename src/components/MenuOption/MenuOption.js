/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import { KEY_ENTER, KEY_RIGHT } from '../../utils/keys';

class MenuOption extends Component {
  handleKeyDown = event => {
    if (event.keyCode === KEY_ENTER || event.keyCode === KEY_RIGHT) {
      this.props.handeOptionSelect && this.props.handeOptionSelect();
    } else {
      this.props.onKeyDown && this.props.onKeyDown(event);
    }
  }

  render() {
    const {
      handeOptionSelect,
      onOptionFocus,
      option
    } = this.props;
    return (
      <div
        className="nav-hidden-list__item"
        name="menu_item"
        onClick={handeOptionSelect}
        onFocus={() => { onOptionFocus(option); }}
        onMouseEnter={() => { onOptionFocus(option); }}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex="1"
      >
        <span className="navHiddenItem">
          {option}
        </span>
      </div>
    );
  }
}

export default MenuOption;
