from flask import Flask
from firebase import firebase
import openai
from flask import Flask, request
import csv
import requests
import csv 
import json
import time
from flask_socketio import SocketIO, emit
from os.path import exists
import subprocess

import os
import logging
from flask import jsonify
from flask_executor import Executor
import openai


import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

firebase = firebase.FirebaseApplication("https://theia-b3690-default-rtdb.firebaseio.com/", None)
# Load your OpenAI API key
openai.api_key = "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"

def generate_prompt(user_message):
    # Analyze the user_message and generate a suitable system message.
    if 'math' in user_message.lower():
        return "You are a helpful tutor specializing in Math."
    elif 'science' in user_message.lower():
        return "You are a helpful tutor specializing in Science."
    elif 'english' in user_message.lower():
        return "You are a helpful tutor specializing in English."
    else:
        return "You are a helpful tutor."

def generate_response(msg):
    try:
        system_message = generate_prompt(msg)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": msg}
            ]
        )
        # Return the AI's response as JSON
        return jsonify({'message': response['choices'][0]['message']['content']})
    except Exception as e:
        pass
        # logging.error(f"Error generating response: {e}")
        # return jsonify({'message': "Sorry, I'm having trouble generating a response right now."})


data = {
    "class": "01",
    "user": "tarenpatel",
    "message": "/gpt what is the largest animal?"
    }


user_message = data['message']
logging.info('Received message: ' + user_message)
if user_message.startswith("/gpt"):
    # Extract the question for GPT
    gpt_question = user_message[5:]  # Skip the "/gpt " part
    response = generate_response(gpt_question)
            # Append the question and response to the chat log
print(response['message'])
result = firebase.post('/theia-b3690-default-rtdb/Customer', data)