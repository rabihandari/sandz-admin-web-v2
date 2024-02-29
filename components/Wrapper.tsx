import React from 'react';

interface Iprops {
  isInPannel?: boolean;
  children: React.ReactNode;
}

const Wrapper: React.FC<Iprops> = ({ children, isInPannel = false }) => {
  return (
    <div
      className={`bg-white gap-4 rounded-md flex flex-col ${
        !isInPannel && 'shadow-lg p-5'
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
