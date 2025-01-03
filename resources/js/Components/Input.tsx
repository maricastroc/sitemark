import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      onChange={onChange}
      className="w-full text-gray-100 bg-background-secondary input input-bordered"
      {...props}
    />
  );
}
