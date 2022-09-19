interface HolderStatProps {
  stat: string | number;
  description: string;
}

export const HolderStat = ({ stat, description }: HolderStatProps) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='font-semibold text-lg'>{stat}</div>
      <div className='text-gray-300 text-xs'>{description}</div>
    </div>
  );
};
