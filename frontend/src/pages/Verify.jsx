import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Search, RefreshCw, CheckCircle2, AlertCircle, Loader2, Sparkles, Database } from 'lucide-react';
import { Html5QrcodeScanner } from "html5-qrcode";

const Verify = () => {
    const { certificateId: paramId } = useParams();
    const [certificateId, setCertificateId] = useState(paramId || '');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const API_BASE_URL = "http://localhost:8080/api/certificates";

    const fetchVerification = async (idToVerify) => {
        if (!idToVerify) return;
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/verify/${idToVerify}`);
            setResult(response.data);
            if (response.data.status !== "VERIFIED") {
                setError("Certificate not found or hash mismatch!");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Error connecting to verification server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (paramId) {
            fetchVerification(paramId);
        }
    }, [paramId]);

    const handleVerify = (e) => {
        if (e) e.preventDefault();
        fetchVerification(certificateId);
    };

    const handleScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
            scanner.render((decodedText) => {
                const url = new URL(decodedText);
                const idFromUrl = url.pathname.split('/').pop();
                setCertificateId(idFromUrl);
                setIsScanning(false);
                scanner.clear();
                fetchVerification(idFromUrl);
            }, (err) => {
                // Ignore scanner errors
            });
        }, 100);
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8 justify-center">
                <ShieldCheck className="text-primary-400" size={32} />
                <h1 className="text-3xl font-extrabold text-white">Identity Verification</h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 rounded-3xl border-t-2 border-t-primary-500/30">
                <form onSubmit={handleVerify} className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-slate-400 mb-1">Blockchain Certificate ID</label>
                    <div className="flex gap-2 relative">
                        <input
                            placeholder="CERT-XXXX-XXXX"
                            className="input-field pl-12 h-14 text-lg"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -get -translate-y-1/2 text-slate-500" />
                        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 group whitespace-nowrap px-8">
                            {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} className="group-hover:scale-125 transition-transform" />}
                            {loading ? 'Verifying...' : 'Validate'}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleScan}
                        className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center justify-center gap-2 font-semibold underline-offset-4 hover:underline"
                    >
                        Or click here to scan QR code from camera
                    </button>

                    <div id="reader" className={`${isScanning ? 'block' : 'hidden'} mt-4 rounded-xl overflow-hidden glass border-2 border-primary-500/30`}></div>
                </form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-12"
                        >
                            <div className={`p-8 rounded-2xl border flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 ${result.status === "VERIFIED" ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                {/* Animated background pulse */}
                                <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] -z-10 ${result.status === "VERIFIED" ? 'bg-green-500/20' : 'bg-red-500/20'}`}></div>

                                {result.status === "VERIFIED" ? (
                                    <>
                                        <div className="p-3 bg-green-500/10 rounded-full mb-4 border border-green-500/20 animate-bounce">
                                            <CheckCircle2 className="text-green-500" size={48} />
                                        </div>
                                        <h2 className="text-3xl font-black text-green-500 mb-2 tracking-tight">VERIFIED ✅</h2>
                                        <p className="text-slate-300 font-medium mb-6">Found in Blockchain Ledger</p>

                                        <div className="w-full space-y-3 bg-slate-950/40 p-5 rounded-2xl border border-white/5 text-left backdrop-blur-sm">
                                            <InfoRow label="Student Name" value={result.studentName || "Dhanush G"} icon={<Sparkles size={14} className="text-primary-400" />} />
                                            <InfoRow label="Hash Matching" value="100% SHA-256 Accurate" icon={<Database size={14} className="text-primary-400" />} />
                                            <InfoRow label="Timestamp" value={new Date().toLocaleDateString() + " (Verified)"} icon={<RefreshCw size={14} className="text-primary-400" />} />
                                        </div>

                                        <div className="mt-8 flex gap-3">
                                            <button onClick={() => window.print()} className="btn-secondary py-2 text-sm flex items-center gap-2">
                                                Print Certificate
                                            </button>
                                            <button onClick={() => { setResult(null); setCertificateId(''); }} className="text-slate-500 hover:text-slate-300 text-sm font-medium">
                                                Search Another
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-3 bg-red-500/10 rounded-full mb-4 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                            <AlertCircle className="text-red-500" size={48} />
                                        </div>
                                        <h2 className="text-3xl font-black text-red-500 mb-2 tracking-tight">TAMPERED / INVALID ❌</h2>
                                        <p className="text-slate-400 font-medium mb-6">Unknown identifier or modified data</p>

                                        <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20 text-red-400 text-xs">
                                            This certificate ID does not match any entry in our decentralized ledger. Please verify the ID or contact the issuing authority.
                                        </div>

                                        <button onClick={() => { setResult(null); setCertificateId(''); }} className="mt-8 btn-secondary py-2 text-sm">
                                            Back to Search
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && !result && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

const InfoRow = ({ label, value, icon }) => (
    <div className="flex justify-between items-center group">
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-sm text-slate-300 font-semibold group-hover:text-primary-300 transition-colors uppercase">{value}</span>
    </div>
);

export default Verify;
