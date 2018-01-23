import React, { Component } from 'react';
import './App.css';
import Board from './components/Board.js'
import ArrowKeysReact from 'arrow-keys-react';

class App extends Component {

  constructor() {
    super();
    this.state = {};
    ArrowKeysReact.config({
      left: () => {
        this.setState({
          key: 'left'
        });
      },
      right: () => {
        this.setState({
          key: 'right'
        });
      },
      up: () => {
        this.setState({
          key: 'up'
        });
      },
      down: () => {
        this.setState({
          key: 'down'
        });
      }
    });
  }

  render() {
    return (
      <div className="App" {...ArrowKeysReact.events} tabIndex="1">
        <Board keyPressed={this.state.key}></Board>
      </div>
    );
  }

  resetDirection() {

  }

}

export default App;
