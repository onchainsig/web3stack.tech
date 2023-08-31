# Gas 优化

Gas 优化是一个需要注重细节的事情，我们得需要知道怎么做更节约 gas，怎么做更耗费 gas，有的时候还需要结合具体的场景。

[WTF Gas Optimization](https://github.com/WTFAcademy/WTF-gas-optimization) 总结了智能合约省 gas 的技巧，可以详细学习。

**gas 优化的几大原则**

- 访问 storage 比访问 memory 更耗费 gas
- 对于入参，从 calldata 里取一般更节约 gas，因为少了一次 copy
- TODO ...

## 一个小例子

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

// Gas - 60700
contract GasOp {
    uint private total;

    function getTotal() external view returns (uint) {
        return total;
    }

    // Test data: [1, 3, 4, 5, 10, 21, 33, 100]
    function sumIfEvenAndLessThan99(uint[] memory nums) external {
        for (uint i = 0; i < nums.length; i += 1) {
            bool isEven = nums[i] % 2 == 0;
            bool isLessThan99 = nums[i] < 99;

            if (isEven && isLessThan99) {
                total += nums[i];
            }
        }
    }
}
```

部署之后执行 `sumIfEvenAndLessThan99`，大概需要 60700 gas

1. memeory 改成 calldata, 大概需要 58176 gas
2. 引入内存中的状态变量，而不是每次读取 storage 变量，大概需要 57933 gas

```solidity
contract GasOp {
    uint private total;

    function getTotal() external view returns (uint) {
        return total;
    }

    // Test data: [1, 3, 4, 5, 10, 21, 33, 100]
    function sumIfEvenAndLessThan99(uint[] calldata nums) external {
        uint _total = total;
        for (uint i = 0; i < nums.length; i += 1) {
            bool isEven = nums[i] % 2 == 0;
            bool isLessThan99 = nums[i] < 99;

            if (isEven && isLessThan99) {
                _total += nums[i];
            }
        }

        total = _total;
    }
}
```
3. short circuit, 大概需要 57383 gas

```solidity
contract GasOp {
    uint private total;

    function getTotal() external view returns (uint) {
        return total;
    }

    // Test data: [1, 3, 4, 5, 10, 21, 33, 100]
    function sumIfEvenAndLessThan99(uint[] calldata nums) external {
        uint _total = total;
        for (uint i = 0; i < nums.length; i += 1) {
            if (nums[i] % 2 == 0 && nums[i] < 99) {
                _total += nums[i];
            }
        }

        total = _total;
    }
}
```

4. 把 i+=1 换成 ++i，大概需要 56813 gas
5. 引入临时变量来存放 nums[i]，大概需要 56656 gas
6. 引入临时变量来存放数组长度，大概需要 56598 gas

最后合约优化成这样

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.7 <0.9.0;

// Gas - 60700
// Opt:
//  1. use calldata
//  2. state variable to emmory
//  3. short circuit
//  4. ++i
//  5. load array elements to memory
//  6. cache array length
contract GasOp {
    uint private total;

    function getTotal() external view returns (uint) {
        return total;
    }

    // Test data: [1, 3, 4, 5, 10, 21, 33, 100]
    function sumIfEvenAndLessThan99(uint[] calldata nums) external {
        uint _total = total;
        uint len = nums.length;
        for (uint i = 0; i < len; ++i) {
            uint num = nums[i];
            if (num % 2 == 0 && num < 99) {
                _total += num;
            }
        }

        total = _total;
    }
}
```

可以看到，由于编码细节的不同，从 60700 gas 优化到 56598 gas，还是节约了很多 gas 的，而这只是 gas 优化的冰山一角。
