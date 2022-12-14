import React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col bg-gray-900 min-h-screen font-montserrat text-white'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};
