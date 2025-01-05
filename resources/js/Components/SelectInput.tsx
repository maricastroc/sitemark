import React, { forwardRef } from 'react';

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ onChange, value, ...props }, ref) => {
    return (
      <select
        ref={ref}
        name="platform"
        className="w-full border-2 border-zinc-800 select bg-background-secondary"
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="" disabled>
          Select a platform...
        </option>
        <option value="Prime Video">Prime Video</option>
        <option value="max">max</option>
        <option value="Netflix">Netflix</option>
        <option value="Paramount">Paramount</option>
        <option value="Disney+">Disney+</option>
        <option value="Apple TV">Apple TV</option>
      </select>
    );
  }
);
