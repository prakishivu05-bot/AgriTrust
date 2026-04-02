import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ChevronRight, UploadCloud, Link as LinkIcon, FileText } from 'lucide-react';
import schemesData from '../data/schemesData.json';

const SchemeApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scheme = schemesData.find(s => s.id === id);
  
  const [profile, setProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    aadhaar: '',
    bankAccount: '',
    ifsc: ''
  });

  useEffect(() => {
    const rawData = localStorage.getItem('farmer_profile');
    if (rawData) setProfile(JSON.parse(rawData));
  }, []);

  if (!scheme) return <div className="p-8 text-center text-gray-500">Scheme not found.</div>;
  if (!profile) return (
    <div className="p-8 text-center bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Farmer Identity Required</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">You must set up your verified profile to apply for schemes.</p>
      <button onClick={() => navigate('/farmer/profile-setup')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Go to Identity Setup</button>
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aadhaar || !formData.bankAccount) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      // Simulate writing to blockchain / status DB
      const apps = JSON.parse(localStorage.getItem('scheme_applications') || '[]');
      
      const newApp = {
        id: 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        schemeId: scheme.id,
        schemeName: scheme.shortName,
        benefitType: scheme.benefitType,
        expectedBenefit: scheme.benefitType === 'cash' ? 6000 : null, // Mock standard cash value, or null for percentage
        status: 'Pending',
        appliedAt: new Date().toISOString(),
      };
      
      localStorage.setItem('scheme_applications', JSON.stringify([...apps, newApp]));
      setIsSubmitting(false);
      navigate('/farmer/schemes/status');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-32">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6 sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
             <ChevronRight className="rotate-180" size={28} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              Apply Application 
            </h1>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{scheme.shortName}</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
         
         {/* Trust Banner */}
         <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-2xl flex items-start gap-4 shadow-sm">
            <div className="bg-emerald-100 dark:bg-emerald-800 p-2 rounded-full shrink-0">
               <ShieldCheck className="text-emerald-600 dark:text-emerald-300" size={24} />
            </div>
            <div>
              <h3 className="text-emerald-900 dark:text-emerald-100 font-black tracking-wide">Tamper-proof Submission</h3>
              <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium mt-1 leading-snug">
                Your data is cryptographically secured. Core details are auto-filled from your Blockchain Identity.
              </p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Display Auto Filled Data */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-bl-2xl text-xs font-bold uppercase flex items-center gap-1 shadow-sm border-l border-b border-blue-100 dark:border-blue-800">
                  <LinkIcon size={12} /> Auto-Linked
               </div>

               <h4 className="text-lg font-black text-gray-900 dark:text-white mb-2 pb-2 border-b border-gray-100 dark:border-gray-750">
                 Verified Land Details
               </h4>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest font-bold text-gray-400">Total Land</span>
                    <span className="text-lg font-black text-gray-900 dark:text-white">{profile.landOwned} Acres</span>
                  </div>
                  <div>
                    <span className="block text-[11px] uppercase tracking-widest font-bold text-gray-400">Location</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1" title={profile.location}>{profile.location}</span>
                  </div>
               </div>
               <div>
                  <span className="block text-[11px] uppercase tracking-widest font-bold text-gray-400 mt-2">Verified Primary Crops</span>
                  <div className="flex gap-2 mt-1">
                    {profile.cropsGrown.slice(0,3).map(c => 
                       <span key={c} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300">{c}</span>
                    )}
                    {profile.cropsGrown.length > 3 && <span className="text-xs text-gray-500 font-bold px-2 py-1">+{profile.cropsGrown.length-3} more</span>}
                  </div>
               </div>
            </div>

            {/* Application specific fields */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 space-y-5">
               <h4 className="text-lg font-black text-gray-900 dark:text-white">Required Information</h4>
               
               <div>
                 <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Aadhaar Number <span className="text-red-500">*</span></label>
                 <input 
                   required
                   type="text"
                   pattern="\d{12}"
                   maxLength="12"
                   value={formData.aadhaar}
                   onChange={e => setFormData({...formData, aadhaar: e.target.value.replace(/\D/g, '')})}
                   placeholder="12 digit Aadhaar"
                   className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-lg font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                 />
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">Bank Account <span className="text-red-500">*</span></label>
                    <input 
                      required
                      type="text"
                      value={formData.bankAccount}
                      onChange={e => setFormData({...formData, bankAccount: e.target.value.replace(/\D/g, '')})}
                      placeholder="Account Number"
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 dark:text-gray-400 font-bold mb-2 text-xs uppercase tracking-wider">IFSC Code <span className="text-red-500">*</span></label>
                    <input 
                      required
                      type="text"
                      value={formData.ifsc}
                      onChange={e => setFormData({...formData, ifsc: e.target.value.toUpperCase()})}
                      placeholder="e.g. SBIN0001234"
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 text-base font-bold text-gray-900 dark:text-white focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
               </div>

               {scheme.documentsRequired?.length > 0 && (
                 <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-750">
                    <label className="block text-gray-600 dark:text-gray-400 font-bold mb-3 text-xs uppercase tracking-wider">Supporting Documents</label>
                    <div className="bg-gray-50 dark:bg-gray-900/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                       <UploadCloud size={32} className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                       <span className="text-gray-900 dark:text-white font-bold mb-1 tracking-wide">Upload Documents</span>
                       <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 max-w-xs leading-snug">
                         Patta/Chitta, Passbook, Quotations. Max 5MB total.
                       </span>
                    </div>
                 </div>
               )}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white rounded-2xl p-4 text-xl font-black shadow-lg transition-all flex justify-center items-center gap-2 ${
                isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed hidden' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 active:scale-95'
              }`}
            >
               SUBMIT SECURE RECORD
            </button>

            {isSubmitting && (
               <div className="w-full bg-blue-600 rounded-2xl p-4 flex items-center justify-center gap-3">
                 <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin shrink-0" />
                 <span className="text-white font-black text-xl">Deploying Application...</span>
               </div>
            )}
         </form>

      </div>
    </div>
  );
};

export default SchemeApplication;
