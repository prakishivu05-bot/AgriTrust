import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import pickle
import random

print("Generating synthetic crop data for ML Model...")

# Constants mapped directly from Frontend Logic
# Tomato: 0, Coconut: 1, Paddy: 2, Dairy Milk: 3, Banana: 4, Sugarcane: 5, Mango: 6
crops = ['tomato', 'coconut', 'paddy', 'dairy milk', 'banana', 'sugarcane', 'mango']
crop_map = {crop: idx for idx, crop in enumerate(crops)}

# Base prices per kg roughly mapping to real world MVP
# Grade A, Grade B, Grade C
base_prices = {
    'tomato': [40, 25, 10], 
    'coconut': [30, 20, 8],
    'paddy': [25, 18, 12],
    'dairy milk': [55, 45, 30],
    'banana': [35, 20, 10],
    'sugarcane': [15, 10, 5],
    'mango': [80, 50, 20]
}

data = []

# Generate 5000 rows of synthetic sales data
for _ in range(5000):
    crop_name = random.choice(crops)
    crop_id = crop_map[crop_name]
    
    # Generate random quantities between 10 to 500 kg
    qty_a = random.randint(0, 500)
    qty_b = random.randint(0, 500)
    qty_c = random.randint(0, 500)
    
    is_pooled = random.choice([0, 1])
    cluster_size = random.randint(2, 10) if is_pooled else 1
    
    prices = base_prices[crop_name]
    
    # Calculate base raw profit
    profit = (qty_a * prices[0]) + (qty_b * prices[1]) + (qty_c * prices[2])
    
    # Add pooling premium (approx +35% total, heavily weighted to A & B grades for bulk supermarket sale)
    if is_pooled:
        markup = 1.35 + random.uniform(-0.05, 0.05) # Add a tiny bit of noise
        profit *= markup
        
    data.append([crop_id, qty_a, qty_b, qty_c, is_pooled, cluster_size, profit])

df = pd.DataFrame(data, columns=['crop_id', 'grade_a', 'grade_b', 'grade_c', 'is_pooled', 'cluster_size', 'profit'])

X = df[['crop_id', 'grade_a', 'grade_b', 'grade_c', 'is_pooled', 'cluster_size']]
y = df['profit']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Random Forest Regressor Model...")
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

preds = rf.predict(X_test)
mae = mean_absolute_error(y_test, preds)
print(f"Model Trained Successfully! Mean Error Margin: ₹{mae:.2f}")

# Save the model
with open('agritrust_model.pkl', 'wb') as f:
    pickle.dump(rf, f)

print("Model saved to agritrust_model.pkl") 
