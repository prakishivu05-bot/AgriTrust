import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ShieldCheck, MapPin, TrendingDown, TrendingUp, Handshake, ArrowUpDown, Search, Filter, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Button from '../components/Button';

// Mock DB mapped by crop to supply realistic fallback data
const cropMarketData = {
  "Dairy Milk": {
    avgPrice: 48, rateStr: "₹48.75/L", trend: -1.2, activeSupply: "2,350 L", isUp: false,
    mockFarmers: [
      { id: 'f1', name: "Ramesh Farm", location: "North District (3km)", quantity: 200, unit: 'L', price: 48, rating: 4.9, reliability: 98, type: 'Dairy Milk' },
      { id: 'f2', name: "Sunny Dairy Cooperative", location: "East Zone (8km)", quantity: 500, unit: 'L', price: 50, rating: 4.5, reliability: 92, type: 'Dairy Milk' },
      { id: 'f3', name: "Green Valley Fields", location: "South Village (12km)", quantity: 1500, unit: 'L', price: 45, rating: 4.8, reliability: 100, type: 'Dairy Milk' },
    ]
  },
  "Tomato": {
    avgPrice: 32, rateStr: "₹32.50/Kg", trend: 4.5, activeSupply: "8,400 Kg", isUp: true,
    mockFarmers: [
      { id: 't1', name: "Red Ruby Farms", location: "Western Plains (15km)", quantity: 800, unit: 'Kg', price: 30, rating: 4.7, reliability: 94, type: 'Tomato' },
      { id: 't2', name: "Vikas Agrotech", location: "Central Hub (5km)", quantity: 2100, unit: 'Kg', price: 34, rating: 4.1, reliability: 89, type: 'Tomato' },
    ]
  },
  "Coconut": {
    avgPrice: 24, rateStr: "₹24.00/Nut", trend: 0.8, activeSupply: "12,000 Nuts", isUp: true,
    mockFarmers: [
      { id: 'c1', name: "Coastal Estates", location: "South Region (40km)", quantity: 5000, unit: 'Nuts', price: 23, rating: 4.9, reliability: 99, type: 'Coconut' },
    ]
  },
  "Paddy": {
    avgPrice: 2200, rateStr: "₹2,200/Quintal", trend: -0.5, activeSupply: "450 Quintals", isUp: false,
    mockFarmers: [
      { id: 'p1', name: "Golden Fields", location: "River Basin (25km)", quantity: 150, unit: 'Qtls', price: 2150, rating: 4.4, reliability: 91, type: 'Paddy' },
      { id: 'p2', name: "Kisan Cooperative", location: "East Taluk (18km)", quantity: 300, unit: 'Qtls', price: 2250, rating: 4.8, reliability: 96, type: 'Paddy' },
    ]
  }
};

