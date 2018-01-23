import React, { Component } from 'react';
import Box from './Box.js';

class Board extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    let rows = [];
    for (var i=0; i<this.state.size; i++) {
      let row = [];
      for (var j=0;j<this.state.size; j++) {
        let isPlayer = this.state.playerPosition[0] === i && this.state.playerPosition[1] === j;

        let isEnemy = false;
        if (this.state.boardState[i][j] === -1) {
          isEnemy = true;
        }

        if (isPlayer && isEnemy) {
          isEnemy = false;
        }

        row.push(<td key={j}><Box isPlayer={isPlayer} isEnemy={isEnemy}></Box></td>);
      }

      rows.push(<tr key={i}>{row}</tr>);
    }
    return (
      <div className="App">
      <table>
      <tbody>
      {rows}
      </tbody>
      </table>
      </div>
    );
  }

  componentDidMount() {
    let size = 0;
    while(size < 3 || isNaN(size)) {
      size = prompt("Please enter size of board, minimum 3");
    }

    size = Math.min(size, 10);

    var boardState = [];
    for (var i=0; i<size; i++) {
      boardState[i] = [];
      for (var j=0; j<size; j++) {
        boardState[i][j] = 0;
      }
    }
    let xPlayer = Math.floor((Math.random() * size - 1) + 1);
    let yPlayer = Math.floor((Math.random() * size - 1) + 1);

    for (i=0; i<5; i++) {
      let xEnemy = Math.floor((Math.random() * size - 1) + 1);
      let yEnemy = Math.floor((Math.random() * size - 1) + 1);

      if (xEnemy === xPlayer) {
        xEnemy--;
      }
      if (yEnemy === yPlayer) {
        yEnemy--;
      }
      boardState[xEnemy][yEnemy] = -1;
    }

    console.log("Test");
    this.setState((old, props) => ({
      size: size,
      moves: 0,
      playerPosition: [xPlayer, yPlayer],
      boardState: boardState,
      kills: 0
    }));
  }

  moveLeft() {
    this.setState((old, props) => {
      let x = Math.max(old.playerPosition[1] - 1, 0);
      return {
        moves: old.moves + 1,
        playerPosition: [old.playerPosition[0], x]
      }
    });
  }

  moveRight() {
    this.setState((old, props) => {
      let x = Math.min(old.playerPosition[1] + 1, old.size - 1);
      return {
        moves: old.moves + 1,
        playerPosition: [old.playerPosition[0], x]
      }
    });
  }

  moveDown() {
    this.setState((old, props) => {
      let y = Math.min(old.playerPosition[0] + 1, old.size - 1);
      return {
        moves: old.moves + 1,
        playerPosition: [y, old.playerPosition[1]]
      }
    });
  }

  moveUp() {
    this.setState((old, props) => {
      let y = Math.max(old.playerPosition[0] - 1, 0);
      return {
        moves: old.moves + 1,
        playerPosition: [y, old.playerPosition[1]]
      }
    });
  }

  componentWillReceiveProps(props) {
    if (this.state.keyPressed != props.keyPressed) {
      switch (props.keyPressed) {
        case 'left':
        this.moveLeft();
        break;
        case 'right':
        this.moveRight()
        break;
        case 'up':
        this.moveUp();
        break;
        case 'down':
        this.moveDown();
        break;
        default:
        break;
      }
      this.setState({
        key: props.keyPressed
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.playerPosition) {
      this.checkEnemyAt(nextState.playerPosition[0], nextState.playerPosition[1], nextState.boardState);
    }
  }

  componentDidUpdate() {
    if (this.state.key) {      
      this.setState({
        key: ""
      });
    }
  }

  checkEnemyAt(i, j, boardState) {
    if (boardState[i][j] === -1) {
        this.enemyDie(i, j);
    }
  }

  enemyDie(i, j) {
    this.setState((old, props) => {
      let boardState = old.boardState;
      boardState[i][j] = 0;
      return {
        boardState: boardState,
        kills: old.kills + 1
      }
    });
  }
}

export default Board;
