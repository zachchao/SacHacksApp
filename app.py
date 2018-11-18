import json
from flask import Flask
from flask import render_template, request
import os
import datetime
import time

app = Flask(__name__)

# Images are aspect ratio 538x283
@app.route('/')
def home():
    # Load the folder of images into a json object
    data = {"incidents" : []}
    for imageName in os.listdir("static/crimePhotos")[::-1]:
        metaData = imageName.split("_")
        unixTime = int(metaData[0])
        dateStr = datetime.datetime.utcfromtimestamp(unixTime).strftime("%h %d %I:%M%p")
        daysAgo = (time.time() - unixTime) // 86400
        data["incidents"].append({
            "fileName" : imageName,
            "timeStamp" : unixTime,
            "dateStr" : dateStr, # Nicely formatted date
            "type" : metaData[1],
            "lat" : metaData[2],
            "lng" : metaData[3][:len(metaData[3]) - 4],
            "opacity" : 1 - (daysAgo * 0.1) # Fade away in 10 days
        })

    with open("watchDogsInfo.json") as f:
        watchDogData = json.loads(f.read())
    return render_template('index.html', incidentData=data["incidents"],
        watchDogsData=watchDogData["watchDogInfo"])


@app.route('/blockchain')
def blockchain():
    # Load the folder of images into a json object
    with open("blockchainData.json") as f:
        data = json.loads(f.read())
    return render_template('blockchain.html', blockchainData=data["data"])

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    