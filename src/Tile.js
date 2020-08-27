import React from 'react';

const Tile = (props) => {
  return (
    <div
      key={props.index}
      id={props.index}
      onClick={props.onClick}
      style={{
        border: '1px solid black',
        width: '10vw',
        height: '10vh',
        padding: '1vw',
      }}
    >
      {props.element}
    </div>
  );
};

export default Tile;
