import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  content: string;
}

export function Label({ content, ...props }: LabelProps) {
  return (
    <label
      className="mb-2 font-bold text-gray-100 label-text text-md ms-1"
      {...props}
    >
      {content}
    </label>
  );
}
