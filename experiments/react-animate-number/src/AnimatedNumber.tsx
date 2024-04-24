import React from 'react';
import { AnimatedDigit } from './AnimatedDigit';

export interface AnimatedNumberProps {
  number: number;
}

const decimalNumberFormatter = new Intl.NumberFormat(undefined, {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function generateTwoDecimalPlacesFloor(num: number) {
  return decimalNumberFormatter.format(Math.floor(num * 100) / 100);
}

export const AnimatedNumber = React.memo<AnimatedNumberProps>(function ({ number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {generateTwoDecimalPlacesFloor(number)
        .split('')
        .map((digit, index) => (
          <AnimatedDigit key={index} digit={digit} />
        ))}
    </div>
  );
});

AnimatedNumber.displayName = 'AnimatedNumber';
