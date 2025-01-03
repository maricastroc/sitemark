import React, { ReactNode } from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActive: boolean;
}

export function ActionButton({ isActive, children, ...props }: ActionButtonProps) {
  return (
    <button className={`flex duration-100 transition-all items-center justify-center w-[2.2rem] h-[2.2rem] rounded-full ${isActive ? 'bg-accent-orange text-content-inverse' : 'bg-transparent text-content-primary hover:text-accent-orange'}`} {...props}>
      {children}
    </button>
  )
}