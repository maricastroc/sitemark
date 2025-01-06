import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        onChange={onChange}
        className="w-full text-gray-100 border-2 focus:outline-none focus:border-none text-md input border-zinc-800 bg-background-secondary"
        {...props}
      />
    );
  }
);
