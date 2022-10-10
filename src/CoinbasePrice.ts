// npm install coinbase

export async function coinbasePrice(pair: string): Promise<BigNumber> {
  const Client = require('coinbase').Client;
  const client = new Client({
    apiKey: process.env.COINBASE_API_KEY,
    apiSecret: process.env.COINBASE_API_SECRET,
  }); //

  let price = client.getBuyPrice({ currencyPair: pair }, function (err, price) {
    console.log(price);
  });
  return price;
}
