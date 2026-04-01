import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, MapPin, Handshake } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const BuyerSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, quantity, buyers } = location.state || { type: 'Poultry', quantity: 100, buyers: [] };
  
  const [selectedBuyer, setSelectedBuyer] = useState(buyers[0]?.id);

  const handleConfirm = () => {
    const buyer = buyers.find(b => b.id === selectedBuyer);
    navigate('/transaction', { state: { buyer, type, quantity } });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto space-y-6 pb-32">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Select Buyer</h1>
        <p className="text-gray-500 font-medium">Finalize your deal with a verified buyer.</p>
      </header>

      <div className="space-y-4">
        {buyers.map((buyer) => {
          const isSelected = selectedBuyer === buyer.id;
          return (
            <Card 
              key={buyer.id} 
              className={`p-0 overflow-hidden cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-green-600 border-transparent shadow-md' : 'border-gray-200 hover:border-green-300'} `}
            >
              <div 
                className="p-5 flex items-start gap-4"
                onClick={() => setSelectedBuyer(buyer.id)}
              >
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'}`}>
                  {isSelected && <CheckCircle2 size={14} />}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 flex items-center gap-1.5">
                        {buyer.name} <ShieldCheck size={16} className="text-blue-500" />
                      </h3>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{buyer.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-green-700">₹{(buyer.price * quantity).toLocaleString()}</p>
                      <p className="text-sm font-semibold text-gray-600">₹{buyer.price}/unit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
                      <MapPin size={14} /> {buyer.distance}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                       ★ {buyer.rating} Rating
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] sm:max-w-md sm:mx-auto lg:max-w-3xl lg:px-6">
        <Button onClick={handleConfirm} className="w-full flex items-center justify-center gap-2 text-lg">
           <Handshake size={24} /> Confirm Deal
        </Button>
      </div>
    </div>
  );
};

export default BuyerSelection;
