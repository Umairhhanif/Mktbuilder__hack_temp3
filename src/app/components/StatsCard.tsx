import { ReactNode } from 'react';

interface StatsCardProps {
  children: ReactNode;
  className?: string;
}

const StatsCard = ({ children, className = '' }: StatsCardProps) => {
  return (
    <div className={`bg-white overflow-hidden shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default StatsCard;
