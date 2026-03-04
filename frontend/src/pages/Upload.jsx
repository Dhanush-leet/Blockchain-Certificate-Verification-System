import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, CheckCircle, Copy, ExternalLink, Loader2, Sparkles } from 'lucide-react';

const Upload = () => {
    const [formData, setFormData] = useState({
        certificateId: '',
        studentName: '',
        course: '',
        university: '',
        year: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const API_BASE_URL = "http://localhost:8080/api/certificates";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/upload`, formData);
            if (response.data.status === "SUCCESS") {
                setResult(response.data);
            } else {
                setError("Submission failed. Please check the backend.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Error connecting to backend");
        } finally {
            setLoading(false);
        }
    };

    const verificationLink = result ? `${window.location.origin}/verify/${result.certificateId}` : '';

    return (
        <div className="max-w-4xl mx-auto py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
                <UploadIcon className="text-primary-400" size={32} />
                <h1 className="text-3xl font-extrabold text-white">Register Certificate</h1>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-8 rounded-2xl flex flex-col gap-5 border-t-2 border-t-primary-500/30"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1">Certificate ID</label>
                        <input name="certificateId" placeholder="e.g. CERT-2027-001" className="input-field" required onChange={handleChange} value={formData.certificateId} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1">Student Full Name</label>
                        <input name="studentName" placeholder="Dhanush G" className="input-field" required onChange={handleChange} value={formData.studentName} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1">Course Name</label>
                        <input name="course" placeholder="B.Tech CSBS" className="input-field" required onChange={handleChange} value={formData.course} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">University</label>
                            <input name="university" placeholder="VSB Engineering College" className="input-field" required onChange={handleChange} value={formData.university} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400 ml-1">Batch Year</label>
                            <input name="year" placeholder="2027" className="input-field" required onChange={handleChange} value={formData.year} />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary mt-4 py-3 flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                        {loading ? 'Processing...' : 'Secure Register'}
                    </button>

                    {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm mt-2">{error}</div>}
                </motion.form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="glass-card p-8 rounded-2xl text-center border-t-2 border-t-green-500/30 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                                <div className="p-3 bg-green-500/10 rounded-full w-fit mx-auto mb-4 border border-green-500/20">
                                    <CheckCircle className="text-green-500" size={32} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Certificate Stored!</h2>
                                <p className="text-slate-400 text-sm mb-6">Unique SHA-256 hash has been anchored to blockchain.</p>

                                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-700/50 mb-6 group cursor-pointer" onClick={() => navigator.clipboard.writeText(result.transactionHash)}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tx Hash</span>
                                        <Copy size={12} className="text-slate-500 group-hover:text-primary-400 transition-colors" />
                                    </div>
                                    <div className="text-xs font-mono text-primary-400 break-all">{result.transactionHash}</div>
                                </div>

                                <div className="flex flex-col items-center bg-white p-4 rounded-xl mx-auto w-fit shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                                    <QRCodeSVG value={verificationLink} size={140} />
                                    <div className="mt-2 text-[10px] text-slate-800 font-bold tracking-tight">VERIFY AUTHENTICITY</div>
                                </div>

                                <a href={`/verify/${result.certificateId}`} className="mt-6 flex items-center justify-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium group underline-offset-4 hover:underline">
                                    Goto Verification Page
                                    <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Upload;
