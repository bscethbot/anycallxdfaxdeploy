// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {network} =require("hardhat")
const {verify}=require("../utils/verify")

// sleep function
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
       // anyCalladdresses[5] = 0x965f84D915a9eFa2dD81b653e3AE736555d945f4; // Goerli
        // anyCalladdresses[97] = 0xcBd52F7E99eeFd9cD281Ea84f3D903906BB677EC; // Binance Smart Chain testnet
        // anyCalladdresses[4002] = 0xfCea2c562844A7D385a7CB7d5a79cfEE0B673D99; // Fantom testnet
        // anyCalladdresses[43113] = 0x461d52769884ca6235B685EF2040F47d30C94EB5; // Avalanche Fuji testnet

const anyCalladdresses = {
          5: "0x965f84D915a9eFa2dD81b653e3AE736555d945f4", // Goerli
          97: "0xcBd52F7E99eeFd9cD281Ea84f3D903906BB677EC", // Binance Smart Chain testnet
          4002: "0xfCea2c562844A7D385a7CB7d5a79cfEE0B673D99", // Fantom testnet
          43113: "0x461d52769884ca6235B685EF2040F47d30C94EB5" // Avalanche Fuji testnet
      };
      



module.exports = async ({getNamedAccounts,deployments})=>{
  const {deploy,log}=deployments
  const {testnetdeployer}=await getNamedAccounts()
  const [deployer] = await ethers.getSigners();
  log('your acc is ' + deployer.address)
  const chainid=network.config.chainId
  log(`youre workign with network ${chainid}`)
  const targetednonce=60
// 0x72288630D510697cA96C687CEcE5898283D3BdaF
  const mynonce=await deployer.getTransactionCount()

  // pad nonce with empty tx

  // if larger revert
  if (mynonce>targetednonce){
    throw new Error(`youre nonce is ${mynonce} and you need to pad it to ${targetednonce}`)
  }


  if (mynonce<targetednonce){
    log(`youre nonce is ${mynonce} and you need to pad it to ${targetednonce}`)
    for (let i=mynonce;i<targetednonce;i++){
      deployer.sendTransaction({
        to:deployer.address,
        value:0,
        nonce:i
      })
      
    }
  }
  await sleep(5000)

  // check nonce now
  const mynonce2=await deployer.getTransactionCount()
  if (mynonce2!=targetednonce){
    throw new Error(`youre nonce is ${mynonce2} and you need to pad it to ${targetednonce}`)
  }



  // factory address is 0x60e9A880D49512d87f6E4B98eC54dC97ecC06CbD my version

  const factoryaddress='0x7C00F080732f53e20351fc853AF82d3Bceb36398'
  const args=[factoryaddress,anyCalladdresses[chainid]]
  
  const deployed=await deploy("createAndSetPeersContract",{
    from:testnetdeployer,
    args:args,
    log:true,
    waitConfirmations:network.config.blockConfirmations||1,

  })
  log("deployed createAndSetPeersContract")

  await sleep(3000)
  if (chainid!=31337){
    await verify(deployed.address,args)
  }

}


