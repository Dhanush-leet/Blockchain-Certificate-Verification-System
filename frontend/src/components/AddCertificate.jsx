import React, { useState } from "react";
import { ethers } from "ethers";
import { PlusCircle, Loader2, CheckCircle, AlertCircle, Hash, Fingerprint } from "lucide-react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contract/contractConfig";

const AddCertificate = ({ account, onSuccess }) => {
    const [certId, setCertId] = useState("");
    const [hash, setHash] = useState("");
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [error, setError] = useState("");

    const storeCertificate = async (e) => {
        e.preventDefault();
        if (!account) return setError("ERROR: WALLET_NOT_CONNECTED");
        if (!certId || !hash) return setError("ERROR: MISSING_PARAMETERS");

        // PROTOCOL VALIDATION: Prevent 'fake' or malformed records from being stored
        const protocolPattern = /^[A-Z0-9]{3,}-\d{4}-[A-Z0-9]{2,}-\d{3,}$/;
        const isBlacklisted = certId.toUpperCase().includes("FAKE") || certId.toUpperCase().includes("TEST") || certId.toUpperCase().includes("JUNK");

        if (!protocolPattern.test(certId) || isBlacklisted) {
            return setError("FAIL: SECURITY_VIOLATION - MALFORMED_OR_FAKE_ID");
        }

        try {
            setLoading(true);
            setError("");
            setTxHash("");

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const tx = await contract.storeCertificate(certId, hash);
            setTxHash(tx.hash);
            await tx.wait();

            setCertId("");
            setHash("");

            // Trigger navigation to Verifier
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Full Error:", err);

            // Extract the most descriptive error part
            let rawError = (err.reason || err.data?.message || err.error?.message || err.message || "UNKNOWN_ERROR");

            // Forcefully check for the duplicate ID scenario across the whole error object
            const errorString = JSON.stringify(err).toUpperCase();
            let msg = rawError.toUpperCase();

            if (errorString.includes("CERTIFICATE ALREADY EXISTS") || msg.includes("ALREADY EXISTS")) {
                msg = "FAIL: CERTIFICATE ALREADY EXISTS";
            } else if (msg.includes("MISSING REVERT DATA") || msg.includes("ESTIMATEGAS")) {
                // If it's a generic estimation error, it's almost always a duplicate ID since our contract only has that one require
                msg = "FAIL: CERTIFICATE ID COLLISION OR ALREADY EXISTS";
            } else {
                // Truncate extremely long technical errors to keep UI beautiful
                if (msg.length > 60) msg = `${msg.substring(0, 60)}...`;
                if (!msg.startsWith("FAIL:")) msg = `FAIL: ${msg}`;
            }

            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="min-h-[20px]">
                {txHash && (
                    <div className="p-5 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 mb-6">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                            <CheckCircle className="w-5 h-5 text-black" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1 leading-none">COMMIT_SUCCESS</p>
                            <p className="text-sm font-bold text-white mb-2 leading-none uppercase">Stored on Chain</p>
                            <p className="text-[10px] font-mono text-zinc-600 truncate">
                                TX.{txHash}
                            </p>
                            <p className="text-[9px] font-mono text-[#D71920] mt-3 animate-pulse">REDIRECTING_TO_VERIFIER...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-5 bg-[#D71920]/5 border border-[#D71920]/20 rounded-3xl flex items-center gap-4 text-[#D71920] animate-in fade-in zoom-in-95 mb-6">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest mb-1 leading-none">SYSTEM_EXCEPTION</p>
                            <p className="text-xs font-bold leading-none">{error}</p>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={storeCertificate} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase ml-2">
                        <Fingerprint className="w-3 h-3" />
                        CERTIFICATE_ID
                    </label>
                    <input
                        type="text"
                        className="nothing-input"
                        placeholder="ENTITY.ID_001"
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase ml-2">
                        <Hash className="w-3 h-3" />
                        SHA256_HASH
                    </label>
                    <input
                        type="text"
                        className="nothing-input"
                        placeholder="0x9AF...E63"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                    />
                </div>

                <button
                    disabled={loading || !account}
                    type="submit"
                    className="nothing-btn-accent w-full flex items-center justify-center gap-3 overflow-hidden group"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    )}
                    <span className="font-mono tracking-tighter">
                        {loading ? "PROCESSING_TRANSACTION..." : "EXECUTE_STORE_COMMAND"}
                    </span>
                </button>
            </form>


        </div>
    );
};

export default AddCertificate;
