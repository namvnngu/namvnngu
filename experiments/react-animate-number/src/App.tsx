import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';

const INCREMENTS = [0.01, 0.1, 1, 10, 100, 999, 1234.56];

const commonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  minWidth: 625,
};

function App() {
  const [number, setNumber] = React.useState(122.21);
  return (
    <>
      <AnimatedNumber number={number} />
      <div style={commonStyle}>
        {INCREMENTS.map((increment) => (
          <button key={increment} onClick={() => setNumber((number) => number + increment)}>
            + {increment}
          </button>
        ))}
      </div>
      <div style={commonStyle}>
        {INCREMENTS.map((increment) => (
          <button key={increment} onClick={() => setNumber((number) => Math.max(0, number - increment))}>
            - {increment}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
