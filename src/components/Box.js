import React, { Component } from 'react';
import './box.css';

class Box extends Component {
  render() {
    let className = "Box";
    if (this.props.isPlayer) {
      className += " Player";
    }
    if (this.props.isEnemy) {
      className += " Enemy";
    }
    return (
      <div className={className}>
      </div>
    );
  }
}

export default Box;
