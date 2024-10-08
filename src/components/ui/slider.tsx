// src/components/ui/slider.tsx
import React from 'react';

interface SliderProps {
  className?: string;
  defaultValue?: number[];
  max?: number;
  step?: number;
  value?: number[];
  onChange?: (value: number[]) => void;
}

const Slider: React.FC<SliderProps> = ({
  className,
  defaultValue = [0],
  max = 100,
  step = 1,
  value,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [parseFloat(event.target.value)];
    if (onChange) onChange(newValue);
  };

  return (
    <input
      type="range"
      className={`slider ${className}`}  // Aquí se usa la clase personalizada
      defaultValue={defaultValue[0]}
      max={max}
      step={step}
      value={value ? value[0] : defaultValue[0]}
      onChange={handleChange}
    />
  );
  
};

export { Slider };
