# 合约调用

任何有需要和其他合约交互的时候，合约调用就会被使用。现总结一下都有哪些合约调用方式以及使用的场景等。

## 使用合约代码

有些时候我们需要写一个代理合约去掉用另一个实际执行逻辑的合约，这样带来的好处是可以在不改变合约地址的情况下对合约进行升级。

首先，写一个执行具体逻辑的被被代理合约，我们命名为 `EthHolder`:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract EthHolder {
    uint256 private state;   // 持有状态
    event Log(uint amount, uint gas);  // 定义事件

    function getBalance() view public returns (uint) {
        // 获取当前合约所持有的 ETH Balance
        return address(this).balance;
    }

    // payable 可接收 ETH
    function setStateAndSendEth(uint256 _s) external payable {
        state = _s;

        // 如果转入的 ETH 大于 0，就发布一个收到的事件
        if (msg.value > 0) {
            emit Log(msg.value, gasleft());
        }
    }

    function getState() external view returns (uint s) {
        s = state;
    }
}
```

然后，写一个代理合约去调用上面的这个合约，我们命名为 `DirectlyCall`:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

import "./EthHolder.sol";

contract DirectlyCall {
    function proxySetState(address _addr, uint256 _s) external payable {
        // 导入 EthHolder 并初始化
        // 这里需要把 eth 也传递过去，需要 ...setStateAndSendEth{ value: msg.value }(...
        EthHolder(_addr).setStateAndSendEth{ value: msg.value }(_s);
    }

    function proxyGetState(address _addr) view external returns (uint s) {
        // 导入 EthHolder 并初始化
        s = EthHolder(_addr).getState();
    }
}
```

这种方式调用另一个合约的适用场景是我们知道这个合约的代码，并且我们能获取到：

- 只适合自己管理的合约之间的相互调用
- 不通用，局限性很大
- 即使能获取到代码，如果合约代码量非常大，也不是一种好的方式

## 使用接口合约

我们了解了上一种调用合约方式的弱点，看看接口合约是怎么解决这个问题的。

由于在很多情况下我们并没有被调用合约的源代码，但往往很容易获取到合约的 abi，所以我们可以利用 abi 中的定义知道某个合约有哪些 interface

首先，我们写一个被调用合约，称之为 `Counter`:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract Counter {
    uint public count;

    function inc() external {
        count += 1;
    }

    function dec() external {
        count -= 1;
    }
}
```

这个代码看起来可能比较简单，只是举个例子，往往实际的合约会非常复杂。我们把这个合约部署好之后会获得合约地址，比如是 `0xcD6a42782d230D7c13A74ddec5dD140e55499Df9`.

然后，我们再写一个合约叫 `InterfaceCall`:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

interface ICounter {
    function count() external view returns (uint);
    function inc() external;
    function dec() external;
}

contract InterfaceCall {
    uint public count;

    function doCall(address _counterAddr) external {
        ICounter(_counterAddr).inc();
        count = ICounter(_counterAddr).count();
    }
}
```

1. 我们声明一个 interface，它的方法签名和 `Counter` 合约是一致的
2. 在 `InterfaceCall` 中就可以使用 `ICounter` 来调用 `Counter` 合约
3. 在实际调用时传入 `Counter` 的合约地址，比如 `0xcD6a42782d230D7c13A74ddec5dD140e55499Df9`

## 使用 call



## 使用 deletecall

## 使用 staticcall

 
