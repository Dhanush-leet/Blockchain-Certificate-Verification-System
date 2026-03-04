import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, CreditCard, CheckCircle2, QrCode } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center py-12 lg:py-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
            >
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium">
                    <ShieldAlert size={16} />
                    Blockchain-Powered Security
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary-400 to-blue-300 bg-clip-text text-transparent">
                    Decline Certificate Fraud Forever
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
                    Verify academic certificates instantly with decentralized blockchain technology.
                    Ensure authenticity with SHA-256 hashing and Ethereum smart contracts.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/upload" className="btn-primary flex items-center justify-center gap-2 text-lg py-3 px-8 group">
                        <CreditCard size={20} className="group-hover:rotate-12 transition-transform" />
                        Admin Upload
                    </Link>
                    <Link to="/verify" className="btn-secondary flex items-center justify-center gap-2 text-lg py-3 px-8 group">
                        <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                        Verify Certificate
                    </Link>
                </div>
            </motion.div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                <FeatureCard
                    icon={<ShieldAlert className="text-primary-400" size={32} />}
                    title="Immutable Hash"
                    desc="We store unique SHA-256 hashes of certificate data on the blockchain, making edits detectable."
                />
                <FeatureCard
                    icon={<QrCode className="text-primary-400" size={32} />}
                    title="QR Verification"
                    desc="Generate unique QR codes for every certificate that link directly to its verification page."
                />
                <FeatureCard
                    icon={<div className="text-primary-400 font-bold text-2xl">0%</div>}
                    title="Zero Counterfeiting"
                    desc="By cryptographically linking student data to Ethereum, forgery becomes impossible."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group translate-y-0 hover:-translate-y-2 transition-transform duration-300">
        <div className="mb-4 p-3 rounded-full bg-primary-900/40 border border-primary-500/10 group-hover:border-primary-500/30 transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm">{desc}</p>
    </div>
);

export default Home;
