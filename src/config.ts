import { Lokka } from "lokka";
import { Transport } from "lokka-transport-http";
import Web3 from "web3";
import { Web3ModuleOptions } from "web3-core";
import * as fs from "fs";
import * as path from "path";

export function getGraphQLInstance(graphUrl: string) {
  return new Lokka({
    transport: new Transport(graphUrl)
  });
}

export function getWeb3Instance(
  providerUrl: string,
  options?: Web3ModuleOptions
) {
  return new Web3(
    new Web3.providers.HttpProvider(providerUrl),
    undefined,
    options
  );
}

export function getContractAbi(fileName: string) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", "abis", fileName)).toString()
  );
}
