require("hardhat-deploy")
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
const bnbtestnetrpc=process.env.bnbtestnetrpc
const prvkey=process.env.prvkey
const bscscanapi=process.env.bscscanapi
const ftmtestnetrpc=process.env.ftmtestnetrpc
const ftmscanapi=process.env.ftmscanapi
const rinkebyrpc=process.env.rinkebyrpc
const rinkebyscanapi=process.env.rinkebyscanapi
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork:"hardhat",
  networks:{
    bnbtest:{
      url:bnbtestnetrpc,
      accounts:[prvkey],
      chainId:97,
      blockConfirmations:4,
    },
    ftmtest:{
      url:ftmtestnetrpc,
      accounts:[prvkey],
      chainId:4002,
      blockConfirmations:1,
    },
    goerli:{
      url:process.env.GOERLI_RPC_PROVIDER,
      accounts:[prvkey],
      chainId:5,
      blockConfirmations:2,
    },
    avaxtest:{
      url:process.env.avaxtestrpc,
      accounts:[prvkey],
      chainId:43113,
      blockConfirmations:1,
    }
  },
  solidity: "0.8.10",
  etherscan:{apiKey:{
    bscTestnet:bscscanapi,
    ftmTestnet:ftmscanapi,
    rinkeby:rinkebyscanapi,
    avalancheFujiTestnet:process.env.avaxtestscanapi,
    goerli:process.env.GOERLI_SCAN_API,
  }},
  namedAccounts:{
    testnetdeployer:{
      default:0,
    },
    maindeployer:{
      default:1,
    }
  }
};
