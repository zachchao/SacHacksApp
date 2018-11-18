import random
import json
import time


def smart_contract():
	res = ""
	for i in range(40):
		res += str(hex(random.randint(0, 16)))[2:]
	return "0x" + res

def generateTxID():
	res = ""
	for i in range(64):
		res += str(hex(random.randint(0, 16)))[2:]
	return "0x" + res

def generateTransaction():
	with open("blockchain.json", "r") as f:
		j = json.loads(f.read())
		jDict = {
			"txID" : generateTxID(),
			"from" : j["sponsorAccount"],
			"to" : random.choice(j["driverAccounts"]),
			"reward" : 0.01,
			"timeStamp" : time.time()
		}
		j["transactions"].insert(0, jDict)
		jObject = json.dumps(j)
	with open("blockchain.json", "w") as f:
		f.write(jObject)


for i in range(100):
	time.sleep(random.randint(5, 13))
	generateTransaction()