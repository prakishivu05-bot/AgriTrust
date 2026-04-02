from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
# Enable CORS for React Frontend communication
CORS(app)

# Load the trained Pickled Random Forest model
try:
    with open('agritrust_model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("✅ Successfully Loaded AgriTrust ML Model!")
except Exception as e:
    print(f"❌ Failed to load model. Did you run train_model.py? Error: {e}")

crop_map = {
    'tomato': 0, 'coconut': 1, 'paddy': 2, 'dairy milk': 3, 
    'banana': 4, 'sugarcane': 5, 'mango': 6
}

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"status": "AgriTrust Machine Learning Node Online", "version": "1.0"})

@app.route('/api/predict_profit', methods=['POST'])
def predict_profit():
    data = request.json
    
    # Defaults in case malformed
    crop_str = str(data.get('cropKey', 'tomato')).lower()
    crop_id = crop_map.get(crop_str, 0)
    
    qa = int(data.get('gradeA', 0))
    qb = int(data.get('gradeB', 0))
    qc = int(data.get('gradeC', 0))
    
    # We predict both the individual standalone profit vs pooled profit
    
    # Standalone (0, 1)
    input_standalone = np.array([[crop_id, qa, qb, qc, 0, 1]])
    pred_standalone = model.predict(input_standalone)[0]
    
    # Pooled (+ mock extra farmers contributing)
    cluster_size = int(data.get('clusterSize', 3))
    # Approximate regional aggregation scaling the total quantity entered
    input_pooled = np.array([[crop_id, qa * cluster_size, qb * cluster_size, qc * cluster_size, 1, cluster_size]])
    pred_pooled_total = model.predict(input_pooled)[0]
    
    # The farmer's prorated cut of the massive pool
    pred_farmer_cut = pred_pooled_total / cluster_size if cluster_size > 0 else pred_standalone
    
    return jsonify({
        "status": "success",
        "crop": crop_str,
        "input_quantities": {"A": qa, "B": qb, "C": qc},
        "predictions": {
            "individual_profit": round(pred_standalone, 2),
            "pooled_profit": round(pred_farmer_cut, 2),
            "percentage_gain": round(((pred_farmer_cut - pred_standalone) / pred_standalone) * 100, 1) if pred_standalone > 0 else 0
        }
    })

if __name__ == '__main__':
    print("🚀 AgriTrust Model API Running on port 5000...")
    app.run(host='127.0.0.1', port=5000, debug=True)
