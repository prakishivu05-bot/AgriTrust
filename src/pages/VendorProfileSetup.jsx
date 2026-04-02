import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShieldCheck, ArrowLeft, Building2, Phone } from 'lucide-react';
import { HybridBlockchain } from '../utils/blockchain';

const VendorProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    location: '',
    companyType: 'Wholesale Buyer', // new
    expectedVolume: '', // new
    licenseNumber: ''
  });
  
  const [isDeploying, setIsDeploying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.phone || !formData.location) {
      alert("Please fill all required fields.");
      return;
    }
    
    setIsDeploying(true);
    
    try {
      // Execute true cryptographic signature via Metamask, or fallback to mock
      await HybridBlockchain.deployVendorIdentity(formData);
      setIsDeploying(false);
      navigate('/vendor');
    } catch (e) {
      console.error(e);
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 pb-24 font-sans">
      <div className="max-w-xl mx-auto space-y-6 pt-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/')}
            className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 active:scale-95 transition-transform shrink-0"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              Vendor Identity <ShieldCheck className="text-blue-500" />
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
              Store your verifiable buyer profile on the blockchain.
            </p>
          </div>
          {localStorage.getItem('vendor_profile') && (
            <button onClick={() => navigate('/vendor')} className="ml-auto bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors">
              Skip to Dashboard
            </button>
          )}
        </div>

        {isDeploying ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center space-y-6 text-center">
             <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900/40 border-t-blue-500 rounded-full animate-spin" />
             <div>
               <h3 className="text-xl font-black text-gray-900 dark:text-white">Minting Verified Buyer ID...</h3>
               <p className="text-gray-500 font-medium">Securing immutable identity records.</p>
             </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 rounded-2xl flex items-center gap-3">
               <Store className="text-blue-500 shrink-0" size={24} />
               <p className="text-blue-800 dark:text-blue-300 text-sm font-semibold leading-snug">
                 Creating a verified Vendor Identity establishes trust with automated grading nodes and high-quality farmers.
               </p>
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Business / Vendor Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  required
                  type="text"
                  value={formData.businessName}
                  onChange={e => setFormData({...formData, businessName: e.target.value})}
                  placeholder="e.g. FreshMart Organics"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="10 digit number"
                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl py-4 pl-12 pr-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Business Location <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="City, State"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Company Type <span className="text-red-500">*</span></label>
                <select 
                  value={formData.companyType}
                  onChange={e => setFormData({...formData, companyType: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                >
                   <option>Wholesale Buyer</option>
                   <option>Retail Supermarket</option>
                   <option>Food Processor</option>
                   <option>Restaurant Chain</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Expected Monthly Volume (Kg) <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="number"
                  value={formData.expectedVolume}
                  onChange={e => setFormData({...formData, expectedVolume: e.target.value})}
                  placeholder="e.g. 5000"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">GSTIN / Business License (Optional)</label>
              <input 
                type="text"
                value={formData.licenseNumber}
                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
                placeholder="e.g. 29ABCDE1234F1Z5"
                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
              />
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

export default VendorProfileSetup;
