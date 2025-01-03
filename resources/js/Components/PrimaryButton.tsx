import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

export function PrimaryButton({ content, ...props }: ButtonProps) {
  return (
    <button
      className="font-bold transition-all duration-200 tracking-widest uppercase rounded-full text-content-inverse text-label-small border-accent-orange bg-accent-orange hover:bg-accent-orange btn w-[15rem] brightness-100 hover:brightness-110"
      {...props}
    >
      {content}
    </button>
  );
}
