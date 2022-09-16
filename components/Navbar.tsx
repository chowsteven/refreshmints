import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-12 py-3 bg-gray-800'>
      <div className='flex items-center'>
        <Link href='/'>
          <a className='flex items-center'>
            <Image
              src='/../public/icon.png'
              alt='Refreshmints icon'
              height={24}
              width={24}
            />
            <span className='pl-2 pr-6'>Refreshmints</span>
          </a>
        </Link>
        <div>Search</div>
      </div>
      <div className='flex gap-6'>
        <Link href='/live-feed'>Live Feed</Link>
        <Link href='/trending'>Trending</Link>
      </div>
    </nav>
  );
};
