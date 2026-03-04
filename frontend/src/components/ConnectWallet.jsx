import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet, CheckCircle, AlertCircle, Cpu } from "lucide-react";

const ConnectWallet = ({ onWalletConnect }) => {
    const [account, setAccount] = useState("");
    const [error, setError] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                // Auto-switch to Ganache Network
                try {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x539" }], // 1337 in hex
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [{
                                chainId: "0x539",
                                chainName: "Ganache Local",
                                nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
                                rpcUrls: ["http://127.0.0.1:7545"],
                            }],
                        });
                    }
                }

                setAccount(accounts[0]);
                onWalletConnect(accounts[0]);
                setError("");
            } catch (err) {
                console.error("User denied account access");
                setError("CONNECTION_FAILED: USER_DENIED_ACCESS");
            }
        } else {
            setError("HARDWARE_NOT_FOUND: INSTALL_METAMASK");
        }
    };

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    onWalletConnect(accounts[0]);
                }
            }
        };
        checkIfWalletIsConnected();
    }, [onWalletConnect]);

    return (
        <div className="flex flex-col items-end gap-2">
            {!account ? (
                <button
                    onClick={connectWallet}
                    className="nothing-btn-primary flex items-center gap-2"
                >
                    <Wallet className="w-4 h-4" />
                    <span>CONNECT_WALLET</span>
                </button>
            ) : (
                <div className="group flex items-center gap-3 pl-6 pr-2 py-1.5 rounded-full border border-zinc-800 bg-zinc-950/50 hover:border-white transition-all cursor-default">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">AUTHENTICATED</span>
                        <span className="text-[11px] font-mono text-white opacity-80">
                            {account.slice(0, 6)}...{account.slice(-4)}
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-black" />
                    </div>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 text-[#D71920] px-4 py-2 font-mono text-[10px] tracking-tighter">
                    <AlertCircle className="w-3 h-3" />
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default ConnectWallet;
