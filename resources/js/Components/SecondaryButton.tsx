import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

export function SecondaryButton({ content, ...props }: ButtonProps) {
  return (
    <button
      className="font-bold transition-all duration-200 tracking-widest uppercase rounded-full text-accent-orange text-label-small border-accent-orange bg-background-secondary hover:bg-background-tertiary btn w-[15rem]"
      {...props}
    >
      {content}
    </button>
  );
}
