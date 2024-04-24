import React from 'react';

export interface AnimatedDigitProps {
  digit: string;
}

const commonStyle = {
  lineHeight: 1,
  fontSize: 48,
  height: 48,
};

export const AnimatedDigit = React.memo<AnimatedDigitProps>(function ({ digit }) {
  if (digit === '.') {
    return <span style={commonStyle}>.</span>;
  }
  return (
    <span style={{ ...commonStyle, overflow: 'hidden' }}>
      <div style={{ transform: `translateY(-${digit}0%)`, transition: 'transform 0.5s ease-in-out' }}>
        <div>0</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </span>
  );
});

AnimatedDigit.displayName = 'AnimatedDigit';
