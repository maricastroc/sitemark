import React, { ReactNode } from 'react';

interface ActionLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  isActive: boolean;
}

export function ActionLink({ isActive, children, ...props }: ActionLinkProps) {
  return (
    <a
      className={`flex duration-100 transition-all items-center justify-center w-[2.2rem] h-[2.2rem] rounded-full ${isActive ? 'bg-accent-orange text-content-inverse' : 'bg-transparent text-content-primary hover:text-accent-orange'}`}
      {...props}
    >
      {children}
    </a>
  );
}
