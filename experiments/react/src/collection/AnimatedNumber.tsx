import React from "react";

import { Button } from "../components/Button";

/* ------------------------------------------------------------------------- */

const APP_NAME = "AnimatedNumberApp";

const INCREMENTS = [0.01, 0.1, 1, 10, 100, 999, 1234.56];

const COMMON_ANIMATED_NUMBER_DEMO_CLASS_NAME =
  "flex items-center gap-4 min-w-[625px]";

const AnimatedNumberApp: React.FC = () => {
  const [number, setNumber] = React.useState(122.21);
  return (
    <div className="flex flex-col gap-4">
      <AnimatedNumber number={number} />
      <div className={COMMON_ANIMATED_NUMBER_DEMO_CLASS_NAME}>
        {INCREMENTS.map((increment) => (
          <Button
            key={increment}
            onClick={() => setNumber((number) => number + increment)}
          >
            + {increment}
          </Button>
        ))}
      </div>
      <div className={COMMON_ANIMATED_NUMBER_DEMO_CLASS_NAME}>
        {INCREMENTS.map((increment) => (
          <Button
            key={increment}
            onClick={() =>
              setNumber((number) => Math.max(0, number - increment))
            }
          >
            - {increment}
          </Button>
        ))}
      </div>
    </div>
  );
};

AnimatedNumberApp.displayName = APP_NAME;

/* ------------------------------------------------------------------------- */

const ANIMATED_NUMBER_NAME = "AnimatedNumber";

const decimalNumberFormatter = new Intl.NumberFormat(undefined, {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function generateTwoDecimalPlacesFloor(num: number) {
  return decimalNumberFormatter.format(Math.floor(num * 100) / 100);
}

const AnimatedNumber: React.FC<{ number: number }> = (props) => {
  return (
    <div className="flex items-center">
      {generateTwoDecimalPlacesFloor(props.number)
        .split("")
        .map((digit, index) => (
          <AnimatedDigit key={index} digit={digit} />
        ))}
    </div>
  );
};

AnimatedNumber.displayName = ANIMATED_NUMBER_NAME;

/* ------------------------------------------------------------------------- */

const ANIMATED_DIGIT_NAME = "AnimatedDigit";

const commonAnimatedDigitStyle = {
  lineHeight: 1,
  fontSize: 48,
  height: 48,
};

const AnimatedDigit: React.FC<{ digit: string }> = (props) => {
  if (props.digit === ".") {
    return <span style={commonAnimatedDigitStyle}>.</span>;
  }
  return (
    <span style={{ ...commonAnimatedDigitStyle, overflow: "hidden" }}>
      <div
        style={{
          transform: `translateY(-${props.digit}0%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
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
};

AnimatedDigit.displayName = ANIMATED_DIGIT_NAME;

/* ------------------------------------------------------------------------- */

export { AnimatedNumberApp };
