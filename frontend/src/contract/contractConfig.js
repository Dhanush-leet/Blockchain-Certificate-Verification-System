export const CONTRACT_ADDRESS = "0x55A75a23a8144275FC5F17Ad2C4126e24B6Ae65c";

export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "certId",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "hash",
                "type": "string"
            }
        ],
        "name": "CertificateStored",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_certId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            }
        ],
        "name": "storeCertificate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_certId",
                "type": "string"
            }
        ],
        "name": "verifyCertificate",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export const NETWORK_CONFIG = {
    chainId: "0x539", // 1337 in hex
    chainName: "Ganache",
    rpcUrls: ["http://127.0.0.1:7545"],
    nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
    },
};
