import React from 'react';

const Tile = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{
        border: '1px solid black',
        width: '10vw',
        height: '10vh',
        padding: '1vw',
      }}
      key={`${props.index}`}
      id={`${props.index}`}
    >
      {props.element}
    </div>
  );
};

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
      nextSymbol: 'x',
      tiles: Array.from(Array(9), () => ''),
      continue: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  isWon(props) {
    const combinations = getPossibilities(props.currID, 3);
    return combinations.some((indices) =>
      isInSameLine(indices, this.state.tiles, this.state.tiles[props.currID])
    );
  }

  handleChange(event) {
    const tiles = this.state.tiles;
    const value = tiles[event.target.id];
    if (value === '') {
      tiles[event.target.id] = this.state.nextSymbol;
      const nextSymbol = this.state.nextSymbol === 'x' ? 'o' : 'x';
      const won = this.isWon({ currID: event.target.id });
      this.setState({ tiles, nextSymbol, continue: !won });
    }
  }

  render() {
    if (!this.state.continue) {
      return <div style={{ textAlign: 'center' }}>You won</div>;
    }
    const box = this.state.tiles.map((element, index) => {
      return Tile({
        element,
        index,
        onClick: this.handleChange,
      });
    });
    return (
      <div
        style={{
          marginLeft: '31.5vw',
          marginTop: '3vh',
          display: 'flex',
          flexWrap: 'wrap',
          width: '40vw',
          height: '40vh',
        }}
      >
        {box}
      </div>
    );
  }
}

export default Game;