const availableCrops = Object.keys(cropMarketData);

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [profileComplete, setProfileComplete] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState("Dairy Milk");
  const [farmers, setFarmers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'asc' });

  // Init Data and Check Profile
  useEffect(() => {
    // 1. Check Identity
    if (!localStorage.getItem('vendor_profile')) {
      setProfileComplete(false);
    }
    
    // 2. Fetch Active Blockchain farmers and merge with Mocks
    fetchAndSetFarmers(selectedCrop);
  }, [selectedCrop]);

  const fetchAndSetFarmers = (crop) => {
    // Start with Mocks
    let currentFarmers = [...cropMarketData[crop].mockFarmers];

    // Read real farmers from LocalStorage 'farmer_profile'
    const rawLocalFarmer = localStorage.getItem('farmer_profile');
    if (rawLocalFarmer) {
      const localFarmer = JSON.parse(rawLocalFarmer);
      
      // If the real farmer grows this crop, inject them into the marketplace!
      // Convert to lowercase to be safe but the mock uses Capitalized. We will regex check
      const growsCrop = localFarmer.cropsGrown && localFarmer.cropsGrown.some(c => c.toLowerCase() === crop.toLowerCase());
      
      if (growsCrop || (crop === "Dairy Milk" && localFarmer.cropsGrown.length === 0)) { // Fallback logic
         currentFarmers.unshift({
           id: localFarmer.blockchainId || 'local_1',
           name: localFarmer.name + " (Verified)",
           location: localFarmer.location || "Local District",
           quantity: (parseFloat(localFarmer.landOwned || 1) * 800), // Mock scale logic
           unit: cropMarketData[crop].mockFarmers[0]?.unit || 'Kg',
           price: cropMarketData[crop].avgPrice - 2, // Undercut the average dynamically
           rating: 5.0, // New farmers start at 5 stars in MVP
           reliability: 100, // Blockchain immutable
           type: crop
         });
      }
    }

    setFarmers(currentFarmers);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    
    const sorted = [...farmers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setFarmers(sorted);
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" } } };

  const currentMarket = cropMarketData[selectedCrop];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-24">
      
      {/* Role verified by Landing.jsx Auth Router */}

      <header className="space-y-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
             Vendor Marketplace <Store className="text-blue-500" />
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Source high-quality produce with absolute blockchain trust.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/vendor/orders')} variant="outline" className="border-gray-200 dark:border-gray-700">My Orders</Button>
          <Button onClick={() => navigate('/vendor/payments')} className="bg-blue-600 hover:bg-blue-700">Ledger</Button>
        </div>
      </header>

      {/* Dynamic Crop Selection Filter Bar */}
      <motion.div variants={item} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-3 items-center w-max">
          <div className="flex items-center gap-2 text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mr-2">
             <Filter size={14} /> COMMODITY:
          </div>
          {availableCrops.map(crop => (
             <button
               key={crop}
               onClick={() => setSelectedCrop(crop)}
               className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all border-2 text-sm shadow-sm ${
                 selectedCrop === crop 
                   ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/30'
                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
               }`}
             >
               {crop === 'Tomato' && '🍅 '}
               {crop === 'Coconut' && '🥥 '}
               {crop === 'Paddy' && '🌾 '}
               {crop === 'Dairy Milk' && '🥛 '}
               {crop}
             </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/30 border-none shadow-sm p-6">
          <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">Avg Market Price</span>
          <p className="text-3xl font-black text-blue-900 dark:text-blue-100 mt-2 mb-1">{currentMarket.rateStr.split('/')[0]}<span className="text-lg font-bold text-blue-700 dark:text-blue-300 opacity-80">/{currentMarket.rateStr.split('/')[1]}</span></p>
          <span className={`text-sm font-bold flex items-center gap-1 ${currentMarket.trend >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
            {currentMarket.trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />} 
            {Math.abs(currentMarket.trend)}% today
          </span>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/30 border-none shadow-sm p-6">
          <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Active Market Supply</span>
          <p className="text-3xl font-black text-indigo-900 dark:text-indigo-100 mt-2 mb-1">{currentMarket.activeSupply}</p>
          <span className="text-sm text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-1"><Leaf size={16} /> Verified Grades Only</span>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col justify-center">
            <div className="flex bg-white dark:bg-gray-950 rounded-lg p-2 items-center border border-gray-200 dark:border-gray-800 focus-within:ring-2 ring-blue-500 mb-3">
              <Search className="text-gray-400 mx-2" size={20} />
              <input type="text" placeholder={`Search ${selectedCrop} farmers...`} className="bg-transparent border-none w-full outline-none text-gray-900 dark:text-white" />
            </div>
            <div className="flex gap-2">
              <button disabled className="flex-1 text-sm font-semibold flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-2 rounded-lg text-gray-400 dark:text-gray-500 cursor-not-allowed">
                Advanced Filter (Coming Soon)
              </button>
            </div>
        </Card>
      </motion.div>

      <motion.section variants={item} className="pt-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('name')}>
                    Farmer <ArrowUpDown size={12} className="inline ml-1" />
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('price')}>
                    Price/Unit <ArrowUpDown size={12} className="inline ml-1" />
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('quantity')}>
                    Avail. Qty <ArrowUpDown size={12} className="inline ml-1" />
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:table-cell" onClick={() => handleSort('rating')}>
                    Quality Rating <ArrowUpDown size={12} className="inline ml-1" />
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden md:table-cell" onClick={() => handleSort('reliability')}>
                    Fulfillment <ArrowUpDown size={12} className="inline ml-1" />
                  </th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {farmers.map((farmer) => (
                  <tr key={farmer.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        {farmer.name} {farmer.reliability > 95 && <ShieldCheck size={16} className="text-blue-500" title="High Trust" />}
                      </div>
                      <div className="text-sm font-medium text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> {farmer.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xl font-black text-blue-600 dark:text-blue-400">₹{farmer.price}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-gray-900 dark:text-gray-200">{farmer.quantity} <span className="text-xs text-gray-500">{farmer.unit}</span></span>
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-1.5 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${Math.min((farmer.quantity/5000)*100, 100)}%` }} />
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        ★ {farmer.rating}
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${farmer.reliability >= 95 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'}`}>
                        {farmer.reliability}% Escrow
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button onClick={() => navigate(`/vendor/farmers/${farmer.id}`, { state: { farmer } })} variant="primary" className="py-2 px-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default VendorDashboard;
