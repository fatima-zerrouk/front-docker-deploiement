import React from 'react';

export function ButtonTerracota({ className = '', value, type = 'button' }) {
  return (
    <button
      type={type}
      className={`bg-terracotta font-medium py-2 h-12 rounded-(--radius-button) w-40 lg:w-35 cursor-pointer hover:bg-brown hover:text-lin transition duration-150 ease-in-out ${className}`}
    >
      {value}
    </button>
  );
}
