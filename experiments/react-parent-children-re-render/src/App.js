import React from 'react';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <Parent>
        <Child />
      </Parent>
    </div>
  );
}

const Parent = ({ children }) => {
  const [counter, setCounter] = React.useState(0);
  console.log('Parent re-rendder');
  return (
    <>
      <button onClick={() => setCounter(counter + 1)}>Parent +</button>
      <div>{counter}</div>
      {children}
    </>
  );
};

const Child = () => {
  console.log('Child re-rendder');
  return <div>Child</div>;
};
