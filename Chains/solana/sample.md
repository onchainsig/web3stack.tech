- Transfer SOL with jsonParsed

```json
// Request
curl https://api.devnet.solana.com -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getTransaction",
    "params": [
      "313wTtj2kGPKWNCUiAxwL57MXQks1FFTNyTtoWLmmvPyC6JREFy7vu7rQ87FjRFptMZMtoenwfSyoRwcV5VuXypL",
      "jsonParsed"
    ]
  }
'
// Response
{"jsonrpc":"2.0","result":{"blockTime":1711927456,"meta":{"computeUnitsConsumed":150,"err":null,"fee":5000,"innerInstructions":[],"logMessages":["Program 11111111111111111111111111111111 invoke [1]","Program 11111111111111111111111111111111 success"],"postBalances":[360966640,10611673440,1],"postTokenBalances":[],"preBalances":[361971640,10610673440,1],"preTokenBalances":[],"rewards":[],"status":{"Ok":null}},"slot":289210605,"transaction":{"message":{"accountKeys":[{"pubkey":"DsqkS4YYodw1PPeUZTgaaYrpZ5wythns9QmFBV3VnjiC","signer":true,"source":"transaction","writable":true},{"pubkey":"B3HSvqGvWVCppZh6A7g7ga94eZS4DRFQNFTPi65f8snc","signer":false,"source":"transaction","writable":true},{"pubkey":"11111111111111111111111111111111","signer":false,"source":"transaction","writable":false}],"instructions":[{"parsed":{"info":{"destination":"B3HSvqGvWVCppZh6A7g7ga94eZS4DRFQNFTPi65f8snc","lamports":1000000,"source":"DsqkS4YYodw1PPeUZTgaaYrpZ5wythns9QmFBV3VnjiC"},"type":"transfer"},"program":"system","programId":"11111111111111111111111111111111","stackHeight":null}],"recentBlockhash":"DTfDSn2ZRkxmjezYboFhx81cEq2D2i1go4ejY1LjmGAk"},"signatures":["313wTtj2kGPKWNCUiAxwL57MXQks1FFTNyTtoWLmmvPyC6JREFy7vu7rQ87FjRFptMZMtoenwfSyoRwcV5VuXypL"]}},"id":1}
```

也就是说我们可以指定 encding 来反序列化 instruction 中的 data 数据，但可能不是所有的都能成功
