```go
type PublicKey [PublicKeyLength]byte

type Account struct {
    PublicKey  PublicKey
    PrivateKey ed25519.PrivateKey
}

func NewAccount() Account {
    _, X, _ := ed25519.GenerateKey(nil)
    account, _ := AccountFromBytes(X)
    return account
}

func importWallet() {
    // Import a wallet with base58 private key.
    account, err := types.AccountFromBase58("28WJTTqMuurAfz6yqeTrFMXeFd91uzi9i1AW6F5KyHQDS9siXb8TquAuatvLuCEYdggyeiNKLAUr3w7Czmmf2Rav")
    if err != nil {
        panic(err)
    }

    fmt.Println("Imported base58 wallet address:", account.PublicKey.ToBase58())

    // Import a wallet with bytes slice private key.
    account, err = types.AccountFromBytes([]byte{
        56, 125, 59, 118, 230, 173, 152, 169, 197, 34,
        168, 187, 217, 160, 119, 204, 124, 69, 52, 136,
        214, 49, 207, 234, 79, 70, 83, 224, 1, 224, 36,
        247, 131, 83, 164, 85, 139, 215, 183, 148, 79,
        198, 74, 93, 156, 157, 208, 99, 221, 127, 51,
        156, 43, 196, 101, 144, 104, 252, 221, 108,
        245, 104, 13, 151,
    })
    fmt.Println("Imported bytes slice wallet address:", account.PublicKey.ToBase58())

    // Import a wallet with hex string private key.
    account, err = types.AccountFromHex("387d3b76e6ad98a9c522a8bbd9a077cc7c453488d631cfea4f4653e001e024f78353a4558bd7b794fc64a5d9c9dd063dd7f339c2bc4659068fcdd6cf5680d97")
    fmt.Println("Imported hex string wallet address:", account.PublicKey.ToBase58())

    // bip39 mnemonic
    mnemonic := "pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter"
    seed := bip39.NewSeed(mnemonic, "")
    account, err = types.AccountFromSeed(seed[:32])
    fmt.Println("Imported mnemonic wallet address:", account.PublicKey.ToBase58())

    // bip44 mnemonic
    mnemonic = "neither lonely flavor argue grass remind eye tag avocado spot unusual intact"
    seed = bip39.NewSeed(mnemonic, "") // (mnemonic, password)
    path := `m/44'/501'/0'/0'`
    derivedKey, _ := hdwallet.Derived(path, seed)
    account, _ = types.AccountFromSeed(derivedKey.PrivateKey)
    fmt.Printf("%v => %v\n", path, account.PublicKey.ToBase58())

    // others
    for i := 1; i < 10; i++ {
        path := fmt.Sprintf(`m/44'/501'/%d'/0'`, i)
        derivedKey, _ := hdwallet.Derived(path, seed)
        account, _ := types.AccountFromSeed(derivedKey.PrivateKey)
        fmt.Printf("%v => %v\n", path, account.PublicKey.ToBase58())
    }
}
```
