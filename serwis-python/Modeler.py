import mlflow
import pandas as pd
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
import warnings

from sklearn.tree import DecisionTreeClassifier

warnings.filterwarnings('ignore')

pd.set_option("display.max_rows", 50)
pd.set_option("display.max_columns", 1000)
pd.set_option("display.expand_frame_repr", True)
pd.set_option('display.width', 1000)

mlflow.set_tracking_uri(uri="http://127.0.0.1:8090")
mlflow.set_experiment(experiment_id="0")
mlflow.autolog()

df = pd.read_csv('failures_data.csv')
df['DATE'] = pd.to_datetime(df['DATE'])
df['POTENTIAL_DATA'] = pd.to_datetime(df['POTENTIAL_DATA'])
df.loc[:, 'DATE'] = df['DATE'].apply(lambda x: x.toordinal())
df.loc[:, 'POTENTIAL_DATA'] = df['POTENTIAL_DATA'].apply(lambda x: x.toordinal())
df['DATE'] = df['POTENTIAL_DATA'] - df['DATE']


def numeric(s):
    if s == "Low":
        return 0
    elif s == "Mild":
        return 1
    elif s == "High":
        return 2
    elif s == "Critical":
        return 3


df['FAILURE_TYPE'] = df['FAILURE_TYPE'].apply(numeric)
X = df[['FAILURE_TYPE', 'DATE']]
Y = df[['POTENTIAL_PRICE']]
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=33)
print(X_test)
# with mlflow.start_run(run_name="v1/lr"):
#     regressor = LinearRegression()
#     regressor.fit(X_train, Y_train)
#     mlflow.sklearn.log_model(regressor, "model_lr")
#
# with mlflow.start_run(run_name="v1/rfr"):
#     regressor = RandomForestRegressor()
#     regressor.fit(X_train, Y_train)
#     mlflow.sklearn.log_model(regressor, "model_rfr")
#
# with mlflow.start_run(run_name="v1/logr"):
#     regressor = LogisticRegression()
#     regressor.fit(X_train, Y_train)
#     mlflow.sklearn.log_model(regressor, "model_logr")
#
# with mlflow.start_run(run_name="v1/rfc"):
#     classifier = RandomForestClassifier()
#     classifier.fit(X_train, Y_train)
#     mlflow.sklearn.log_model(classifier, "model_rfc")
#
# with mlflow.start_run(run_name="v1/dtc"):
#     classifier = DecisionTreeClassifier()
#     classifier.fit(X_train, Y_train)
#     mlflow.sklearn.log_model(classifier, "model_dtc")

