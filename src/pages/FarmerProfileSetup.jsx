import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, X, ArrowLeft } from 'lucide-react';
import { HybridBlockchain } from '../utils/blockchain';

const FarmerProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    landOwned: '',
    experience: '',
    locationInput: ''
  });
  
  const [crops, setCrops] = useState([]);
  const [cropInput, setCropInput] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (cropInput.trim() && !crops.includes(cropInput.trim())) {
      setCrops([...crops, cropInput.trim()]);
      setCropInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalCrops = [...crops];
    if (cropInput.trim() && !crops.includes(cropInput.trim())) {
      finalCrops.push(cropInput.trim());
      setCrops(finalCrops);
      setCropInput('');
    }

    if (!formData.name || !formData.locationInput || !formData.landOwned) {
      alert("Please fill all required fields (Name, Land, and Village/Location).");
      return;
    }

    if (finalCrops.length === 0) {
      alert("Please add at least one crop grown using the '+' button.");
      return;
    }
    
    setIsDeploying(true);
    
    const payload = { ...formData, location: formData.locationInput, cropsGrown: finalCrops };
    
    try {
      await HybridBlockchain.deployFarmerIdentity(payload);
      setIsDeploying(false);
      navigate('/farmer');
    } catch(err) {
      console.error(err);
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 pb-24 font-sans">
      <div className="max-w-xl mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/farmer')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              Farmer Identity <ShieldCheck className="text-blue-500" />
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
              Store your verifiable profile on the blockchain.
            </p>
          </div>
        </div>

        {isDeploying ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center space-y-6 text-center">
             <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/40 border-t-blue-500 rounded-full animate-spin" />
             <div>
               <h3 className="text-xl font-black text-gray-900 dark:text-white">Deploying to Smart Contract...</h3>
               <p className="text-gray-500 font-medium">Securing immutable identity records.</p>
             </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
            
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Full Name</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Ramesh Kumar"
                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Land (Acres)</label>
                <input 
                  required
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.landOwned}
                  onChange={e => setFormData({...formData, landOwned: e.target.value})}
                  placeholder="e.g. 5.5"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Experience (Yrs)</label>
                <input 
                  required
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={e => setFormData({...formData, experience: e.target.value})}
                  placeholder="e.g. 10"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Structured Location Block */}
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <label className="font-black text-gray-800 dark:text-white text-sm uppercase tracking-widest">Village or Location</label>
              </div>
              
              <div>
                <input 
                  required
                  type="text"
                  value={formData.locationInput}
                  onChange={e => setFormData({...formData, locationInput: e.target.value})}
                  placeholder="e.g. Rameshwaram Village"
                  className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700/50 rounded-xl p-4 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Crops Grown</label>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text"
                  value={cropInput}
                  onChange={e => setCropInput(e.target.value)}
                  onKeyPress={e => {
                    if(e.key === 'Enter') {
                       e.preventDefault();
                       handleAddCrop(e);
                    }
                  }}
                  placeholder="e.g. Coconut"
                  className="flex-1 bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-3 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
                <button type="button" onClick={handleAddCrop} className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 rounded-xl font-bold flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                  <Plus size={24} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {crops.length === 0 && <span className="text-gray-400 text-sm italic font-medium pt-1">No crops added yet.</span>}
                {crops.map((c, i) => (
                  <span key={i} className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1">
                    {c} <X size={14} className="cursor-pointer ml-1 opacity-70 hover:opacity-100" onClick={() => setCrops(crops.filter((_, idx) => idx !== i))} />
                  </span>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4 text-xl font-black shadow-lg shadow-blue-500/30 outline-none transition-colors"
            >
              SAVE
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default FarmerProfileSetup;
