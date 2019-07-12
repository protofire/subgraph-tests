import BigNumber from "bignumber.js";

export function toDecimal(number: BigNumber, tokenDecimals: number = 18): BigNumber {
  return number.dividedBy(Math.pow(10, tokenDecimals));
}
