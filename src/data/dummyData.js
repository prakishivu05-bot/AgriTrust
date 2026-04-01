// src/data/dummyData.js

export const buyers = [
  { id: 'b1', name: "Hotel Sunrise", type: "Hotel", price: 220, distance: "2 km", rating: 4.8 },
  { id: 'b2', name: "FreshMart Retail", type: "Retailer", price: 200, distance: "1 km", rating: 4.5 },
  { id: 'b3', name: "Local Direct Consumers", type: "Direct Consumer", price: 240, distance: "3 km", rating: 4.9 },
];

export const transactions = [
  { id: "TXN001", type: "Milk", quantity: 50, amount: 2500, status: "Completed", date: "2026-03-25" },
  { id: "TXN002", type: "Poultry", quantity: 100, amount: 15000, status: "In Delivery", date: "2026-03-30" },
  { id: "TXN003", type: "Milk", quantity: 120, amount: 6000, status: "Payment Locked", date: "2026-04-01" },
];

export const priceTrends = {
  poultry: { current: 150, trend: "+5% vs yesterday" },
  dairy: { current: 50, trend: "+2% vs yesterday" },
};
