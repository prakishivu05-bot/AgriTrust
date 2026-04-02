import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, X, ArrowLeft, ChevronDown, Search } from 'lucide-react';
import locationData from '../data/locationData.json';
import { HybridBlockchain } from '../utils/blockchain';

// Reusable Searchable Dropdown Component
const SearchableDropdown = ({ label, options, value, onChange, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-[11px] uppercase tracking-wider">{label}</label>
      
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border-2 rounded-xl p-3 text-base font-bold transition-colors cursor-pointer ${
          disabled 
            ? 'bg-gray-100 dark:bg-gray-800 border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
            : isOpen 
              ? 'bg-white dark:bg-gray-900 border-blue-500 text-gray-900 dark:text-white'
              : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <span className={value ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500 font-medium'}>
          {value || placeholder}
        </span>
        <ChevronDown size={18} className={`transition-transform ${isOpen && 'rotate-180'} ${disabled ? 'text-gray-300 dark:text-gray-700' : 'text-gray-500'}`} />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl max-h-60 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2">
          
          <div className="p-2 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2 bg-gray-50 dark:bg-gray-900/50 sticky top-0">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text"
              autoFocus
              className="w-full bg-transparent border-none focus:outline-none text-sm font-semibold text-gray-900 dark:text-white placeholder-gray-400"
              placeholder={`Search ${label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="overflow-y-auto flex-1 p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                    value === opt 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-500 font-medium tracking-wide">
                No matches found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const FarmerProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    landOwned: '',
    experience: ''
  });
  
  // Location States
  const [selState, setSelState] = useState('');
  const [selDistrict, setSelDistrict] = useState('');
  const [selTaluk, setSelTaluk] = useState('');
  const [selVillage, setSelVillage] = useState('');

  const [crops, setCrops] = useState([]);
  const [cropInput, setCropInput] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  // Derived Location Options
  const stateOptions = Object.keys(locationData);
  const districtOptions = selState ? Object.keys(locationData[selState] || {}) : [];
  const talukOptions = selState && selDistrict && locationData[selState][selDistrict] 
    ? Object.keys(locationData[selState][selDistrict]) 
    : [];
  const villageOptions = selTaluk && locationData[selState]?.[selDistrict]?.[selTaluk]
    ? locationData[selState][selDistrict][selTaluk]
    : [];

  // Reset cascade logic
  const handleStateChange = (val) => {
    setSelState(val);
    setSelDistrict('');
    setSelTaluk('');
    setSelVillage('');
  };
  
  const handleDistrictChange = (val) => {
    setSelDistrict(val);
    setSelTaluk('');
    setSelVillage('');
  };

  const handleTalukChange = (val) => {
    setSelTaluk(val);
    setSelVillage('');
  };

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (cropInput.trim() && !crops.includes(cropInput.trim())) {
      setCrops([...crops, cropInput.trim()]);
      setCropInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure terminal location selection is present (Village or at least District based on constraints)
    if (!formData.name || !selState || !selDistrict || !formData.landOwned || crops.length === 0) {
      alert("Please fill all required fields including State and District.");
      return;
    }
    
    setIsDeploying(true);
    
    // Build location string
    let locationString = selState;
    if (selDistrict) locationString = `${selDistrict}, ` + locationString;
    if (selTaluk) locationString = `${selTaluk}, ` + locationString;
    if (selVillage) locationString = `${selVillage}, ` + locationString;

    const payload = { ...formData, location: locationString, cropsGrown: crops };
    
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
                <label className="font-black text-gray-800 dark:text-white text-sm uppercase tracking-widest">Pinpoint Location</label>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchableDropdown 
                  label="State/Territory" 
                  options={stateOptions} 
                  value={selState} 
                  onChange={handleStateChange}
                  placeholder="Select State"
                />
                <SearchableDropdown 
                  label="District" 
                  options={districtOptions} 
                  value={selDistrict} 
                  onChange={handleDistrictChange}
                  placeholder="Select District"
                  disabled={!selState}
                />
                <SearchableDropdown 
                  label="Taluk / Subdivision (Optional)" 
                  options={talukOptions} 
                  value={selTaluk} 
                  onChange={handleTalukChange}
                  placeholder="Select Taluk"
                  disabled={!selDistrict || talukOptions.length === 0}
                />
                <SearchableDropdown 
                  label="Village / City Area" 
                  options={villageOptions} 
                  value={selVillage} 
                  onChange={setSelVillage}
                  placeholder="Select Village"
                  disabled={!selTaluk || villageOptions.length === 0}
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
