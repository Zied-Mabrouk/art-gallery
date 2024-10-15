import React, { ReactNode } from 'react';

type Props = { children: ReactNode; label: string };

const Tooltip = ({ children, label }: Props) => {
  return (
    <div className="relative flex justify-center group">
      <div className="absolute -top-full hidden group-hover:flex bg-accent1 px-4 py-2 rounded-lg">
        <div className="relative flex justify-center capitalize font-semibold tracking-wider text-white">
          <div className="absolute -bottom-3 hidden group-hover:flex bg-accent1 rotate-45 h-3 w-3"></div>
          {label}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
