# Curl

## eth_getLogs

- 查询 Approval Event, 并且指定 owner

```shell
curl --request POST \
     --url https://goerli.infura.io/v3/e9cb57d516ef46628b8fb5bc8eadfa1f \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "eth_getLogs",
  "params": [
    {
      "fromBlock": "0x0",
      "toBlock": "0x989e83",
      "topics": [
        [
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
          "0x000000000000000000000000c15f02ddbcd8ece0e6aee452370b15516d658d0c"
        ],
        [
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
          "0x000000000000000000000000c15f02ddbcd8ece0e6aee452370b15516d658d0c"
        ]
      ]
    }
  ]
}
'
```

- 查询 Permit2 Approval Event

```shell
curl --request POST \
     --url https://goerli.infura.io/v3/e9cb57d516ef46628b8fb5bc8eadfa1f \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "eth_getLogs",
  "params": [
    {
      "fromBlock": "0x0",
      "toBlock": "0x99e60d",
      "topics": [
        "0xda9fa7c1b00402c17d0161b249b1ab8bbec047c5a52207b9c112deffd817036b",
        "0x000000000000000000000000c15f02ddbcd8ece0e6aee452370b15516d658d0c"
      ]
    }
  ]
}
'
```

- 查询 Permit2 Lockdown Event

```shell
curl --request POST \
     --url https://goerli.infura.io/v3/e9cb57d516ef46628b8fb5bc8eadfa1f \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "eth_getLogs",
  "params": [
    {
      "fromBlock": "0x0",
      "toBlock": "0x99e60d",
      "topics": [
        "0x89b1add15eff56b3dfe299ad94e01f2b52fbcb80ae1a3baea6ae8c04cb2b98a4",
        "0x000000000000000000000000c15f02ddbcd8ece0e6aee452370b15516d658d0c"
      ]
    }
  ]
}
'
```
