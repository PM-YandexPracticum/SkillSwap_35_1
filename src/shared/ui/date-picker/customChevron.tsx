/* eslint-disable react/require-default-props */
import ChevronIcon from '@icons/ui/chevron-down.svg?react';

interface ChevronProps {
  size?: number;
  orientation?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const CustomChevron = ({
  size = 24,
  orientation = 'down',
  className
}: ChevronProps) => {
  let rotation = 0;
  switch (orientation) {
    case 'up':
      rotation = 180;
      break;
    case 'left':
      rotation = -90;
      break;
    case 'right':
      rotation = 90;
      break;
    default:
      rotation = 0;
  }

  return (
    <ChevronIcon
      width={size}
      height={size}
      className={className}
      style={{
        transform: `rotate(${rotation}deg)`,
        height: 24,
        width: 24
      }}
    />
  );
};

export default CustomChevron;
