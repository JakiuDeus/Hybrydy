import mlflow
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import root_mean_squared_error, accuracy_score, precision_score, f1_score
import warnings

from sklearn.tree import DecisionTreeClassifier

warnings.filterwarnings('ignore')

mlflow.set_tracking_uri(uri="http://127.0.0.1:8090")
mlflow.set_experiment(experiment_id="0")
mlflow.autolog()

df = pd.read_csv('failures_data.csv')
df['DATE'] = pd.to_datetime(df['DATE'])
df['POTENTIAL_DATA'] = pd.to_datetime(df['POTENTIAL_DATA'])

X = df[['FAILURE_TYPE', 'NAME', 'DATE']]
y_price = df['POTENTIAL_PRICE']
y_date = df['POTENTIAL_DATA']

X.loc[:, 'DATE'] = X['DATE'].apply(lambda x: x.toordinal())
y_date = y_date.apply(lambda x: x.toordinal())
y_date = y_date - X['DATE']
X['DATE'] = y_date
X = pd.get_dummies(X, columns=['FAILURE_TYPE', 'NAME'], drop_first=True)

X_train, X_test, y_price_train, y_price_test = train_test_split(X, y_price, test_size=0.2, random_state=33)
_, _, y_date_train, y_date_test = train_test_split(X, y_date, test_size=0.2, random_state=33)

with mlflow.start_run(run_name="model_price/linear_regression"):
    regressor_price = LinearRegression()
    regressor_price.fit(X_train, y_price_train)
    y_price_pred = regressor_price.predict(X_test)
    root_mean_squared_error_price = root_mean_squared_error(y_price_test, y_price_pred)
    print(f'Linear Regression: RMSE dla POTENTIAL_PRICE: {root_mean_squared_error_price}')
    mlflow.log_metric("RMSE_price_lr", root_mean_squared_error_price)
    mlflow.sklearn.log_model(regressor_price, "model_price_lr")

with mlflow.start_run(run_name="model_price/random_forest_regression"):
    regressor_price = RandomForestRegressor()
    regressor_price.fit(X_train, y_price_train)
    y_price_pred = regressor_price.predict(X_test)
    root_mean_squared_error_price = root_mean_squared_error(y_price_test, y_price_pred)
    print(f'Random Forest Regression: RMSE dla POTENTIAL_PRICE: {root_mean_squared_error_price}')
    mlflow.log_metric("RMSE_price_rfr", root_mean_squared_error_price)
    mlflow.sklearn.log_model(regressor_price, "model_price_rfr")

with mlflow.start_run(run_name="model_date/linear_regression"):
    regressor_date = LinearRegression()
    regressor_date.fit(X_train, y_date_train)
    y_date_pred = regressor_date.predict(X_test)
    root_mean_squared_error_date = root_mean_squared_error(y_date_test, y_date_pred)
    print(f'Linear Regression: RMSE dla POTENTIAL_DATA: {root_mean_squared_error_date}')
    mlflow.log_metric("RMSE_date_lr", root_mean_squared_error_date)
    mlflow.sklearn.log_model(regressor_date, "model_date_lr")

with mlflow.start_run(run_name="model_date/random_forest_regression"):
    regressor_date = RandomForestRegressor()
    regressor_date.fit(X_train, y_date_train)
    y_date_pred = regressor_date.predict(X_test)
    root_mean_squared_error_date = root_mean_squared_error(y_date_test, y_date_pred)
    print(f'Random Forest Regression: RMSE dla POTENTIAL_DATA: {root_mean_squared_error_date}')
    mlflow.log_metric("RMSE_date_rfr", root_mean_squared_error_date)
    mlflow.sklearn.log_model(regressor_date, "model_date_rfr")
