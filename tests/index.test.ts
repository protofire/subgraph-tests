import { Contract } from "web3-eth-contract";

import {
  getContractAbi,
  //getGraphQLInstance,
  getWeb3Instance
} from "./../src/config";
import { getTotalSupply, getTransfers } from "./../src/erc20Web3Helpers";

//const graphUrl = "http://localhost:8000/subgraphs/name/nicosampler/dai";
const infuraEndpoint =
  "https://mainnet.infura.io/v3/ecb81cbe2f03436cb39236e4160311fe";
const erc20fileName = "erc20.abi.json";
const daiContractAddress = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";

//let gql = getGraphQLInstance(graphUrl);
let erc20abi;
let web3;
let daiContract: Contract;

beforeAll(() => {
  jest.setTimeout(50000);

  erc20abi = getContractAbi(erc20fileName);
  web3 = getWeb3Instance(infuraEndpoint);
  daiContract = new web3.eth.Contract(erc20abi, daiContractAddress);
});

const txhash =
  "0x709fe6656b2aa9efbd6d36eba51a2f4b5720a2a8eaafecfc249e7116736cc085";
test(`Values for Dai Contract tx: ${txhash}`, async () => {
  const daiRandomAddress = "0x0e0ec712b3912b5601216455a158cf18152cb62a";
  const accountTransfers = await getTransfers(daiContract, daiRandomAddress);

  const txInfo = accountTransfers.find(transfer => (transfer.tx === txhash));

  expect(txInfo).toEqual({
    tx: txhash,
    from: daiRandomAddress,
    to: "0x39755357759ce0d7f32dc8dc45414cca409ae24e",
    value: "53,608"
  });
});
