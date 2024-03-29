var Promise = require('bluebird');

var {
  Contract,
  Interface
} = require('ethers-contracts');
var {
  arrayify,
  bigNumberify,
  RLP
} = require('ethers-utils');
var {getDefaultProvider} = require('ethers-providers');

var config = require('../config.js');

var address = config.exchangeContractAddress;

console.log('is there an address??', address);

var ExchangeInfo = {
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "numerator",
          "type": "uint256"
        },
        {
          "name": "denominator",
          "type": "uint256"
        },
        {
          "name": "target",
          "type": "uint256"
        }
      ],
      "name": "isRoundingError",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "filled",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "cancelled",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5][]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6][]"
        },
        {
          "name": "fillTakerTokenAmount",
          "type": "uint256"
        },
        {
          "name": "shouldThrowOnInsufficientBalanceOrAllowance",
          "type": "bool"
        },
        {
          "name": "v",
          "type": "uint8[]"
        },
        {
          "name": "r",
          "type": "bytes32[]"
        },
        {
          "name": "s",
          "type": "bytes32[]"
        }
      ],
      "name": "fillOrdersUpTo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6]"
        },
        {
          "name": "cancelTakerTokenAmount",
          "type": "uint256"
        }
      ],
      "name": "cancelOrder",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ZRX_TOKEN_CONTRACT",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5][]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6][]"
        },
        {
          "name": "fillTakerTokenAmounts",
          "type": "uint256[]"
        },
        {
          "name": "v",
          "type": "uint8[]"
        },
        {
          "name": "r",
          "type": "bytes32[]"
        },
        {
          "name": "s",
          "type": "bytes32[]"
        }
      ],
      "name": "batchFillOrKillOrders",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6]"
        },
        {
          "name": "fillTakerTokenAmount",
          "type": "uint256"
        },
        {
          "name": "v",
          "type": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32"
        },
        {
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "fillOrKillOrder",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "orderHash",
          "type": "bytes32"
        }
      ],
      "name": "getUnavailableTakerTokenAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "signer",
          "type": "address"
        },
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "v",
          "type": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32"
        },
        {
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "isValidSignature",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "numerator",
          "type": "uint256"
        },
        {
          "name": "denominator",
          "type": "uint256"
        },
        {
          "name": "target",
          "type": "uint256"
        }
      ],
      "name": "getPartialAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "TOKEN_TRANSFER_PROXY_CONTRACT",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5][]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6][]"
        },
        {
          "name": "fillTakerTokenAmounts",
          "type": "uint256[]"
        },
        {
          "name": "shouldThrowOnInsufficientBalanceOrAllowance",
          "type": "bool"
        },
        {
          "name": "v",
          "type": "uint8[]"
        },
        {
          "name": "r",
          "type": "bytes32[]"
        },
        {
          "name": "s",
          "type": "bytes32[]"
        }
      ],
      "name": "batchFillOrders",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5][]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6][]"
        },
        {
          "name": "cancelTakerTokenAmounts",
          "type": "uint256[]"
        }
      ],
      "name": "batchCancelOrders",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6]"
        },
        {
          "name": "fillTakerTokenAmount",
          "type": "uint256"
        },
        {
          "name": "shouldThrowOnInsufficientBalanceOrAllowance",
          "type": "bool"
        },
        {
          "name": "v",
          "type": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32"
        },
        {
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "fillOrder",
      "outputs": [
        {
          "name": "filledTakerTokenAmount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "orderAddresses",
          "type": "address[5]"
        },
        {
          "name": "orderValues",
          "type": "uint256[6]"
        }
      ],
      "name": "getOrderHash",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "EXTERNAL_QUERY_GAS_LIMIT",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "VERSION",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_zrxToken",
          "type": "address"
        },
        {
          "name": "_tokenTransferProxy",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "taker",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "feeRecipient",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "makerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "takerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "filledMakerTokenAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "filledTakerTokenAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "paidMakerFee",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "paidTakerFee",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "tokens",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "orderHash",
          "type": "bytes32"
        }
      ],
      "name": "LogFill",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "feeRecipient",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "makerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "takerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cancelledMakerTokenAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "cancelledTakerTokenAmount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "tokens",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "orderHash",
          "type": "bytes32"
        }
      ],
      "name": "LogCancel",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "errorId",
          "type": "uint8"
        },
        {
          "indexed": true,
          "name": "orderHash",
          "type": "bytes32"
        }
      ],
      "name": "LogError",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x6060604052341561000f57600080fd5b604051604080612c4d833981016040528080519060200190919080519060200190919050505b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50505b612b84806100c96000396000f300606060405236156100fa576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806314df96ee146100ff578063288cdc911461014c5780632ac1262214610187578063363349be146101c2578063394c21e7146103bc5780633b30ba591461044b5780634f150787146104a0578063741bcc93146106b25780637e9abb50146107535780638163681e1461078e57806398024a8b14610812578063add1cbc51461085b578063b7b2c7d6146108b0578063baa0181d14610acd578063bc61394a14610c1f578063cfc4d0ec14610cdf578063f06bbf7514610d6d578063ffa1ad7414610d9e575b600080fd5b341561010a57600080fd5b6101326004808035906020019091908035906020019091908035906020019091905050610e2d565b604051808215151515815260200191505060405180910390f35b341561015757600080fd5b610171600480803560001916906020019091905050610e7c565b6040518082815260200191505060405180910390f35b341561019257600080fd5b6101ac600480803560001916906020019091905050610e94565b6040518082815260200191505060405180910390f35b34156101cd57600080fd5b6103a660048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b8282101561024857848483905060a002016005806020026040519081016040528092919082600560200280828437820191505050505081526020019060010190610203565b5050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b828210156102c457848483905060c00201600680602002604051908101604052809291908260066020028082843782019150505050508152602001906001019061027f565b5050505050919080359060200190919080351515906020019091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610eac565b6040518082815260200191505060405180910390f35b34156103c757600080fd5b6104356004808060a001906005806020026040519081016040528092919082600560200280828437820191505050505091908060c001906006806020026040519081016040528092919082600660200280828437820191505050505091908035906020019091905050611013565b6040518082815260200191505060405180910390f35b341561045657600080fd5b61045e6114fb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104ab57600080fd5b6106b060048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b8282101561052657848483905060a0020160058060200260405190810160405280929190826005602002808284378201915050505050815260200190600101906104e1565b5050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b828210156105a257848483905060c00201600680602002604051908101604052809291908260066020028082843782019150505050508152602001906001019061055d565b50505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050611520565b005b34156106bd57600080fd5b6107516004808060a001906005806020026040519081016040528092919082600560200280828437820191505050505091908060c00190600680602002604051908101604052809291908260066020028082843782019150505050509190803590602001909190803560ff1690602001909190803560001916906020019091908035600019169060200190919050506115df565b005b341561075e57600080fd5b610778600480803560001916906020019091905050611605565b6040518082815260200191505060405180910390f35b341561079957600080fd5b6107f8600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190803560ff16906020019091908035600019169060200190919080356000191690602001909190505061164f565b604051808215151515815260200191505060405180910390f35b341561081d57600080fd5b6108456004808035906020019091908035906020019091908035906020019091905050611757565b6040518082815260200191505060405180910390f35b341561086657600080fd5b61086e611776565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156108bb57600080fd5b610acb60048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b8282101561093657848483905060a0020160058060200260405190810160405280929190826005602002808284378201915050505050815260200190600101906108f1565b5050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b828210156109b257848483905060c00201600680602002604051908101604052809291908260066020028082843782019150505050508152602001906001019061096d565b50505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091908035151590602001909190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190505061179c565b005b3415610ad857600080fd5b610c1d60048080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b82821015610b5357848483905060a002016005806020026040519081016040528092919082600560200280828437820191505050505081526020019060010190610b0e565b5050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020016000905b82821015610bcf57848483905060c002016006806020026040519081016040528092919082600660200280828437820191505050505081526020019060010190610b8a565b5050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190505061185e565b005b3415610c2a57600080fd5b610cc96004808060a001906005806020026040519081016040528092919082600560200280828437820191505050505091908060c001906006806020026040519081016040528092919082600660200280828437820191505050505091908035906020019091908035151590602001909190803560ff1690602001909190803560001916906020019091908035600019169060200190919050506118d3565b6040518082815260200191505060405180910390f35b3415610cea57600080fd5b610d4f6004808060a001906005806020026040519081016040528092919082600560200280828437820191505050505091908060c001906006806020026040519081016040528092919082600660200280828437820191505050505091905050612073565b60405180826000191660001916815260200191505060405180910390f35b3415610d7857600080fd5b610d8061231f565b604051808261ffff1661ffff16815260200191505060405180910390f35b3415610da957600080fd5b610db1612325565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610df25780820151818401525b602081019050610dd6565b50505050905090810190601f168015610e1f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008060008486850991506000821415610e4a5760009250610e73565b610e69610e5a83620f424061235e565b610e64888761235e565b612392565b90506103e8811192505b50509392505050565b60026020528060005260406000206000915090505481565b60036020528060005260406000206000915090505481565b6000806000809150600090505b895181101561100257896000815181101515610ed157fe5b906020019060200201516003600581101515610ee957fe5b602002015173ffffffffffffffffffffffffffffffffffffffff168a82815181101515610f1257fe5b906020019060200201516003600581101515610f2a57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff16141515610f5157600080fd5b610fe582610fe08c84815181101515610f6657fe5b906020019060200201518c85815181101515610f7e57fe5b90602001906020020151610f928d886123ae565b8c8c88815181101515610fa157fe5b906020019060200201518c89815181101515610fb957fe5b906020019060200201518c8a815181101515610fd157fe5b906020019060200201516118d3565b6123c8565b915087821415610ff457611002565b5b8080600101915050610eb9565b8192505b5050979650505050505050565b600061101d612a8c565b6000806101606040519081016040528088600060058110151561103c57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff16815260200188600160058110151561106b57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff16815260200188600260058110151561109a57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018860036005811015156110c957fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018860046005811015156110f857fe5b602002015173ffffffffffffffffffffffffffffffffffffffff16815260200187600060068110151561112757fe5b6020020151815260200187600160068110151561114057fe5b6020020151815260200187600260068110151561115957fe5b6020020151815260200187600360068110151561117257fe5b6020020151815260200187600460068110151561118b57fe5b6020020151815260200161119f8989612073565b6000191681525092503373ffffffffffffffffffffffffffffffffffffffff16836000015173ffffffffffffffffffffffffffffffffffffffff161415156111e657600080fd5b60008360a001511180156111fe575060008360c00151115b801561120a5750600085115b151561121557600080fd5b8261012001514210151561127257826101400151600019166000600381111561123a57fe5b60ff167f36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e9060405160405180910390a3600093506114f1565b61128d8360c00151611288856101400151611605565b6123ae565b915061129985836123e7565b905060008114156112f35782610140015160001916600160038111156112bb57fe5b60ff167f36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e9060405160405180910390a3600093506114f1565b61131d600360008561014001516000191660001916815260200190815260200160002054826123c8565b60036000856101400151600019166000191681526020019081526020016000208190555082604001518360600151604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140192505050604051809103902060001916836080015173ffffffffffffffffffffffffffffffffffffffff16846000015173ffffffffffffffffffffffffffffffffffffffff167f67d66f160bc93d925d05dae1794c90d2d6d6688b29b84ff069398a9b0458713186604001518760600151611455878a60c001518b60a00151611757565b878a6101400151604051808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200182600019166000191681526020019550505050505060405180910390a48093505b5050509392505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008090505b86518110156115d5576115c7878281518110151561154057fe5b90602001906020020151878381518110151561155857fe5b90602001906020020151878481518110151561157057fe5b90602001906020020151878581518110151561158857fe5b9060200190602002015187868151811015156115a057fe5b9060200190602002015187878151811015156115b857fe5b906020019060200201516115df565b5b8080600101915050611526565b5b50505050505050565b836115f087878760008888886118d3565b1415156115fc57600080fd5b5b505050505050565b600061164760026000846000191660001916815260200190815260200160002054600360008560001916600019168152602001908152602001600020546123c8565b90505b919050565b600060018560405180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c0182600019166000191681526020019150506040518091039020858585604051600081526020016040526000604051602001526040518085600019166000191681526020018460ff1660ff16815260200183600019166000191681526020018260001916600019168152602001945050505050602060405160208103908084039060008661646e5a03f1151561171457600080fd5b50506020604051035173ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff161490505b95945050505050565b600061176c611766858461235e565b84612392565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008090505b87518110156118535761184488828151811015156117bc57fe5b9060200190602002015188838151811015156117d457fe5b9060200190602002015188848151811015156117ec57fe5b9060200190602002015188888681518110151561180557fe5b90602001906020020151888781518110151561181d57fe5b90602001906020020151888881518110151561183557fe5b906020019060200201516118d3565b505b80806001019150506117a2565b5b5050505050505050565b60008090505b83518110156118cc576118bd848281518110151561187e57fe5b90602001906020020151848381518110151561189657fe5b9060200190602002015184848151811015156118ae57fe5b90602001906020020151611013565b505b8080600101915050611864565b5b50505050565b60006118dd612a8c565b600080600080610160604051908101604052808e60006005811015156118ff57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018e600160058110151561192e57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018e600260058110151561195d57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018e600360058110151561198c57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018e60046005811015156119bb57fe5b602002015173ffffffffffffffffffffffffffffffffffffffff1681526020018d60006006811015156119ea57fe5b602002015181526020018d6001600681101515611a0357fe5b602002015181526020018d6002600681101515611a1c57fe5b602002015181526020018d6003600681101515611a3557fe5b602002015181526020018d6004600681101515611a4e57fe5b60200201518152602001611a628f8f612073565b600019168152509450600073ffffffffffffffffffffffffffffffffffffffff16856020015173ffffffffffffffffffffffffffffffffffffffff161480611ad957503373ffffffffffffffffffffffffffffffffffffffff16856020015173ffffffffffffffffffffffffffffffffffffffff16145b1515611ae457600080fd5b60008560a00151118015611afc575060008560c00151115b8015611b08575060008b115b1515611b1357600080fd5b611b2985600001518661014001518b8b8b61164f565b1515611b3457600080fd5b84610120015142101515611b91578461014001516000191660006003811115611b5957fe5b60ff167f36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e9060405160405180910390a360009550612063565b611bac8560c00151611ba7876101400151611605565b6123ae565b9350611bb88b856123e7565b95506000861415611c12578461014001516000191660016003811115611bda57fe5b60ff167f36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e9060405160405180910390a360009550612063565b611c25868660c001518760a00151610e2d565b15611c79578461014001516000191660026003811115611c4157fe5b60ff167f36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e9060405160405180910390a360009550612063565b89158015611c8e5750611c8c8587612401565b155b15611ce15784610140015160001916600380811115611ca957fe5b60ff167f36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e9060405160405180910390a360009550612063565b611cf4868660c001518760a00151611757565b9250611d20600260008761014001516000191660001916815260200190815260200160002054876123c8565b600260008761014001516000191660001916815260200190815260200160002081905550611d58856040015186600001513386612751565b1515611d6357600080fd5b611d77856060015133876000015189612751565b1515611d8257600080fd5b600073ffffffffffffffffffffffffffffffffffffffff16856080015173ffffffffffffffffffffffffffffffffffffffff16141515611e815760008560e001511115611e1f57611ddc868660c001518760e00151611757565b9150611e136000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168660000151876080015185612751565b1515611e1e57600080fd5b5b60008561010001511115611e8057611e41868660c00151876101000151611757565b9050611e746000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633876080015184612751565b1515611e7f57600080fd5b5b5b84604001518560600151604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c0100000000000000000000000002815260140192505050604051809103902060001916856080015173ffffffffffffffffffffffffffffffffffffffff16866000015173ffffffffffffffffffffffffffffffffffffffff167f0d0b9391970d9a25552f37d436d2aae2925e2bfe1b2a923754bada030c498cb33389604001518a60600151898d8a8a8f6101400151604051808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200186815260200185815260200184815260200183815260200182600019166000191681526020019850505050505050505060405180910390a48595505b5050505050979650505050505050565b60003083600060058110151561208557fe5b602002015184600160058110151561209957fe5b60200201518560026005811015156120ad57fe5b60200201518660036005811015156120c157fe5b60200201518760046005811015156120d557fe5b60200201518760006006811015156120e957fe5b60200201518860016006811015156120fd57fe5b602002015189600260068110151561211157fe5b60200201518a600360068110151561212557fe5b60200201518b600460068110151561213957fe5b60200201518c600560068110151561214d57fe5b6020020151604051808d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166c010000000000000000000000000281526014018781526020018681526020018581526020018481526020018381526020018281526020019c50505050505050505050505050604051809103902090505b92915050565b61138781565b6040805190810160405280600581526020017f312e302e3000000000000000000000000000000000000000000000000000000081525081565b6000808284029050600084148061237f575082848281151561237c57fe5b04145b151561238757fe5b8091505b5092915050565b60008082848115156123a057fe5b0490508091505b5092915050565b60008282111515156123bc57fe5b81830390505b92915050565b60008082840190508381101515156123dc57fe5b8091505b5092915050565b60008183106123f657816123f8565b825b90505b92915050565b60008060008060008060008060003397506124258a8c60c001518d60a00151611757565b9650600073ffffffffffffffffffffffffffffffffffffffff168b6080015173ffffffffffffffffffffffffffffffffffffffff161415156126d2576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168b6040015173ffffffffffffffffffffffffffffffffffffffff161495506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168b6060015173ffffffffffffffffffffffffffffffffffffffff161494506125208a8c60c001518d60e00151611757565b93506125368a8c60c001518d6101000151611757565b925085612543578361254e565b61254d87856123c8565b5b91508461255b5782612566565b6125658a846123c8565b5b9050816125986000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168d600001516128ae565b10806125d15750816125cf6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168d60000151612972565b105b806126055750806126036000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a6128ae565b105b806126395750806126376000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff168a612972565b105b156126475760009850612743565b851580156126805750866126638c604001518d600001516128ae565b108061267f57508661267d8c604001518d60000151612972565b105b5b1561268e5760009850612743565b841580156126bf5750896126a68c606001518a6128ae565b10806126be5750896126bc8c606001518a612972565b105b5b156126cd5760009850612743565b61273e565b866126e58c604001518d600001516128ae565b10806127015750866126ff8c604001518d60000151612972565b105b806127185750896127168c606001518a6128ae565b105b8061272f57508961272d8c606001518a612972565b105b1561273d5760009850612743565b5b600198505b505050505050505092915050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166315dacbea868686866000604051602001526040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001945050505050602060405180830381600087803b151561288857600080fd5b6102c65a03f1151561289957600080fd5b5050506040518051905090505b949350505050565b60008273ffffffffffffffffffffffffffffffffffffffff166370a0823161138761ffff16846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600088803b151561295157600080fd5b87f1151561295e57600080fd5b505050506040518051905090505b92915050565b60008273ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e61138761ffff1684600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600088803b1515612a6b57600080fd5b87f11515612a7857600080fd5b505050506040518051905090505b92915050565b61016060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081526020016000815260200160008152602001600081526020016000801916815250905600a165627a7a7230582051fd36c20467561cfff517e73443e85bfad01c2fe07b8431ba9903676db7bb140029",
  "networks": {
    "50": {
      "links": {},
      "events": {
        "0x0d0b9391970d9a25552f37d436d2aae2925e2bfe1b2a923754bada030c498cb3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "makerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "takerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "filledMakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "filledTakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "paidMakerFee",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "paidTakerFee",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "tokens",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogFill",
          "type": "event"
        },
        "0x67d66f160bc93d925d05dae1794c90d2d6d6688b29b84ff069398a9b04587131": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "makerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "takerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "cancelledMakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "cancelledTakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "tokens",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogCancel",
          "type": "event"
        },
        "0x36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e90": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "errorId",
              "type": "uint8"
            },
            {
              "indexed": true,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogError",
          "type": "event"
        }
      },
      "updated_at": 1502391794390,
      "address": "0x38024cc964e6f2745672c86ecf45f5965efe6310"
    },
    "42": {
      "links": {},
      "events": {
        "0x0d0b9391970d9a25552f37d436d2aae2925e2bfe1b2a923754bada030c498cb3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "makerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "takerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "filledMakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "filledTakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "paidMakerFee",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "paidTakerFee",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "tokens",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogFill",
          "type": "event"
        },
        "0x67d66f160bc93d925d05dae1794c90d2d6d6688b29b84ff069398a9b04587131": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "makerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "takerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "cancelledMakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "cancelledTakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "tokens",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogCancel",
          "type": "event"
        },
        "0x36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e90": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "errorId",
              "type": "uint8"
            },
            {
              "indexed": true,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogError",
          "type": "event"
        }
      },
      "updated_at": 1502391794390,
      "address": "0x90fe2af704b34e0224bf2299c838e04d4dcf1364"
    },
    "1": {
      "links": {},
      "events": {
        "0x0d0b9391970d9a25552f37d436d2aae2925e2bfe1b2a923754bada030c498cb3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "makerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "takerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "filledMakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "filledTakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "paidMakerFee",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "paidTakerFee",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "tokens",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogFill",
          "type": "event"
        },
        "0x67d66f160bc93d925d05dae1794c90d2d6d6688b29b84ff069398a9b04587131": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "feeRecipient",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "makerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "takerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "cancelledMakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "cancelledTakerTokenAmount",
              "type": "uint256"
            },
            {
              "indexed": true,
              "name": "tokens",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogCancel",
          "type": "event"
        },
        "0x36d86c59e00bd73dc19ba3adfe068e4b64ac7e92be35546adeddf1b956a87e90": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "errorId",
              "type": "uint8"
            },
            {
              "indexed": true,
              "name": "orderHash",
              "type": "bytes32"
            }
          ],
          "name": "LogError",
          "type": "event"
        }
      },
      "updated_at": 1502480340000,
      "address": "0x12459C951127e0c374FF9105DdA097662A027093"
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1502391794390
}

module.exports.Interface = Interface;

module.exports.arrayify = arrayify;
module.exports.bigNumberify = bigNumberify;
module.exports.RLP = RLP;

var provider = module.exports.provider = getDefaultProvider();

module.exports.ExchangeContract = new Contract(address, ExchangeInfo.abi, provider);

module.exports.exchangeContractGenesisBlock = config.exchangeContractGenesisBlock;
