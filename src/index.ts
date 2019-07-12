import { getContractAbi, getGraphQLInstance, getWeb3Instance } from "./config";
import { getTotalSupply, getTransfers } from "./erc20Web3Helpers";

const infuraEndpoint =
  "https://mainnet.infura.io/v3/ecb81cbe2f03436cb39236e4160311fe";
const graphUrl = "http://localhost:8000/subgraphs/name/nicosampler/dai";
const erc20fileName = "erc20.abi.json";
const daiContractAddress = "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359";

const erc20abi = getContractAbi(erc20fileName);
const web3 = getWeb3Instance(infuraEndpoint);
const gql = getGraphQLInstance(graphUrl);

const daiContract = new web3.eth.Contract(erc20abi, daiContractAddress);

async function test() {
  // const totalSupply = await getTotalSupply(daiContract);
  // console.log("totalSupply: ", totalSupply);

  const tokenTransfers = await getTransfers(daiContract);
  console.log(tokenTransfers);

  // const daiRandomAddress = '0x0e0ec712b3912b5601216455a158cf18152cb62a';
  // const accountTransfers = await getTransfers(daiContract, daiRandomAddress);
  // console.log(accountTransfers);
}

test().catch(error => console.error(error));
