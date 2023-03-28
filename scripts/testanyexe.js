const { deployments } = require("hardhat");

async function main() {

  const {testnetdeployer}=await getNamedAccounts()
  const createAndSetPeersDeployment = await deployments.get("createAndSetPeersContract");
  const createAndSetPeersAddress = createAndSetPeersDeployment.address;
  console.log("createAndSetPeersAddress deployed to:",createAndSetPeersAddress);
  const mockdata='0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001E000000000000000000000000000000000000000000000000000000000000000A000000000000000000000000000000000000000000000000000000000000000E00000000000000000000000000000000000000000000000000000000000000012000000000000000000000000651FCF3CF2B52B632185B1175475AE07F320D008000000000000000000000000000000000000000000000000000256CAB7A22BFC00000000000000000000000000000000000000000000000000000000000000084D7920546F6B656E00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034D544B000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000061000000000000000000000000000000000000000000000000000000000000A8690000000000000000000000000000000000000000000000000000000000000002000000000000000000000000651FCF3CF2B52B632185B1175475AE07F320D008000000000000000000000000651FCF3CF2B52B632185B1175475AE07F320D008'




  const createAndSetPeersContract = await ethers.getContractAt("createAndSetPeersContract",createAndSetPeersAddress);
  // check clientpeers
  const clientpeers=await createAndSetPeersContract.anyExecute(mockdata)




  // if client peers is empty set it
  if (clientpeers=='0x0000000000000000000000000000000000000000'){
    const setclientpeers=await createAndSetPeersContract.setClientPeers(allchainids,wantedclientpeer)
    console.log("setclientpeers:",setclientpeers);

  }


  const myTokenData = {
    name: 'My Token',
    symbol: 'MTK',
    decimals: 18,
    owner: '0x651FCf3Cf2b52b632185b1175475aE07F320d008',
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