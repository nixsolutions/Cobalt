import React, { Component } from 'react';
import './bundle.css';
import CataloguePage from './pages/CataloguePage';
import CollectionPage from './pages/CollectionPage';

const viewportWidthMax = [1024, 1280, 1366, 1920, 2048, 3840];

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

  renderContent = () => {
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
  }

  render() {
    // appears cobalt doesn't support media queries like browsers, so we have to apply classes based on window.innerWidth
    const maxWidth = viewportWidthMax.find(width => window.innerWidth <= width);
    const viewportWidthMaxClass = maxWidth ? ` viewport-width-${maxWidth}` : '';

    return (
      <div className={`content-holder${viewportWidthMaxClass}`}>
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
