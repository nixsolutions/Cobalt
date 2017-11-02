/* eslint default-case: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Menu from '../components/Menu/Menu';
import BackBtn from '../components/BackBtn/BackBtn';
import Clock from '../components/Clock/Clock';
import MenuViewCollection from '../components/MenuViewCollection/MenuViewCollection';
import { KEY_LEFT, KEY_RIGHT, KEY_ENTER } from '../utils/keys';

const menuOptions = [
  'Featured',
  'Recently Added',
  'Best of Catch-Up',
  'Subscriptions',
  'Collections',
  'Browse'
];

const collections = [
  { name: 'Supperheroes', count: '22' },
  { name: 'Cartoons', count: '33' },
  { name: 'Thrillers', count: '25' }
];

class CataloguePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocusMenu: true,
      isShowMenu: true,
      selectedCollectionIndex: 0,
      selectedOption: menuOptions[0]
    };
  }

  componentDidMount = () => {
    this.props.setCatalogUnmounted(false);
  }

  componentWillUnmount = () => {
    this.props.setCatalogUnmounted(true);
  }

  focusBackBtn = () => {
    ReactDOM.findDOMNode(this.backBtn).focus();
    this.setState({ isFocusMenu: false });
  }

  handleOptionHover = option => {
    this.setState({ selectedOption: option });
  };

  hideMenu = () => {
    this.setState({ isShowMenu: false, isFocusMenu: false });
    if (ReactDOM.findDOMNode(this.collectionBtn0)) {
      ReactDOM.findDOMNode(this.collectionBtn0).focus();
    } else {
      ReactDOM.findDOMNode(this.backBtn).focus();
    }
  };

  showMenu = () => {
    this.setState({ isShowMenu: true, isFocusMenu: true });
  }

  handleBackBtnNavigation = event => {
    switch (event.keyCode) {
      case KEY_ENTER:
        this.showMenu();
        break;
      case KEY_RIGHT:
        if (this.state.isShowMenu) {
          this.setState({ isFocusMenu: true });
        } else if (ReactDOM.findDOMNode(this.collectionBtn0)) {
          ReactDOM.findDOMNode(this.collectionBtn0).focus();
        }
        break;
    }
  }

  handleCollectionNavigation = (event, index) => {
    switch (event.keyCode) {
      case KEY_LEFT:
        if (index === 0) {
          this.showMenu();
        } else {
          ReactDOM.findDOMNode(this[`collectionBtn${index - 1}`]).focus();
          this.setState({ selectedCollectionIndex: index - 1 });
        }
        break;
      case KEY_RIGHT:
        if (index < collections.length - 1) {
          ReactDOM.findDOMNode(this[`collectionBtn${index + 1}`]).focus();
          this.setState({ selectedCollectionIndex: index + 1 });
        }
        break;
    }
  }

  renderSelectedOption = () => {
    switch (this.state.selectedOption) {
      case 'Collections':
        return (
          <div className={`collection-wrapper ${this.state.isShowMenu ? '' : 'push-collection'}`}>
            {collections.map((collection, index) => (
              <MenuViewCollection
                count={collection.count}
                index={index}
                isShowMenu={this.state.isShowMenu}
                key={collection.name}
                name={collection.name}
                ref={node => { this[`collectionBtn${index}`] = node; }}
                onKeyDown={this.handleCollectionNavigation}
                selectedCollectionIndex={this.state.selectedCollectionIndex}
                setCurrentPage={this.props.setCurrentPage}
              />))}
          </div>
        );
      case 'Featured': // hack to force Cobalt re-render similar components
      case 'Best of Catch-Up':
        return (
          <span className="catalogue-wrapper">
            <span className="catalogue-inner-title">
              <span className="nav-inner-title">{this.state.selectedOption}</span>
            </span>
          </span>);
      default:
        return (
          <div className="catalogue-wrapper">
            <div className="catalogue-inner-title">
              <span className="nav-inner-title">{this.state.selectedOption}</span>
            </div>
          </div>);
    }
  }

  render() {
    return this.props.isCollectionUnmounted
      ?
      ([
        <div className="nav-wrapper">
          <div className="nav">
            <BackBtn
              onClick={this.showMenu}
              onKeyDown={this.handleBackBtnNavigation}
              ref={node => { this.backBtn = node; }}
            />
          </div>
          <Menu
            isShow={this.state.isShowMenu}
            focusBackBtn={this.focusBackBtn}
            isFocusMenu={this.state.isFocusMenu}
            menuOptions={menuOptions}
            onOptionFocus={this.handleOptionHover}
            handeOptionSelect={this.hideMenu}
            selectedOption={this.state.selectedOption}
          />
        </div>,
        <div className="wrapper">
          <div className="wrapper__sub" />
          <Clock />
          { this.renderSelectedOption()}
        </div>
      ])
      : null;
  }
}

export default CataloguePage;
