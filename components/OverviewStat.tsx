import Image from 'next/image';

interface OverviewStatProps {
  stat: string | number;
  description: string;
}

export const OverviewStat = ({ stat, description }: OverviewStatProps) => {
  // if desc contains "floor" add eth icon to stat
  return (
    <div className='flex flex-col items-center'>
      <div className='font-semibold text-lg'>
        {description.includes('FLOOR') ? (
          <Image src='/images/eth.png' height={15} width={15} alt='Eth logo' />
        ) : null}
        {stat}
      </div>
      <div className='text-gray-300 text-xs'>{description}</div>
    </div>
  );
};
