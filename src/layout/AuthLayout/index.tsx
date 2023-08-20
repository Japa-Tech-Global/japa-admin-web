import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='px-primary py-[67px] flex items-center justify-center bg-primary min-h-screen'>
      <main className='max-w-screen-sm w-full bg-white pt-[47px] pb-[53px] px-10'>
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
