import React, { Component } from 'react';
import './bundle.css';
import CataloguePage from './pages/CataloguePage';
import CollectionPage from './pages/CollectionPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPageNum: 0 };
  }

  setCurrentPage = pageNum => {
    this.setState({ currentPageNum: pageNum });
  }

  render() {
    return (() => {
      switch (this.state.currentPageNum) {
        case 0:
          return <CataloguePage setCurrentPage={this.setCurrentPage} key="catalog" />;
        case 1:
          return <CollectionPage setCurrentPage={this.setCurrentPage} key="collection" />;
        default:
          return <CataloguePage setCurrentPage={this.setCurrentPage} key="defaultCatalog" />;
      }
    })();
  }
}

export default App;
