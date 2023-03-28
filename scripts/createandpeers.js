const { deployments } = require("hardhat");

async function main() {

  const {testnetdeployer}=await getNamedAccounts()
  const createAndSetPeersDeployment = await deployments.get("createAndSetPeersContract");
  const createAndSetPeersAddress = createAndSetPeersDeployment.address;
  console.log("createAndSetPeersAddress deployed to:",createAndSetPeersAddress);
  
//   testtoken address
  const tokenaddress='0x651FCf3Cf2b52b632185b1175475aE07F320d008'


  // random salt
  const salt=Math.floor(Math.random() * 1000000000000000).toString()
    // chainid for bsc testnet and fuji ftmtest
    let allchainids=['97','43113','4002','5']
  const chainIds=allchainids

  // rearrange allchainids to have this chain id at first
  allchainids.unshift(allchainids.splice(allchainids.indexOf(chainIds[0]),1)[0])


  // this is the peer of gateway
  const peers=['0x651FCf3Cf2b52b632185b1175475aE07F320d008','0x651FCf3Cf2b52b632185b1175475aE07F320d008']


  const createAndSetPeersContract = await ethers.getContractAt("createAndSetPeersContract",createAndSetPeersAddress);
  // check clientpeers
  const clientpeers=await createAndSetPeersContract.clientPeers(chainIds[0])
  console.log("clientpeers:",clientpeers);
  const clientpeer='0x142726ace295fca5b27f0b9f6986157a19fa41f0'
// set wantedclientpeers as array reduced from chainid
  
  const wantedclientpeer=allchainids.reduce((acc,chainid)=>{acc.push(clientpeer);return acc},[])

  // if client peers is empty set it
  if (clientpeers!=wantedclientpeer[0]){
    const setclientpeers=await createAndSetPeersContract.setClientPeers(allchainids,wantedclientpeer)
    console.log("setclientpeers:",setclientpeers);

  }


  const myTokenData = {
    name: 'My Token',
    symbol: 'MTK',
    decimals: 18,
    owner: testnetdeployer,
    salt: salt,
  };
  
  
  // 0.03 in ether
  const anycallfee=['30000000000000000','30000000000000000']
  
//   (
//     address token,
//     TokenData memory tokenData,
//     uint256[] calldata _chainIds,
//     address[] calldata _peers,
//     uint256[] calldata anyCallFee


// )
    

// force the tx with manual gas limit
const createAndSetPeersTx = await createAndSetPeersContract.createAndSetPeers(tokenaddress, myTokenData, chainIds, peers, anycallfee, {

  value:'30000000000000000',
  // gasLimit: 4000000,

});

    console.log("createAndSetPeersTx:",createAndSetPeersTx);



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });