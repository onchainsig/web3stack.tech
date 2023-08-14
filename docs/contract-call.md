# 合约调用

任何有需要和其他合约交互的时候，合约调用就会被使用。现总结一下都有哪些合约调用方式以及使用的场景等。

1. 使用合约代码
2. 使用接口合约
3. call
4. delegatecall
5. staticcall

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

call 是一个 low level 的成员函数，用来与其他合约交互：

1. 返回值是 (bool, data) 这样的元祖
2. call是solidity官方推荐的通过触发fallback或receive函数发送ETH的方法
3. 不推荐用call来调用另一个合约，因为当你调用不安全合约的函数时，你就把主动权交给了它。推荐的方法仍是声明合约变量后调用函数
4. 当我们不知道对方合约的源代码或 ABI，就没法生成合约变量；这时，我们仍可以通过call调用对方合约的函数

call 的使用方式：`目标合约地址.call(abi.encodeWithSignature("函数签名", 逗号分隔的参数))`，比如 `usdtAddress.call(abi.encodeWithSignature("transfer(address,uint256)", "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9", 20000))`；

当然在调用的时候也可以指定 ETH 和 Gas，比如 `usdtAddress.call{ value: msg.value, gas: 20000 }(abi.encodeWithSignature("transfer(address,uint256)", "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9", 20000))`

首先，我们还是使用上面的那个 `EthHolder` 合约，部署:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract EthHolder {
    uint256 private state;

    mapping(address => uint256) _balances;

    event Log(uint amount, uint gas);

    event TriggerFallback(address sender, uint value);

    receive() external payable {
        receiveEth();
    }

    fallback() external payable {
        receiveEth();
    }

    function receiveEth() internal {
        _balances[msg.sender] += msg.value;
        emit TriggerFallback(msg.sender, msg.value);
    }

    function getEthBalance(address _addr) external view returns (uint256 value) {
        value = _balances[_addr];
    }

    function getBalance() view public returns (uint) {
        return address(this).balance;
    }

    function setStateAndSendEth(uint256 _s) external payable {
        state = _s;

        if (msg.value > 0) {
            emit Log(msg.value, gasleft());
        }
    }

    function getState() external view returns (uint s) {
        s = state;
    }
}
```

然后，我们写一个使用 call 的代理合约调用 `EthHolder`:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract Call {
    event Response(bool success, bytes data);

    function proxyDoCall(address payable _addr, uint256 _s) external payable {
        (bool success, bytes memory data) = _addr.call{ value: msg.value }(
            abi.encodeWithSignature("setStateAndSendEth(uint256)", _s)
        );

        emit Response(success, data);
    }

    function proxyOtherCall(address _addr) external payable {
        require(_addr != address(0), "bad address");
        (bool success, bytes memory data) = _addr.call{ value: msg.value }(abi.encodeWithSignature("someMethod(uint256)"));
        emit Response(success, data);
    }
}
```

call 不是调用合约的推荐方法，存在安全风险；但是在不知道合约代码和 ABI 的情况下，也可以调用目标合约。

对于 call，重要的是上下文传递：用户 A -> 合约 B -> 合约 C

- 对于合约 B，msg.sender 是 A, msg.value 是 A 的
- 对于合约 C, msg.sender 是 B, msg.value 是 B 的

从这个关系我们可以推出：当用户调用 `Call.proxyOtherCall` 的时候，并且发送了 ETH，那么在 `EthHolder` 的 `_balances` 中存储的 address 都是 `Call` 合约的地址，而不是 A 的，查询 A 的地址获得的余额是 0。

## 使用 delegatecall

deletecall 是类似 call 的另一个可以调用合约的方式，不同点是他们对于上下文的处理不同，还是 用户 A -> 合约 B -> 合约 C

- 对于合约 B, msg.sender 是 A, msg.value 是 A 的
- 对于合约 C, msg.sender 是 A， msg.value 是 A 的

这个就是 delegatecall，context 传递了下去；此外，调用方式和 call 类似，就不做过多赘述。

此外，**对于代理合约，状态变量是存在代理合约中的，函数逻辑在实际的目标合约**。

主要用途是合约的代理模式实现，代理合约。

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract Target {
    uint256 public state;
    mapping(address => uint256) private _balances;

    event Receive(address sender, uint256 value);

    function updateState(uint256 _s) external payable {
        state = _s;

        if (msg.value > 0) {
            _balances[msg.sender] += msg.value;
        }

        emit Receive(msg.sender, msg.value);
    }

    function getBalance(address _addr) view external returns (uint256) {
        require(_addr != address(0), "bad address");
        return _balances[_addr];
    }
}

contract DelegateCall {

    uint256 public state;
    mapping(address => uint256) private _balances;

    function updateState(address _addr, uint256 _s) external payable {
        (bool success, ) = _addr.delegatecall(abi.encodeWithSignature("updateState(uint256)", _s));
        require(success, "bad call");
    }

    function getBalance(address _addr) view external returns (uint256) {
        require(_addr != address(0), "bad address");
        return _balances[_addr];
    }

}
```

部署合约，并验证后可以发现，所有的状态都在 DelegateCall 合约中，Target 中的变量是没有被改变的。

## 使用 staticcall

staticcall 只能读取，不同于 call。

**MultiCall**: 对一个或多个合约的一次或多次调用打包在一个交易中进行调用，好处是在对合约进行几十次调用时可以在一个交易中完成；可以屏蔽掉区块链 rpc 的限制等问题。

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

contract Erc20 {

    mapping(address => uint256) private _balances;
    string private symbol;

    event Transfer(address from, address to, uint256 amount);

    constructor(string memory symbol_) {
        symbol = symbol_;
    }

    function balanceOf(address _addr) view external returns (uint256, uint) {
        return (_balances[_addr], block.timestamp);
    }

    function transfer(address _addr, uint256 amount) external {
        _balances[_addr] += amount;
        emit Transfer(msg.sender, _addr, amount);
    }

    function getInputData(address _addr) external pure returns (bytes memory) {
        return abi.encodeWithSelector(this.balanceOf.selector, _addr);
    }
}

contract Multicall {

    function doCall(address[] calldata targets, bytes[] calldata data) external view returns (bytes[] memory) {
        require(targets.length == data.length, "arg length not match");
        bytes[] memory results = new bytes[](data.length);

        for (uint i = 0; i < data.length; i++) {
            // 这里使用 staticcall
            (bool success, bytes memory r) = targets[i].staticcall(data[i]); 
            require(success, "bad call");
            results[i] = r;
        }

        return results;
    }
}
```

在 Multicall 合约里可以对多个合约进行调用，并且返回编码后的数据。


