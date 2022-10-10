# Import libraries
import json
import requests

def getBinancePrice(symbol):
    # defining key/request url
    key = "https://api.binance.com/api/v3/ticker/price?symbol={symbol}"
    
    # requesting data from url
    data = requests.get(key)  
    data = data.json()
    price = data['price']
    print(f"{data['symbol']} price is {price}")
    return price
  
