import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, X } from 'lucide-react';
import produceMapping from '../data/produceMapping.json';

const SmartUtilizationPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { crop, icon, cropKey, quantities } = location.state || {
    crop: 'Coconut',
    icon: '🥥',
    cropKey: 'coconut',
    quantities: { gradeA: 32, gradeB: 23, gradeC: 123 }
  };

  const cropData = produceMapping[cropKey];

  const handleClose = () => {
    navigate('/farmer');
  };

  const GradeSection = ({ grade, label, quantity, items }) => {
    if (!quantity || quantity <= 0) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 dark:text-white">{label}</h3>
          <span className="text-emerald-600 dark:text-emerald-500 font-bold text-lg">{quantity} kg</span>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => {
            // Very simple hardcoded mapping for styling based on produceMapping patterns
            let industryLabel = 'General Market';
            if (grade === 'B' || grade === 'C') {
               if (item.toLowerCase().includes('oil') || item.toLowerCase().includes('copra')) industryLabel = 'Oil Industry';
               else if (item.toLowerCase().includes('coir') || item.toLowerCase().includes('husk') || item.toLowerCase().includes('fiber')) industryLabel = 'Fiber Industry';
               else if (item.toLowerCase().includes('charcoal') || item.toLowerCase().includes('fuel') || item.toLowerCase().includes('ethanol')) industryLabel = 'Fuel Industry';
               else if (item.toLowerCase().includes('feed')) industryLabel = 'Animal Feed';
               else if (item.toLowerCase().includes('compost')) industryLabel = 'Agriculture';
               else industryLabel = 'Processing Industry';
            }

            return (
              <div key={index} className="flex flex-col gap-1.5 ml-2">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-bold text-lg">
                  <ArrowRight size={16} className="text-gray-400 dark:text-gray-500" />
                  {item}
                </div>
                <div className="flex items-center gap-1.5 ml-6 text-emerald-600 dark:text-emerald-500 font-semibold text-sm">
                  <Leaf size={14} /> {industryLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-gray-900 font-sans transition-colors">
      <div className="max-w-2xl mx-auto flex flex-col min-h-[100dvh]">
        
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10 px-6 py-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 transition-colors">
          <div>
            <h2 className="text-emerald-600 dark:text-emerald-500 font-black text-sm uppercase tracking-widest mb-1">
              SMART UTILIZATION PLAN
            </h2>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              {crop} <span className="text-3xl">{icon}</span>
            </h1>
          </div>
          <button 
            onClick={handleClose}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 pb-24">
          {cropData ? (
            <>
              <GradeSection 
                grade="A"
                label="Grade A Produce" 
                quantity={quantities.gradeA} 
                items={cropData.grades?.A || []} 
              />
              <GradeSection 
                grade="B"
                label="Grade B Produce" 
                quantity={quantities.gradeB} 
                items={cropData.grades?.B || []} 
              />
              <GradeSection 
                grade="C"
                label="Grade C Produce" 
                quantity={quantities.gradeC} 
                items={cropData.grades?.C || []} 
              />
            </>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
              No utilization data found for this crop.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartUtilizationPlan;
