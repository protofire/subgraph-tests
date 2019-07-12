import { Contract } from "web3-eth-contract";
import BigNumber from "bignumber.js";
//import { EventData } from "web3-eth-contract";

import { toDecimal } from "./helpers";

export interface TransferInfo {
  tx: string;
  from: string;
  to: string;
  value: string;
}

export function getTotalSupply(contract: Contract): string {
  const totalSupply = contract.methods.totalSupply.call();
  return toDecimal(new BigNumber(totalSupply)).toFormat();
}

export function getAccountBalance(contract: Contract, address: string): string {
  const balance = contract.methods.balanceOf.call({ from: address });
  return toDecimal(new BigNumber(balance)).toFormat();
}

export async function getTransfers(
  contract: Contract,
  address?: string
): Promise<TransferInfo[]> {
  const events = await contract.getPastEvents("Transfer", {
    filter: address ? { from: address } : {},
    fromBlock: 0,
    toBlock: "latest"
  });

  const transfers: TransferInfo[] = events.map(event => ({
    tx: event.transactionHash,
    from: event.returnValues.from.toLowerCase(),
    to: event.returnValues.to.toLowerCase(),
    value: toDecimal(new BigNumber(event.returnValues.value)).toFormat()
  }));

  return Promise.resolve(transfers);
}
