import React from 'react';
import Board from './Board';

const isInSameLine = (indices, set, currElement) => {
  return indices.every((index) => set[index] === currElement);
};

const getAP = (start, difference, end) => {
  const AP = [];
  let index = start;
  while (index <= end) {
    AP.push(index);
    index += difference;
  }
  return AP;
};

const getPossibilities = (currIndex, width) => {
  const diagonal1 = getAP(0, width + 1, width * width - 1);
  const diagonal2 = getAP(width - 1, width - 1, width * (width - 1));
  const colStart = Math.abs(currIndex % width);
  const rowStart = currIndex - colStart;
  const col = getAP(colStart, width, width * (width - 1) + colStart);
  const row = getAP(rowStart, 1, rowStart + width - 1);
  return [col, row, diagonal1, diagonal2];
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPlayer: { name: 'player1', symbol: 'X' },
      nextPlayer: { name: 'player2', symbol: 'O' },
      tiles: Array.from(Array(9), () => ''),
      draw: false,
      winner: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.isOver = this.isOver.bind(this);
  }

  isOver(props) {
    const combinations = getPossibilities(props.currID, 3);
    const won = combinations.some((indices) =>
      isInSameLine(indices, this.state.tiles, this.state.tiles[props.currID])
    );
    if (won) {
      this.setState((prevState) => ({ winner: this.state.currPlayer }));
    }
    const draw = !this.state.tiles.some((sym) => sym === '');
    if (draw) {
      this.setState((prevState) => ({ draw: true }));
    }
    return won || draw;
  }

  handleChange(event) {
    const tiles = this.state.tiles;
    const value = tiles[event.target.id];
    if (value === '') {
      tiles[event.target.id] = this.state.currPlayer.symbol;
      const gameOver = this.isOver({ currID: event.target.id });
      this.setState({
        tiles,
        currPlayer: this.state.nextPlayer,
        nextPlayer: this.state.currPlayer,
      });
    }
  }

  render() {
    if (this.state.draw) {
      return <div style={{ textAlign: 'center' }}>Game end no one win</div>;
    }
    if (this.state.winner) {
      return (
        <div style={{ textAlign: 'center' }}>{this.state.winner.name} won</div>
      );
    }
    return <Board tiles={this.state.tiles} onClick={this.handleChange} />;
  }
}

export default Game;
