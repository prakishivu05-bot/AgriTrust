import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, Lock, Truck, CheckCircle2, ChevronRight, Hash, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { buyer, type, quantity } = location.state || { 
    buyer: { name: 'Verified Buyer', price: 200 }, 
    type: 'Produce', 
    quantity: 100 
  };

  const [step, setStep] = useState(1);
  const totalAmount = buyer.price * quantity;

  // Auto progression for demo purposes
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2000); // Simulate locking to delivery
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleComplete = () => {
    setStep(3);
    setTimeout(() => {
      navigate('/history');
    }, 2000);
  };

  const StepIndicator = ({ number, title, icon: Icon, active, completed }) => (
    <div className={`flex flex-col items-center gap-2 ${active || completed ? 'text-green-600' : 'text-gray-400'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500
        ${active ? 'border-green-600 bg-green-50 shadow-lg' : completed ? 'border-green-600 bg-green-600 text-white' : 'border-gray-200 bg-gray-50'}`}>
        <Icon size={20} />
      </div>
      <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-green-700' : ''}`}>{title}</span>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-md mx-auto space-y-6 pb-24 h-screen flex flex-col">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
           Smart Contract <Shield className="text-blue-500" />
        </h1>
        <p className="text-gray-500 font-medium">Securing your transaction securely on-chain.</p>
      </header>

      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 flex items-center justify-between">
         <div>
           <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1 flex items-center gap-1">
             <Hash size={12}/> TXN-8A9B2C
           </p>
           <p className="font-extrabold text-gray-900">{buyer.name}</p>
         </div>
         <div className="text-right">
           <p className="text-xl font-black text-blue-900">₹{totalAmount.toLocaleString()}</p>
         </div>
      </Card>

      <div className="py-8 flex-1">
        <div className="flex justify-between relative px-2">
          {/* Progress Line */}
          <div className="absolute top-6 left-10 right-10 h-1 bg-gray-200 -z-10 rounded-full">
             <div 
               className="h-full bg-green-500 transition-all duration-1000 rounded-full" 
               style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
             />
          </div>
          
          <StepIndicator 
            number={1} 
            title="Locked" 
            icon={Lock} 
            active={step === 1} 
            completed={step > 1} 
          />
          <StepIndicator 
            number={2} 
            title="Delivery" 
            icon={Truck} 
            active={step === 2} 
            completed={step > 2} 
          />
          <StepIndicator 
            number={3} 
            title="Done" 
            icon={CheckCircle2} 
            active={step === 3} 
            completed={step === 3} 
          />
        </div>

        <div className="mt-12 text-center space-y-2">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-amber-600">Payment Locked Securely</h3>
              <p className="text-gray-500 font-medium mt-2">The buyer's funds are secured in the smart contract.</p>
            </div>
          )}
          {step === 2 && (
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold text-blue-600">Ready for Dispatch</h3>
              <p className="text-gray-500 font-medium mt-2">Hand over the {quantity} units to the buyer.</p>
              <Button 
                onClick={handleComplete} 
                className="mt-8 mx-auto shadow-blue-500/30"
                variant="secondary"
              >
                Mark as Delivered <ChevronRight size={18} />
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-xl font-bold text-green-600">Payment Unlocked</h3>
              <p className="text-gray-500 font-medium mt-2">₹{totalAmount.toLocaleString()} has been added to your wallet!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
