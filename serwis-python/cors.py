import mlflow.pyfunc
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

models = [
    'runs:/09153a04f10f40b1b8bc91e0c69b3e72/model_rfr',
    'runs:/2d2963cd8137406084b2049cc6c8dc88/model_rfc',
    'runs:/540bc535c5444f7eb10bed44f75b8a59/model_lr',
    'runs:/b376720962d44ccaa89c4ff96ebc1d8b/model_logr',
    'runs:/f9818f8f7a26427094b52c87f2f113c1/model_dtc'
]

loaded_models = [
    mlflow.pyfunc.load_model(models[0]),
    mlflow.pyfunc.load_model(models[1]),
    mlflow.pyfunc.load_model(models[2]),
    mlflow.pyfunc.load_model(models[3]),
    mlflow.pyfunc.load_model(models[4]),
]


@app.post("/api/v1/<model_id>")
def get_prediction(model_id):
    json_data = request.get_json()
    d = {'FAILURE_TYPE': [json_data.get('failureType')], 'DATE': [json_data.get('diffDays')]}
    df = pd.DataFrame(data=d)
    df.fillna(0, inplace=True)
    result = loaded_models[int(model_id)].predict(df)
    if int(model_id) == 2:
        return str(result[0][0])
    else:
        return str(result[0])


@app.post("/api/v0/<model_id>")
def test_prediction(model_id):
    return str(5000)