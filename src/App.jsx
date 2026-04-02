import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import FarmerProfileSetup from './pages/FarmerProfileSetup';
import FarmerProfileView from './pages/FarmerProfileView';
import SmartRouting from './pages/SmartRouting';
import SmartUtilizationPlan from './pages/SmartUtilizationPlan';
import DairyLedger from './pages/DairyLedger';
import FarmerOrders from './pages/FarmerOrders';
import FarmerPayments from './pages/FarmerPayments';
import SchemesDashboard from './pages/SchemesDashboard';
import SchemeDetail from './pages/SchemeDetail';
import SchemeApplication from './pages/SchemeApplication';
import SchemeStatus from './pages/SchemeStatus';
import VendorProfileSetup from './pages/VendorProfileSetup';
import FarmerDetail from './pages/FarmerDetail';
import FarmerPooling from './pages/FarmerPooling';
import VendorOrders from './pages/VendorOrders';
import VendorPayments from './pages/VendorPayments';
import Suggestion from './pages/Suggestion';
import BuyerSelection from './pages/BuyerSelection';
import Transaction from './pages/Transaction';
import History from './pages/History';
import Splash from './components/Splash';
import MLForecast from './components/MLForecast';
import FarmConnect from './pages/FarmConnect';
import FarmCluster from './pages/FarmCluster';
import { ThemeProvider } from './contexts/ThemeContext';
import { WeatherProvider } from './contexts/WeatherContext';
import { FarmConnectProvider } from './contexts/FarmConnectContext';
import './i18n'; // initialize i18n globally

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <WeatherProvider>
        <FarmConnectProvider>
          {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
          <Router>
          <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 font-sans selection:bg-emerald-200 text-gray-900 dark:text-gray-100 pb-16 sm:pb-0 transition-colors duration-500 ${showSplash ? 'fixed inset-0 overflow-hidden' : ''}`}>
            <Navbar />
            <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/farmer" element={<Dashboard />} />
              <Route path="/vendor" element={<VendorDashboard />} />
              
              {/* Farmer MVP Routes */}
              <Route path="/farmer/profile-setup" element={<FarmerProfileSetup />} />
              <Route path="/farmer/dairy-ledger" element={<DairyLedger />} />
              <Route path="/farmer/orders" element={<FarmerOrders />} />
              <Route path="/farmer/payments" element={<FarmerPayments />} />
              <Route path="/farmer/forecast" element={<MLForecast />} />
              <Route path="/farmer/utilization" element={<SmartRouting />} />
              <Route path="/farmer/pooling" element={<FarmerPooling />} />
              <Route path="/farmer/connect" element={<FarmConnect />} />
              <Route path="/farmer/cluster/:id" element={<FarmCluster />} />
              <Route path="/farmer/smart-utilization" element={<SmartUtilizationPlan />} />
              <Route path="/farmer/schemes" element={<SchemesDashboard />} />
              <Route path="/farmer/schemes/status" element={<SchemeStatus />} />
              <Route path="/farmer/schemes/:id" element={<SchemeDetail />} />
              <Route path="/farmer/schemes/:id/apply" element={<SchemeApplication />} />
              
              {/* Vendor MVP Routes */}
              <Route path="/vendor/profile-setup" element={<VendorProfileSetup />} />
              <Route path="/vendor/farmer-profile/:id" element={<FarmerProfileView />} />
              <Route path="/vendor/farmers/:id" element={<FarmerDetail />} />
              <Route path="/vendor/orders" element={<VendorOrders />} />
              <Route path="/vendor/payments" element={<VendorPayments />} />
              
              <Route path="/smart-routing" element={<SmartRouting />} />
              <Route path="/suggestion" element={<Suggestion />} />
              <Route path="/buyer-selection" element={<BuyerSelection />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/history" element={<History />} />
            </Routes>
            </main>
          </div>
        </Router>
        </FarmConnectProvider>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
