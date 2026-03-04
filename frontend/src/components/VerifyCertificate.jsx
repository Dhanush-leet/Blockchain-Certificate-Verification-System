import React, { useState } from "react";
import { ethers } from "ethers";
import { Search, Loader2, CheckCircle2, ShieldAlert, Cpu, Terminal } from "lucide-react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contract/contractConfig";

const VerifyCertificate = ({ account, onSuccess }) => {
    const [certId, setCertId] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const verifyCertificate = async (e) => {
        e.preventDefault();
        if (!account) return setError("ERROR: WALLET_NOT_CONNECTED");
        if (!certId) return setError("ERROR: MISSING_PARAMETERS");

        try {
            setLoading(true);
            setError("");
            setResult("");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

            const hash = await contract.verifyCertificate(certId);

            if (hash && hash.length > 0 && hash !== "0x0000000000000000000000000000000000000000000000000000000000000000") {
                setResult(hash);
                // Trigger navigation back to Storage after a delay
                if (onSuccess) onSuccess();
            } else {
                setError("LOOKUP_FAIL: RECORD_NOT_FOUND");
            }
        } catch (err) {
            console.error("Verification Error:", err);
            let msg = (err.reason || err.data?.message || err.error?.message || err.message || "NETWORK_FAIL").toUpperCase();
            if (msg.length > 60) msg = `${msg.substring(0, 60)}...`;
            setError(`FAIL: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full space-y-8">
            {error && !loading && (
                <div className="p-6 bg-[#D71920]/5 border border-[#D71920]/20 rounded-[2rem] flex items-center gap-4 text-[#D71920] animate-in slide-in-from-top-2 mb-4">
                    <ShieldAlert className="w-8 h-8 shrink-0 opacity-50" />
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest mb-1 leading-none">SECURITY_ALERT</p>
                        <p className="text-xs font-bold leading-none">{error}</p>
                    </div>
                </div>
            )}

            {result && (
                <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] animate-in fade-in zoom-in-95 duration-500 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-black" />
                        </div>
                        <div className="leading-none">
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">STATUS</p>
                            <p className="text-sm font-black uppercase text-white tracking-tight">VERIFIED_AUTHENTIC</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em] ml-1">BLOCKCHAIN_DATA_HASH</p>
                        <div className="nothing-input bg-black border-zinc-800 text-xs text-white/70 overflow-x-auto break-all font-mono leading-relaxed select-all">
                            {result}
                        </div>
                        <p className="text-[9px] font-mono text-[#D71920] mt-3 animate-pulse">RELOAD_SUCCESS: REDIRECTING_TO_STORAGE...</p>
                    </div>
                </div>
            )}

            <form onSubmit={verifyCertificate} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase ml-2">
                        <Terminal className="w-3 h-3" />
                        QUERY_IDENTIFIER
                    </label>
                    <input
                        type="text"
                        className="nothing-input"
                        placeholder="CERT_ID_0XX"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                    />
                </div>

                <button
                    disabled={loading || !account}
                    type="submit"
                    className="nothing-btn-primary w-full flex items-center justify-center gap-3 overflow-hidden"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                    <span className="font-mono tracking-tighter">
                        {loading ? "INITIALIZING_SCAN..." : "INIT_VERIFICATION"}
                    </span>
                </button>
            </form>

            <div className="flex-grow flex flex-col justify-center min-h-[100px]">




                {!result && !error && !loading && (
                    <div className="text-center py-8">
                        <Cpu className="w-12 h-12 text-zinc-900 mx-auto mb-4" />
                        <p className="text-[10px] font-mono text-zinc-700 tracking-[0.3em] uppercase">WAITING_FOR_INPUT</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyCertificate;
