import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row flex-nowrap'>
      <div className='flex-[40%] h-screen bg-[#F6F9FF] hidden md:flex' />
      <main className='flex-[60%] flex flex-col items-center md:items-start justify-center min-h-screen p-16 pt-8 pb-8 relative'>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
