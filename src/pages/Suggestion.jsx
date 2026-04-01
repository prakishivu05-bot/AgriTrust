import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { buyers } from '../data/dummyData';

const Suggestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, quantity, grade } = location.state || { type: 'Poultry', quantity: 100, grade: 'A' };

  // Calculate earnings and find the best buyer
  const options = buyers.map(buyer => ({
    ...buyer,
    totalEarnings: buyer.price * quantity,
  })).sort((a, b) => b.price - a.price);

  const bestOption = options[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto space-y-6 pb-24">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
           AI Suggestion <Sparkles className="text-amber-500" size={24} />
        </h1>
        <p className="text-gray-500 font-medium">
          Based on your {quantity} {type === 'Poultry' ? 'kg' : 'L'} of {type}.
        </p>
      </header>

      <Card highlight={true} className="border-2 pt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          BEST OPTION <Sparkles size={12} />
        </div>
        <h2 className="text-sm text-green-900 font-bold uppercase tracking-wide">Top Recommendation</h2>
        <p className="text-xl font-bold mt-1 text-gray-900">{bestOption.name}</p>
        <p className="text-green-700 font-semibold mt-1 bg-green-100 w-max px-2 py-0.5 rounded text-sm">
          ₹{bestOption.price} / {type === 'Poultry' ? 'kg' : 'L'}
        </p>
        
        <div className="mt-5 p-4 bg-white rounded-xl border border-green-100 border-dashed flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Earnings</p>
            <p className="text-3xl font-black text-gray-900 mt-0.5">₹{bestOption.totalEarnings.toLocaleString()}</p>
          </div>
          <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
            <TrendingUp className="text-green-600" />
          </div>
        </div>

        <Button 
          className="w-full mt-4" 
          onClick={() => navigate('/buyer-selection', { state: { type, quantity, buyers: options } })}
        >
           Proceed with Best Option <ArrowRight size={18} />
        </Button>
      </Card>

      <div className="space-y-3">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          Other Available Buyers
        </h3>
        {options.slice(1).map((buyer) => (
          <Card key={buyer.id} className="p-4 flex items-center justify-between border-gray-200">
            <div>
              <p className="font-bold text-gray-900">{buyer.name}</p>
              <p className="text-blue-700 font-semibold bg-blue-50 w-max px-2 py-0.5 rounded text-xs mt-1">₹{buyer.price} / unit</p>
            </div>
            <div className="text-right">
              <p className="font-black text-gray-800 text-lg">₹{(buyer.price * quantity).toLocaleString()}</p>
              <p className="text-gray-400 text-xs font-medium">{buyer.distance}</p>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Suggestion;
