import pickle
from flask import Flask, request, jsonify
from naive_bayes_model import NaiveBayes
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and preprocess data
spam_df = pd.read_csv("spam.csv")
spam_df['spam'] = spam_df['Category'].apply(lambda x: 1 if x == 'spam' else 0)
x_train, _, y_train, _ = train_test_split(spam_df.Message, spam_df.spam, test_size=0.2)  # No need for test split
cv = CountVectorizer()
x_train_count = cv.fit_transform(x_train.values)

# Train model
nb = NaiveBayes()
nb.fit(x_train_count.toarray(), y_train)

# Save the model
with open('naive_bayes_model.pkl', 'wb') as file:
    pickle.dump(nb, file)

@app.route('/predict', methods=['POST'])
def predict_spam():
    # Load model
    with open('naive_bayes_model.pkl', 'rb') as file:
        nb = pickle.load(file)

    # Get email text from request
    email_text = request.json['email']

    # Convert email to count vector
    email_count = cv.transform([email_text])

    # Predict spam or not
    prediction = nb.predict(email_count.toarray())

    # Return prediction result
    if prediction[0] == 1:
        return jsonify({'prediction': 'Spam'})
    else:
        return jsonify({'prediction': 'Not spam'})
    
@app.route('/accuracy', methods=['GET'])
def get_accuracy():
    # Load model
    with open('naive_bayes_model.pkl', 'rb') as file:
        nb = pickle.load(file)

    # Get test data
    x_test_count = cv.transform(spam_df.Message)  # Use all data for testing
    
    # Predict labels for test data
    predictions = nb.predict(x_test_count.toarray())

    # Calculate accuracy
    accuracy = (predictions == spam_df.spam).mean()

    # Return accuracy as JSON response
    response = jsonify({'accuracy': accuracy})
    response.headers.add('Access-Control-Allow-Origin', '*')  # Cho phép truy cập từ tất cả các nguồn
    return response

if __name__ == '__main__':
    app.run(debug=True)
