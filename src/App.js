import React, { Component } from 'react';
import './bundle.css';
import CataloguePage from './pages/CataloguePage';
import CollectionPage from './pages/CollectionPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPageNum: 0, isCatalogUnmounted: true, isCollectionUnmounted: true };
  }

  setCurrentPage = pageNum => {
    this.setState({ currentPageNum: pageNum });
  }

  // experiment, attempt to fix a mess on TV when pages are switched
  setCatalogUnmounted = mount => {
    this.setState({ isCatalogUnmounted: mount });
  }

  setCollectionUnmounted = mount => {
    this.setState({ isCollectionUnmounted: mount });
  }

  render() {
    return (() => {
      switch (this.state.currentPageNum) {
        case 0:
          return (
            <CataloguePage
              isCollectionUnmounted={this.state.isCollectionUnmounted}
              key="defaultCatalog"
              setCatalogUnmounted={this.setCatalogUnmounted}
              setCurrentPage={this.setCurrentPage}
            />
          );
        case 1:
          return (
            <CollectionPage
              isCatalogUnmounted={this.state.isCatalogUnmounted}
              key="collection"
              setCollectionUnmounted={this.setCollectionUnmounted}
              setCurrentPage={this.setCurrentPage}
            />
          );
        default:
          return (
            <CataloguePage
              isCollectionUnmounted={this.state.isCollectionUnmounted}
              key="defaultCatalog"
              setCatalogUnmounted={this.setCatalogUnmounted}
              setCurrentPage={this.setCurrentPage}
            />
          );
      }
    })();
  }
}

export default App;
