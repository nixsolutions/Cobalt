/* eslint default-case: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BackBtn from '../components/BackBtn/BackBtn';
import Clock from '../components/Clock/Clock';
import Card from '../components/Card/Card';
import { KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN } from '../utils/keys';
import { getElementSize } from '../utils/size';

const cards = [
  { title: 'New Release', name: 'Alient: Covenant', rating: 7.5, releaseDate: '203/11/24', pic: 1 },
  { title: 'Popular', name: 'Crimson Peak', rating: 7.7, releaseDate: '2010/12/24', pic: 2 },
  { title: 'Most viewed', name: 'Road to perdition', rating: 5.5, releaseDate: '2010/11/14', pic: 3 },
  { title: 'Popular', name: 'SnowWhite', rating: 8.5, releaseDate: '2010/05/09', pic: 4 },
  { title: 'Detective', name: 'Trainwreck', rating: 9.1, releaseDate: '2007/01/30', pic: 5 },
  { title: 'Cartoon', name: 'Star Wars', rating: 6.5, releaseDate: '1995/12/31', pic: 6 },
  { title: 'People like', name: 'Frozen', rating: 8.1, releaseDate: '1998/04/09', pic: 7 },
  { title: 'Detective', name: 'Crimson Peak', rating: 9.0, releaseDate: '2015/03/11', pic: 8 },
  { title: 'People like', name: 'Renegades', rating: 8.4, releaseDate: '2012/04/22', pic: 9 },
  { title: 'Most viewed', name: 'Logan', rating: 6.3, releaseDate: '2013/09/07', pic: 10 },
  { title: 'Detective', name: 'Alien', rating: 7.0, releaseDate: '203/11/24', pic: 1 },
  { title: 'Popular', name: 'Crimson Peak', rating: 3.7, releaseDate: '2016/12/21', pic: 2 },
  { title: 'People like', name: 'Road to perdition', rating: 4.5, releaseDate: '2002/11/14', pic: 3 },
  { title: 'Most viewed', name: 'SnowWhite', rating: 3.5, releaseDate: '1994/05/09', pic: 4 },
  { title: 'Popular', name: 'Trainwreck', rating: 4.1, releaseDate: '1998/01/30', pic: 5 },
];

const sortOptions = [
  { text: 'A-Z', sortBy: 'name' },
  { text: 'Rating', sortBy: 'rating' },
  { text: 'Release Date', sortBy: 'releaseDate' }
];

const CARDS_IN_ROW = 5;

class CollectionPage extends Component {
  constructor(props) {
    super(props);
    this.cardHeight = 0;
    this.isInitialFocusSet = false;
    this.state = {
      activeRow: 0,
      isShowBuyBtn: true,
      isShowSortOptions: false,
      sorting: sortOptions[0].sortBy
    };
  }

  componentDidMount() {
    this.props.setCollectionUnmounted(false);
    this.initialSettings();
  }

  componentDidUpdate = () => {
    this.initialSettings();
  }

  componentWillUnmount = () => {
    this.props.setCollectionUnmounted(true);
  }

  setActiveRow = index => {
    this.setState({ activeRow: Math.floor(index / CARDS_IN_ROW) });
  }

  setSortingCards = sorting => {
    this.setState({ sorting });
  }

  initialSettings = () => {
    if (this.buyBtn && !this.isInitialFocusSet) {
      ReactDOM.findDOMNode(this.buyBtn).focus();
      this.isInitialFocusSet = true;
    }

    if (this.card0 && !this.cardHeight) {
      const rect = ReactDOM.findDOMNode(this.card0).getBoundingClientRect();
      const style = window.getComputedStyle(ReactDOM.findDOMNode(this.card0));
      this.cardHeight = getElementSize(rect, style).height;
    }
  }

  sortItems = (a,b) => (
    a[this.state.sorting] > b[this.state.sorting])
      ? 1
      : ((b[this.state.sorting] > a[this.state.sorting])
        ? -1
        : 0
  );

  hideBuyBtn = () => {
    this.setState({ isShowBuyBtn: false });
    ReactDOM.findDOMNode(this.sortBtn).focus();
  }

  handleBuyBtnKeyDown = event => {
    if (event.keyCode === KEY_ENTER) {
      this.hideBuyBtn();
    } else {
      this.handleKeyNavigation(event);
    }
  }

  handleSortKeyDown = event => {
    if (event.keyCode === KEY_ENTER) {
      this.setState({ isShowSortOptions: !this.state.isShowSortOptions });
    } else {
      this.handleKeyNavigation(event);
    }
  }

  handleSortOptionKeyDown = (event, sortBy, index) => {
    if (event.keyCode === KEY_ENTER) {
      this.setSortingCards(sortBy);
    } else {
      this.handleKeyNavigation(event, index);
    }
  }

  handleKeyNavigation = (event, index) => {
    if (this.buyBtn === document.activeElement) {
      switch (event.keyCode) {
        case KEY_LEFT:
          ReactDOM.findDOMNode(this.backBtn).focus();
          break;
        case KEY_RIGHT:
          ReactDOM.findDOMNode(this.sortBtn).focus();
          break;
        case KEY_DOWN:
          ReactDOM.findDOMNode(this.card0).focus();
          break;
      }
    } else if (event.target.getAttribute('name') === 'back') {
      switch (event.keyCode) {
        case KEY_RIGHT:
          if (ReactDOM.findDOMNode(this.buyBtn)) {
            ReactDOM.findDOMNode(this.buyBtn).focus();
          } else {
            ReactDOM.findDOMNode(this.sortBtn).focus();
          }
          break;
      }
    } else if (this.sortBtn === document.activeElement) {
      switch (event.keyCode) {
        case KEY_LEFT:
          if (ReactDOM.findDOMNode(this.buyBtn)) {
            ReactDOM.findDOMNode(this.buyBtn).focus();
          } else {
            ReactDOM.findDOMNode(this.backBtn).focus();
          }
          break;
        case KEY_DOWN:
          if (this.state.isShowSortOptions) {
            ReactDOM.findDOMNode(this.sortOptionBtn0).focus();
          } else {
            ReactDOM.findDOMNode(this.card4).focus();
          }
          break;
      }
    } else if (event.target.className.includes('sort-card-list__item')) {
      switch (event.keyCode) {
        case KEY_DOWN:
          if (index < sortOptions.length - 1) ReactDOM.findDOMNode(this[`sortOptionBtn${index + 1}`]).focus();
          break;
        case KEY_UP:
          if (index === 0) {
            ReactDOM.findDOMNode(this.sortBtn).focus();
          } else {
            ReactDOM.findDOMNode(this[`sortOptionBtn${index - 1}`]).focus();
          }
          break;
      }
    } else if (event.target.getAttribute('name') === 'card') {
      switch (event.keyCode) {
        case KEY_LEFT:
          if (index === 0 || (index % CARDS_IN_ROW) === 0) {
            ReactDOM.findDOMNode(this.backBtn).focus();
          } else  {
            ReactDOM.findDOMNode(this[`card${index - 1}`]).focus();
            this.setActiveRow(index - 1);
          }
          break;
        case KEY_RIGHT:
          if ((index < (cards.length - 1)) && ((index + 1) % CARDS_IN_ROW !== 0)) {
            ReactDOM.findDOMNode(this[`card${index + 1}`]).focus();
            this.setActiveRow(index + 1);
          }
          break;
        case KEY_DOWN:
          if (index < cards.length - CARDS_IN_ROW) {
            ReactDOM.findDOMNode(this[`card${index + CARDS_IN_ROW}`]).focus();
            this.setActiveRow(index + CARDS_IN_ROW);
          }
          break;
        case KEY_UP:
          if (index < 3 && ReactDOM.findDOMNode(this.buyBtn)) {
            ReactDOM.findDOMNode(this.buyBtn).focus();
          } else if ((index === 3 || index === 4) || (index <= 4 && !ReactDOM.findDOMNode(this.buyBtn))) {
            ReactDOM.findDOMNode(this.sortBtn).focus();
          } else if (index >= CARDS_IN_ROW) {
            ReactDOM.findDOMNode(this[`card${index - CARDS_IN_ROW}`]).focus();
            this.setActiveRow(index - CARDS_IN_ROW);
          }
          break;
      }
    }
  }

  render() {
    const sortedCards = cards.sort(this.sortItems);
    return this.props.isCatalogUnmounted
      ?
      ([
        <div className="nav-wrapper">
          <div className="nav">
            <BackBtn
              pageNum="2"
              onKeyDown={this.handleKeyNavigation}
              ref={node => { this.backBtn = node; }}
              setCurrentPage={this.props.setCurrentPage}
            />
          </div>
        </div>,
        <div className="wrapper wrapper--inner">
          <div className="wrapper__sub" />
          <Clock />
          <div className="content-container">
            <div className="description">
              <div className="description-text">
                <span className="description-text__subtitle">Collections</span>
                <span className="description-text__title">Best of 2017</span>
                <div className="description-text__count">
                  <span className="icon" />
                  <span className="descroption-title">22 Titles</span>
                </div>
                <div className="description-text__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum. 
                </div>
              </div>
              <div className="description-action">
                {this.state.isShowBuyBtn
                  ?
                    <div
                      className="btn"
                      name="buy"
                      onClick={this.hideBuyBtn}
                      onKeyDown={this.handleBuyBtnKeyDown}
                      ref={node => { this.buyBtn = node; }}
                      role="button"
                      tabIndex="1"
                    >
                        Buy all XXX
                        <span className="money-icon" />
                    </div>
                  : null
                }
                <div className="sort-card" id="sortDropdown">
                  <div
                    className="sort-card__title"
                    name="sort-card__title"
                    onClick={() => { this.setState({ isShowSortOptions: !this.state.isShowSortOptions }); }}
                    onKeyDown={this.handleSortKeyDown}
                    ref={node => { this.sortBtn = node; }}
                    role="button"
                    tabIndex="1"
                  >
                    <span>Sort: <span>{ sortOptions.find(option => option.sortBy === this.state.sorting).text }</span></span>
                    <span className="icon" />
                  </div>
                  <div className={`sort-card-list ${this.state.isShowSortOptions ? 'active' : ''} `}>
                    {sortOptions.map((option, index) => (
                      <span
                        className={`sort-card-list__item ${this.state.sorting === option.sortBy ? 'active' : ''} `}
                        data-sort={option.text}
                        key={option.text}
                        onClick={() => { this.setSortingCards(option.sortBy); }}
                        onKeyDown={event => { this.handleSortOptionKeyDown(event, option.sortBy, index); }}
                        ref={node => { this[`sortOptionBtn${index}`] = node; }}
                        role="button"
                        tabIndex="1"
                      >
                        {option.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              <div className="content-row">
                {sortedCards.map((card, index) => (
                  <Card
                    index={index}
                    key={card.name + index}
                    name={card.name}
                    onKeyDown={this.handleKeyNavigation}
                    pic={card.pic}
                    ref={node => { this[`card${index}`] = node; }}
                    title={card.title}
                    translateY={`translateY(${-(this.cardHeight * this.state.activeRow)}px)`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ])
      : null;
  }
}

export default CollectionPage;
