import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const SCENARIOS = {
  LOW: {
    id: "low",
    temperature: 28,
    condition: "Sunny",
    rainProbability: "10%",
    riskLevel: "Low",
    suggestion: "Normal weather. Continue regular farming.",
    message: "",
    alertTitle: "",
    alertBody: "",
    alertAction: "",
    alertType: "none", // none, notification, popup
  },
  MEDIUM: {
    id: "medium",
    temperature: 31,
    condition: "Cloudy",
    rainProbability: "75%",
    riskLevel: "Medium",
    suggestion: "Cover sensitive crops.",
    message: "Rain expected tomorrow 🌧️",
    alertTitle: "",
    alertBody: "",
    alertAction: "",
    alertType: "notification",
  },
  MEDIUM_HEAT: {
    id: "medium_heat",
    temperature: 34,
    condition: "Sunny",
    rainProbability: "5%",
    riskLevel: "Medium",
    suggestion: "Water crops in evening.",
    message: "High temperature today afternoon 🌡️",
    alertTitle: "",
    alertBody: "",
    alertAction: "",
    alertType: "notification",
  },
  HIGH_RAIN: {
    id: "high_rain",
    temperature: 24,
    condition: "Heavy Rain",
    rainProbability: "98%",
    riskLevel: "High",
    suggestion: "Harvest immediately.",
    message: "Heavy Rain Warning",
    alertTitle: "🌧️ Heavy Rain Alert",
    alertBody: "Heavy rain tomorrow",
    alertAction: "Harvest now",
    alertType: "popup",
  },
  HIGH_HEAT: {
    id: "high_heat",
    temperature: 39,
    condition: "Extreme Heat",
    rainProbability: "0%",
    riskLevel: "High",
    suggestion: "Irrigate completely.",
    message: "Critical Heat Wave",
    alertTitle: "🌡️ Extreme Heat Alert",
    alertBody: "Temperature > 35°C",
    alertAction: "Irrigate today",
    alertType: "popup",
  }
};

export const WeatherProvider = ({ children }) => {
  const [scenario, setScenario] = useState(SCENARIOS.LOW);
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);

  const toggleScenario = (key) => {
    setScenario(SCENARIOS[key]);
    setIsPopupDismissed(false); // Reset popup when scenario changes
  };

  const cycleScenario = () => {
    const keys = Object.keys(SCENARIOS);
    const currentIndex = keys.findIndex(k => SCENARIOS[k].id === scenario.id);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    toggleScenario(nextKey);
  };

  return (
    <WeatherContext.Provider value={{ scenario, toggleScenario, cycleScenario, isPopupDismissed, setIsPopupDismissed, SCENARIOS }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
