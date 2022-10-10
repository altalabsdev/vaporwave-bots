import { ethers } from 'ethers';

// Import an ABI which will be embedded into the generated js
import * as FastPriceFeed from '../abi/fastPriceFeed.json';

// Contract Addresses
const FAST_PRICE_FEED = `0x0000000000000000000000000000000000000000`; // TODO: replace with FastPriceFeed contract address

const FEE_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: replace with fee address

export async function setPrices(tokens: string[], prices: BigNumber[], timestamp: BigNumber) {
  const provider = await ethers.getDefaultProvider();
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const fastPriceFeed = new ethers.Contract(
    FAST_PRICE_FEED,
    FastPriceFeed.abi,
    signer
  );

  await fastPriceFeed.setPrices(tokens, prices, timestamp);
}

export async function setPricesWithBitsAndExecute(priceBits: BigNumber, timestamp: BigNumber, endIndexIncrease: BigNumber, endIndexDecrease: BigNumber) {
    const provider = await ethers.getDefaultProvider();
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    const fastPriceFeed = new ethers.Contract(
        FAST_PRICE_FEED,
        FastPriceFeed.abi,
        signer
    );
    
    await fastPriceFeed.setPricesWithBitsAndExecute(priceBits, timestamp, endIndexIncrease, endIndexDecrease);
}

setPrices().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}
