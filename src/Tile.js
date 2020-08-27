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

export default Tile;
