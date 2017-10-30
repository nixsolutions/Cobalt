/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';

class Card extends Component {
  render() {
    return (
      <div
        className="card"
        name="card"
        onKeyDown={event => this.props.onKeyDown(event, this.props.index)}
        role="button"
        style={{ transform: this.props.translateY }}
        tabIndex="-1"
      >
        <div className={`card-body body-bg${this.props.pic}`}>
            <span className="card-title">{this.props.title}</span>
            <span className="card-title-hide">{this.props.name}</span>
        </div>
      </div>
    );
  }
}

export default Card;
