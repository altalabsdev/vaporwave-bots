import { ethers } from 'ethers';

// Import an ABI which will be embedded into the generated js
import * as PositionRouter from '../abi/positionRouter.json';

// Contract Addresses
const POSITION_ROUTER = `0x0000000000000000000000000000000000000000`; // TODO: replace with PositionRouter contract address

const FEE_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: replace with fee address

export async function executePositions() {
  const provider = await ethers.getDefaultProvider();
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const positionRouter = new ethers.Contract(
    POSITION_ROUTER,
    PositionRouter.abi,
    signer
  );

  let increaseLength = (await positionRouter.increasePositionRequestKeys())
    .length;
  let decreaseLength = (await positionRouter.decreasePositionRequestKeys())
    .length;
  let swapLength = (await positionRouter.swapRequestKeys()).length;

  positionRouter.on('CreateIncreasePosition', () => {
    const executeIncrease = await positionRouter.executeIncreasePositions(
      increaseLength,
      FEE_ADDRESS
    );
    increaseLength++;
  });

  positionRouter.on('CreateDecreasePosition', () => {
    const executeDecrease = await positionRouter.executeDecreasePositions(
      decreaseLength,
      FEE_ADDRESS
    );
    decreaseLength++;
  });

  positionRouter.on('CreateSwapPosition', () => {
    const executeSwap = await positionRouter.executeSwapPositions(
      swapLength,
      FEE_ADDRESS
    );
    swapLength++;
  });
}

executePositions().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}
