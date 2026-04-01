import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import SmartRouting from './pages/SmartRouting';
import AddMilk from './pages/AddMilk';
import FarmerOrders from './pages/FarmerOrders';
import FarmerPayments from './pages/FarmerPayments';
import FarmerDetail from './pages/FarmerDetail';
import VendorOrders from './pages/VendorOrders';
import VendorPayments from './pages/VendorPayments';
import Suggestion from './pages/Suggestion';
import BuyerSelection from './pages/BuyerSelection';
import Transaction from './pages/Transaction';
import History from './pages/History';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n'; // initialize i18n globally

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans selection:bg-emerald-200 text-gray-900 dark:text-gray-100 pb-16 sm:pb-0 transition-colors duration-500">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/farmer" element={<Dashboard />} />
              <Route path="/vendor" element={<VendorDashboard />} />
              
              {/* Farmer MVP Routes */}
              <Route path="/farmer/add-milk" element={<AddMilk />} />
              <Route path="/farmer/orders" element={<FarmerOrders />} />
              <Route path="/farmer/payments" element={<FarmerPayments />} />
              
              {/* Vendor MVP Routes */}
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
    </ThemeProvider>
  );
}

export default App;
