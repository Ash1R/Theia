from flask import Flask, request
import csv
import requests
import csv 
import json
import time
from flask_socketio import SocketIO, emit
from os.path import exists
import subprocess

def csv_to_json(csvFilePath, jsonFilePath):
    jsonArray = []
      
    #read csv file
    with open(csvFilePath, encoding='utf-8') as csvf: 
        #load csv file data using csv library's dictionary reader
        csvReader = csv.DictReader(csvf) 

        #convert each csv row into python dict
        for row in csvReader: 
            #add this python dict to json array
            jsonArray.append(row)
  
    #convert python jsonArray to JSON String and write to file
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
        jsonString = json.dumps(jsonArray, indent=4)
        jsonf.write(jsonString)

def post_json(url, data):
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    
    # Check the response status code
    if response.status_code == 200:
        print("POST request successful!")
    else:
        print("POST request failed.")
    
    # Print the response content
    print(response.json())

def upload_file(url, file_path):
    try:
        with open(file_path, 'rb') as file:
            response = requests.post(url, files={'file': file})
            response.raise_for_status()  # Raise an exception for unsuccessful responses

        print('File uploaded successfully.')
    except requests.exceptions.RequestException as e:
        print('Error:', e)

app = Flask(__name__)
socketio = SocketIO(app)

fields = ["user", "message"]

classId = ""
user = ""
message = ""
@app.route('/receive', methods=['POST'])
def receive_data():
    data = request.get_json()  # Extract the JSON data from the request

    # Process the data and display it
    if data:
        # Assuming the JSON data has a key called 'message'
        classId = data.get('class')
        print(classId)
        user = data.get('user')
        print(user)
        message = data.get('message')
        print(message)
        listToAppend = [user, message]
        print(listToAppend)
        if exists("DataManager/Data/class" + classId +".csv"):
            w = csv.writer(open(r"DataManager/Data/class" + classId +".csv", 'a', newline='', encoding='UTF8'), dialect='excel')
            w.writerow(listToAppend)
        else:
            with open(r"DataManager/Data/class" + classId +".csv", 'w', newline='', encoding='UTF8') as f:
                # create the csv writer
                writer = csv.writer(f)
                writer.writerow(fields)
                writer.writerow(listToAppend)
            
        csvFilePath = r"DataManager/Data/class" + classId +".csv"
        jsonFilePath = r"DataManager/Data/class" + classId +".json"

        csv_to_json(csvFilePath, jsonFilePath)
        
        return "Invalid data"

    f = open("DataManager/Data/class" + classId +".csv",)
    data = json.load(f)

    # Example usage
    file_path = 'DataManager/Data/class01.json'  # Path of the file you want to send
    target_url = 'http://192.168.64.128/receive'  # URL of the receiving server

    url = 'http://<target-computer-ip>:<port>/receive'  # URL of the receiving server
    file_path = 'DataManager/Data/class01.json'  # Path of the file you want to upload

upload_file(url, file_path)

if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0', port=5000, debug=True)