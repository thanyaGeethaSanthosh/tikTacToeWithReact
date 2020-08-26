import React from 'react';
import Game from './Game';

const App = (props) => {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>Tic Tac Toe</div>
      <div>
        <Game />
      </div>
    </div>
  );
};

export default App;
