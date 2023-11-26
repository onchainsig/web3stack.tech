
const TokenSpenderPair = "(address token,address spender)";
let abi = [
    "event Approval(address indexed owner, address indexed token, address indexed spender, uint160 amount, uint48 expiration)",
    "event Permit(address indexed owner,address indexed token,address indexed spender,uint160 amount,uint48 expiration,uint48 nonce)",
    "event Lockdown(address indexed owner, address token, address spender)",
    "function approve(address token, address spender, uint160 amount, uint48 expiration) external",
    "function permit(address owner, PermitSingle permitSingle, bytes signature) external",
    `function lockdown(tuple${TokenSpenderPair}[] approvals) external`,
    "function allowance(address, address, address) external view returns (uint160, uint48, uint48)"
];

module.exports = { 
    permit2ContractAddress: '0x000000000022D473030F116dDEE9F6B43aC78BA3',
    permit2Abi: abi,
}