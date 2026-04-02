import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Sprout, Clock, Hexagon, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const FarmerProfileView = () => {
  const navigate = useNavigate();
  // In a real app we'd fetch based on an ID. Here we just grab from localStorage.
  const [profile, setProfile] = useState(null);
  const [vendorRating, setVendorRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulated Blockchain read
    const rawData = localStorage.getItem('farmer_profile');
    if (rawData) {
      setProfile(JSON.parse(rawData));
    } else {
      // Mock data if none exists
      setProfile({
        name: 'Ramesh Kumar',
        location: 'Palakkad, Kerala',
        landOwned: '5.5',
        experience: '12',
        cropsGrown: ['Coconut', 'Banana'],
        blockchainId: '0x7F2e1...B8a4',
        ratings: [4, 5, 4]
      });
    }
  }, []);

  const submitRating = () => {
    if (vendorRating === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      // Simulate smart contract write
      const updatedProfile = { ...profile };
      updatedProfile.ratings = [...(updatedProfile.ratings || []), vendorRating];
      
      localStorage.setItem('farmer_profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setVendorRating(0); // reset
      setIsSubmitting(false);
    }, 1500);
  };

  if (!profile) return <div className="p-8 text-center text-gray-500">Loading blockchain records...</div>;

  const averageRating = profile.ratings && profile.ratings.length > 0 
    ? (profile.ratings.reduce((a, b) => a + b, 0) / profile.ratings.length).toFixed(1)
    : 'New';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-32">
      
      {/* Header Banner */}
      <div className="h-32 bg-blue-600 dark:bg-blue-800 w-full relative">
         <button 
           onClick={() => navigate(-1)} // usually goes back to vendor dashboard
           className="absolute top-6 left-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white backdrop-blur-sm transition-colors"
         >
           <ArrowLeft size={20} />
         </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative -mt-12 space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                  {profile.name}
                </h1>
                <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 p-1.5 rounded-full" title="Blockchain Verified">
                  <ShieldCheck size={20} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                <MapPin size={16} /> {profile.location}
              </div>
            </div>

            {/* Read Only Average Rating */}
            <div className="bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-2xl border border-orange-100 dark:border-orange-800/40 flex items-center gap-2">
               <Star className="text-orange-500" fill="currentColor" size={24} />
               <div className="flex flex-col">
                 <span className="text-2xl font-black text-orange-600 dark:text-orange-400 leading-none">{averageRating}</span>
                 <span className="text-[10px] uppercase font-bold text-orange-500/70">{profile.ratings?.length || 0} Reviews</span>
               </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-750 flex items-center gap-3">
              <Hexagon className="text-emerald-500" />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total Land</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{profile.landOwned} Acres</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-750 flex items-center gap-3">
              <Clock className="text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Experience</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{profile.experience} Yrs</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sprout size={16} /> Verified Crops
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.cropsGrown?.map((c, i) => (
                <span key={i} className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-xl font-bold">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Blockchain ID */}
        <div className="text-center font-mono text-xs text-gray-400 dark:text-gray-500 flex items-center justify-center gap-2">
           <ShieldCheck size={14} /> Immutable ID: {profile.blockchainId || '0x...'}
        </div>

        {/* Vendor Rating UI (Only for Vendors) */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl mt-8">
          <h3 className="text-xl font-black text-white mb-2">Leave a Rating</h3>
          <p className="text-slate-400 font-medium text-sm mb-6">Vendors, your feedback is recorded on the blockchain and contributes to trust scores.</p>
          
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map(star => (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                key={star} 
                onClick={() => setVendorRating(star)}
                className="focus:outline-none"
              >
                <Star 
                  size={36} 
                  className={`transition-colors duration-200 ${vendorRating >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} 
                />
              </motion.button>
            ))}
          </div>

          <button 
            disabled={vendorRating === 0 || isSubmitting}
            onClick={submitRating}
            className={`w-full p-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all ${
              vendorRating > 0 && !isSubmitting
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-xl shadow-amber-500/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 text-white">
                <ShieldCheck className="animate-pulse" /> Confirming transaction...
              </span>
            ) : "SUBMIT RATING"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FarmerProfileView;
