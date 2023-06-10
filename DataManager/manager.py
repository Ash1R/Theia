from flask import Flask, request

app = Flask(__name__)

@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.get_json()  # Extract the JSON data from the request

    # Process the data and display it
    if data:
        # Assuming the JSON data has a key called 'message'
        message = data.get('key')
        print(message)
    
    return "Invalid data"

if __name__ == '__main__':
    app.run()
