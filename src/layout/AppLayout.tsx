import Navbar from './Navbar/Navbar';
import React from 'react';
import Sidebar from './Sidebar/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-h-screen h-full'>
      <Navbar />
      <div className='flex flex-row flex-nowrap'>
        <aside>
          <Sidebar />
        </aside>
        <main className='w-full bg-[#F7FAFC] pt-[80px] overflow-auto'>
          <div className='pl-6 pr-6 pt-[25px] pb-[25px] min-h-main'>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
