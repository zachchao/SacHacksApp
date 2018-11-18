import os
import json


data = {"data" : []}
for imageName in os.listdir("static"):
	metaData = imageName.split("_")
	data["data"].append({
		"fileName" : imageName,
		"type" : metaData[0],
		"timeStamp" : int(metaData[1]),
		"lat" : float(metaData[2]),
		"lng" : float(metaData[3].split(".")[0])
	})
json_str = json.dumps(data)
json_data = json.loads(json_str)
print(json_data)