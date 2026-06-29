import React from 'react';

export function Field({
  className = '',
  type,
  placeholder,
  id,
  ref,
  ...props
}) {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      id={id}
      {...props}
      className={`rounded-(--radius-input) border-[1.4px] border-brown h-12 p-2 ${className}`}
    />
  );
}
