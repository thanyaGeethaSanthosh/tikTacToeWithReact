import React from 'react';
import Tile from './Tile';

const Board = (props) => {
  const tiles = props.tiles.map((element, index) => {
    return <Tile element={element} index={index} onClick={props.onClick} />;
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
      {tiles}
    </div>
  );
};

export default Board;
