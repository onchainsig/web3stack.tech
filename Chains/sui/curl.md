## Quick Query

- sui_multiGetTransactionBlocks

浏览器地址：[suirpc sui_multiGetTransactionBlocks](https://www.suirpc.app/method/sui_multiGetTransactionBlocks)

```shell
curl --request POST \
     --url https://fullnode.mainnet.sui.io:443 \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "sui_multiGetTransactionBlocks",
  "params": [
    [
      "8nWA5kPfxrpaMvUdFSaEn1szbxH8qbHSSWbXkYjhnMp"
    ],
    {
      "showBalanceChanges": true,
      "showEffects": true,
      "showEvents": false,
      "showInput": false,
      "showObjectChanges": false,
      "showRawInput": false
    }
  ]
}
'
```
