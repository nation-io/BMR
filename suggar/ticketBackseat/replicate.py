import json
 

quantity  = 500000

# Data to be written
dictionary = {
  "program": {
    "candyMachine": "",
    "candyMachineCreator": "",
    "collectionMint": ""
  },
  "items": {
    "0": {
      "name": "The Bear Market Rally Ticket",
      "image_hash": "63b3103479cc8235f93b617fc6a399c792d2faa302f59f7cf62a85733bd42647",
      "image_link": "https://arweave.net/q0XZPPdKzi-v8IXgJiCGPgh_V4jTpNC55KOkLF8B6ww?ext=png",
      "metadata_hash": "b72c93bced62edd01d1506eba9ab6083cfa35f829dbb99b2c1519d48bfea9317",
      "metadata_link": "https://arweave.net/WJJOG-J-PCwoIM8BeHTmzpvj39IQztK6gqnM5LvzIVc",
      "onChain": False
    }
  }
}

for item in range(quantity):
    dictionary["items"][item] = dictionary["items"]["0"]

#print(dictionary)
 
# Serializing json
json_object = json.dumps(dictionary, indent=4)
 
# Writing to sample.json
with open("500k.json", "w") as outfile:
    outfile.write(json_object)


print("done!")