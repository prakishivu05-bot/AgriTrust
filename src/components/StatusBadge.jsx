import React from 'react';
import { CheckCircle2, Truck, Lock } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Completed':
        return { color: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle2 className="w-4 h-4" /> };
      case 'In Delivery':
        return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Truck className="w-4 h-4" /> };
      case 'Payment Locked':
        return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Lock className="w-4 h-4" /> };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: null };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1.5 w-max ${config.color}`}>
      {config.icon && config.icon}
      {status}
    </span>
  );
};

export default StatusBadge;
