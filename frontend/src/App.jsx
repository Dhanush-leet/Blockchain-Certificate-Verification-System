import React, { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import AddCertificate from "./components/AddCertificate";
import VerifyCertificate from "./components/VerifyCertificate";
import { ShieldCheck, Database, Search, Cpu, Globe, Info, ArrowRight, Zap, Shield, Lock, ChevronLeft } from "lucide-react";

function App() {
  const [account, setAccount] = useState("");
  const [view, setView] = useState("INTRO"); // INTRO, STORAGE, VERIFY

  const onWalletConnect = (connectedAccount) => {
    setAccount(connectedAccount);
  };

  const handleStorageSuccess = () => {
    setTimeout(() => setView("VERIFY"), 3000); // Give 3s to see the success message
  };

  const handleVerifySuccess = () => {
    setTimeout(() => setView("STORAGE"), 5000); // Give 5s to see the verified hash
  };

  if (view === "INTRO") {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-[#D71920]/30 overflow-hidden">
        {/* Animated Background Dots */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-6 lg:px-12">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <ShieldCheck className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">CERT.IO</h1>
            </div>
            <ConnectWallet onWalletConnect={onWalletConnect} />
          </div>
        </nav>

        <main className="relative z-10 max-w-screen-xl mx-auto px-6 h-screen flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="nothing-badge w-fit animate-pulse text-[#D71920]">PROTOCOL.STABLE_V1</div>
                <h1 className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter">
                  VERIFIED<br />
                  <span className="text-zinc-700">FOREVER.</span>
                </h1>
              </div>

              <p className="text-zinc-500 font-mono text-lg max-w-lg leading-relaxed">
                The world's most minimalist blockchain credential system.
                Securing professional identities with zero-knowledge proof architecture.
              </p>

              <button
                onClick={() => setView("STORAGE")}
                className="nothing-btn-accent group flex items-center gap-4 text-xl"
              >
                <span>INITIATE_SYSTEM</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-6 rotate-3">
              <div className="nothing-card p-0 overflow-hidden border-zinc-800 h-64 relative group">
                <img
                  src="/images/blockchain.png"
                  alt="Blockchain Network"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute bottom-6 left-6">
                  <p className="font-mono text-[10px] text-white bg-black/80 px-2 py-1 rounded">DATA_STRUCTURE.MESH</p>
                </div>
              </div>
              <div className="nothing-card p-8 space-y-4 bg-white text-black border-none translate-y-12">
                <Shield className="w-10 h-10" />
                <h3 className="font-black text-2xl tracking-tighter leading-none uppercase">Immutable<br />Storage</h3>
                <p className="font-mono text-[10px] opacity-40">ENCRYPTED_LEDGER_DATA.BIN</p>
              </div>
              <div className="nothing-card p-0 overflow-hidden border-zinc-800 -translate-y-6 h-64 relative group">
                <img
                  src="/images/hardware.png"
                  alt="Cryptographic Hardware"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute bottom-6 left-6">
                  <p className="font-mono text-[10px] text-white bg-black/80 px-2 py-1 rounded">HARDWARE_MODULE.V2</p>
                </div>
              </div>
              <div className="nothing-card p-8 space-y-4 border-zinc-800 translate-y-6">
                <Globe className="w-10 h-10 text-[#D71920]" />
                <h3 className="font-black text-2xl tracking-tighter leading-none uppercase">Global<br />Trust</h3>
                <p className="font-mono text-[10px] text-zinc-500">DECENTRALIZED_NODE_MAPPING</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#D71920]/30 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-6 lg:px-12 bg-black/50 backdrop-blur-md">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div
            onClick={() => setView("INTRO")}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full transition-transform group-hover:scale-110">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter">CERT.IO</h1>
              <p className="text-[9px] font-mono tracking-[0.3em] text-[#D71920] animate-dot">
                {view === "STORAGE" ? "STORAGE_ENGINE_ACTIVE" : "VERIFIER_ENGINE_ACTIVE"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            <ConnectWallet onWalletConnect={onWalletConnect} />
          </div>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-6 pt-40 pb-24 h-screen">
        <div className="flex flex-col h-full">
          <div className="mb-12">
            <button
              onClick={() => setView(view === "VERIFY" ? "STORAGE" : "INTRO")}
              className="flex items-center gap-3 text-white/50 hover:text-white transition-all mb-10 group bg-zinc-900/50 hover:bg-zinc-800 px-5 py-2.5 rounded-full border border-zinc-800 w-fit backdrop-blur-sm shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase">BACK_TO_{view === "VERIFY" ? "STORAGE_ENGINE" : "SYSTEM_INTRO"}</span>
            </button>
            <div className="nothing-badge w-fit mb-4">SYSTEM_SEQ_{view === "STORAGE" ? "01" : "02"}</div>
            <h2 className="text-5xl font-black tracking-tighter uppercase">
              {view === "STORAGE" ? "Certificate Storage" : "Identity Verification"}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8 max-w-2xl">
              {view === "STORAGE" ? (
                <div className="nothing-card animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="flex items-center gap-3 mb-8 border-b border-zinc-900 pb-6">
                    <Database className="w-5 h-5 text-[#D71920]" />
                    <h2 className="text-xl font-black tracking-tight">STORAGE_ENGINE</h2>
                  </div>
                  <AddCertificate account={account} onSuccess={handleStorageSuccess} />
                </div>
              ) : (
                <div className="nothing-card animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="flex items-center gap-3 mb-8 border-b border-zinc-900 pb-6">
                    <Search className="w-5 h-5 text-[#D71920]" />
                    <h2 className="text-xl font-black tracking-tight">VERIFIER_ENGINE</h2>
                  </div>
                  <VerifyCertificate account={account} onSuccess={handleVerifySuccess} />
                </div>
              )}
            </div>

            <div className="hidden lg:block space-y-6 animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="nothing-card p-0 overflow-hidden h-96 border-zinc-900 relative group">
                <img
                  src={view === "STORAGE" ? "/images/vault.png" : "/images/verify_scan.png"}
                  alt="System Graphics"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 space-y-2">
                  <div className="nothing-badge w-fit border-white/10 text-white/50">{view === "STORAGE" ? "ENCRYPTION_KERNEL_v1" : "BIOMETRIC_SCAN_v2"}</div>
                  <p className="font-mono text-[10px] text-zinc-500 tracking-[0.4em] uppercase">SYSTEM_STATE:STABLE</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="nothing-card p-6 border-zinc-900 flex flex-col justify-between h-32">
                  <Cpu className="w-6 h-6 text-[#D71920]" />
                  <p className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest leading-relaxed">Processing_Power.0x5A/sec</p>
                </div>
                <div className="nothing-card p-6 border-zinc-900 flex flex-col justify-between h-32">
                  <Zap className="w-6 h-6 text-white" />
                  <p className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest leading-relaxed">Latency.0.012ms_Stable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative progress trace */}
          <div className="mt-auto pt-12">
            <div className="flex items-center gap-6">
              <div className={`w-12 h-1 rounded-full transition-all duration-1000 ${view === "STORAGE" ? 'bg-[#D71920] w-24' : 'bg-zinc-800'}`} />
              <ArrowRight className={`w-4 h-4 transition-all duration-1000 ${view === "VERIFY" ? 'text-[#D71920] translate-x-2' : 'text-zinc-800'}`} />
              <div className={`w-12 h-1 rounded-full transition-all duration-1000 ${view === "VERIFY" ? 'bg-[#D71920] w-24' : 'bg-zinc-800'}`} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
