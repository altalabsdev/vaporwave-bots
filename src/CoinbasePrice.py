# pip install coinbase
from coinbase.wallet.client import Client

def coinbasePrice(pair):
    client = Client(<api_key>, <api_secret>) # replace with your own api key and secret

    price = client.get_buy_price(currency_pair = pair)
    return price