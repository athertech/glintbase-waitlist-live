"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Check, ShieldAlert, Cpu, ArrowRight, Loader2, 
  Terminal, Zap, GitBranch, Share2, Eye, Lock,
  Activity, RefreshCcw, FileText, ChevronRight, AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function SystemOverhaulWaitlist() {
  const [step, setStep] = useState<"IDLE" | "SUCCESS">("IDLE");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Simulation States for Mockup
  const [freshness, setFreshness] = useState(82);
  const [scanState, setScanState] = useState<"SCANNING" | "DETECTING" | "GENERATING" | "SYNCED">("SCANNING");

  useEffect(() => {
    const interval = setInterval(() => {
      setScanState(s => {
        if (s === "SCANNING") return "DETECTING";
        if (s === "DETECTING") return "GENERATING";
        if (s === "GENERATING") return "SYNCED";
        return "SCANNING";
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scanState === "SYNCED") {
        setFreshness(94);
        setTimeout(() => setFreshness(82), 3500);
    }
  }, [scanState]);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("SUCCESS");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to join waitlist. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#F1F5F9] font-sans selection:bg-[#FF4500]/20 overflow-x-hidden">
      {/* Background System Layer */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#020617] to-[#020617] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="h-8 w-8 rounded-lg bg-[#FF4500] shadow-[0_0_20px_rgba(255,69,0,0.4)] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500">
            <div className="h-4 w-4 bg-[#020617] rounded-sm rotate-12" />
          </div>
          <span className="text-sm font-black tracking-[0.3em] uppercase">
            Glint<span className="text-white/20">base</span>
          </span>
        </Link>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest hidden md:block">System_Status: Operational</span>
            <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
            >
                Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-32">
        {/* HERO SECTION */}
        <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-40">
          <div className="lg:col-span-12 xl:col-span-5 space-y-8 text-center xl:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-white/5 bg-white/[0.02] text-[10px] font-mono text-white/40 uppercase tracking-widest">
                <Activity className="h-3 w-3 text-[#FF4500]" />
                Infrastructure Protocol 1.0.4
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white">
                Your documentation, <br />
                <span className="text-white/20 italic">synced to</span> reality.
            </h1>
            <p className="text-sm md:text-md text-white/40 leading-relaxed max-w-xl mx-auto xl:mx-0">
                Glintbase scans your codebase, detects drift in real-time, and opens pull requests with accurate, agent-ready documentation.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center xl:justify-start">
               <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
               >
                Initialize Protocol
               </button>
               <div className="hidden sm:flex items-center gap-3 px-4 py-4 rounded-xl border border-white/5 opacity-40">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">Node_Availability: HIGH</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 relative scale-90 md:scale-100">
             <div className="absolute inset-0 bg-[#FF4500]/5 blur-[120px] rounded-full pointer-events-none" />
             <DashboardMockup state={scanState} freshness={freshness} />
          </div>
        </section>

        {/* HOW IT WORKS LOOP */}
        <section className="py-32 px-6 max-w-7xl mx-auto space-y-20">
           <div className="text-center space-y-4">
              <h2 className="text-[10px] font-mono text-[#FF4500] uppercase tracking-[0.5em]">The Glint Loop</h2>
              <p className="text-3xl font-black text-white uppercase tracking-tight">The Self-Healing Documentation Pipeline</p>
           </div>
           
           <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2 hidden lg:block" />
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
                 <LoopStep number="01" label="Code Push" icon={<GitBranch />} />
                 <LoopStep number="02" label="Scan" icon={<Activity />} />
                 <LoopStep number="03" label="Detect" icon={<AlertTriangle />} signal />
                 <LoopStep number="04" label="Generate" icon={<Cpu />} />
                 <LoopStep number="05" label="Sync" icon={<RefreshCcw />} />
              </div>
           </div>
        </section>

        {/* SYSTEM OUTPUT SECTION - DEV VS AGENT */}
        <section className="py-40 px-6 max-w-7xl mx-auto space-y-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
              {/* For Developers */}
              <div className="space-y-12">
                 <div className="space-y-4">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Protocol_01: Terminal Output</div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">For Developers</h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-md">Maintain sanity with automated parity monitoring and seamless drift resolution.</p>
                 </div>
                 
                 <div className="space-y-4">
                    <SystemCard 
                        title="Freshness Index" 
                        value="94.2%" 
                        desc="System-wide documentation audit score"
                        icon={<Activity className="text-green-500" />}
                    />
                    <SystemCard 
                        title="Drift Resolution" 
                        value="< 2m" 
                        desc="Avg. time from push to generated parity PR"
                        icon={<Zap className="text-[#FF4500]" />}
                    />
                 </div>
              </div>

              {/* PR Preview Component */}
              <div className="space-y-6">
                 <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Protocol_02: Artifact Preview</div>
                 <PRPreviewComponent />
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 pt-20">
              <div className="space-y-6 order-2 lg:order-1">
                 <AgentArtifactsPreview />
              </div>
              <div className="space-y-12 order-1 lg:order-2">
                 <div className="space-y-4">
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Protocol_03: Machine Interface</div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">For AI Agents</h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-md">Equip your coding assistants and MCP clients with perfect machine-readable context.</p>
                 </div>
                 <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between group hover:border-[#FF4500]/20 transition-all">
                       <div className="flex items-center gap-4">
                          <FileText className="h-5 w-5 text-white/20 group-hover:text-[#FF4500]" />
                          <div>
                             <div className="text-[11px] font-black uppercase tracking-widest">llms.txt</div>
                             <div className="text-[10px] text-white/30 uppercase tracking-widest">Automated context for AI agents</div>
                          </div>
                       </div>
                       <ChevronRight className="h-4 w-4 text-white/10" />
                    </div>
                    <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between group hover:border-[#FF4500]/20 transition-all">
                       <div className="flex items-center gap-4">
                          <Share2 className="h-5 w-5 text-white/20 group-hover:text-[#FF4500]" />
                          <div>
                             <div className="text-[11px] font-black uppercase tracking-widest">MCP Server Card</div>
                             <div className="text-[10px] text-white/30 uppercase tracking-widest">Agentic tool discovery schemas</div>
                          </div>
                       </div>
                       <ChevronRight className="h-4 w-4 text-white/10" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* SIGNUP SECTION */}
        <section id="signup" className="py-60 px-6 max-w-3xl mx-auto text-center space-y-16">
           <AnimatePresence mode="wait">
              {step === "IDLE" ? (
                 <motion.div 
                    key="idle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-12"
                >
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Reserve Node</h2>
                        <p className="text-[11px] font-mono text-white/20 uppercase tracking-[0.4em]">Initialize entry into the synchronization protocol.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="relative group max-w-md mx-auto z-50">
                        <input
                            required
                            type="email"
                            placeholder="TERMINAL@GLINTBASE.COM"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/10 px-6 py-5 rounded-xl font-mono text-xs text-white uppercase tracking-widest focus:outline-none focus:border-[#FF4500]/40 focus:bg-white/[0.04] transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-6 w-full bg-[#FF4500] text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FF4500]/90 transition-all disabled:opacity-50 relative overflow-hidden"
                        >
                            {isSubmitting ? "TRANSMITTING..." : "REQUEST_ACCESS"}
                        </button>
                        {errorMsg && (
                            <div className="absolute -bottom-10 left-0 right-0 text-[#FF4500] text-[10px] uppercase font-black tracking-widest bg-[#FF4500]/10 py-2 rounded-lg border border-[#FF4500]/20">
                                {errorMsg}
                            </div>
                        )}
                    </form>
                 </motion.div>
              ) : (
                <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8 py-20"
                >
                    <div className="h-20 w-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-10">
                        <Check className="h-10 w-10 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">Queue Reserved</h2>
                    <p className="text-xs text-white/40 uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">Identity synchronized. You will receive a transmission once node capacity becomes available.</p>
                    <Link href="/" className="inline-block text-[10px] font-mono text-white/20 hover:text-white uppercase tracking-[0.5em] transition-colors pt-10">Return to base</Link>
                </motion.div>
              )}
           </AnimatePresence>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/20 backdrop-blur-3xl">
         <div className="text-[10px] font-mono text-white/10 uppercase tracking-widest">© 2024 Glintbase Protocol</div>
         <div className="flex gap-12">
            {["GitHub", "Documentation", "Twitter"].map(item => (
                <a key={item} href="#" className="text-[10px] font-mono text-white/20 hover:text-[#FF4500] uppercase tracking-widest transition-colors">{item}</a>
            ))}
         </div>
      </footer>
    </div>
  );
}

function LoopStep({ number, label, icon, signal }: any) {
    return (
        <div className="flex flex-col items-center gap-6 group">
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${signal ? 'bg-[#FF4500]/5 border-[#FF4500]/40 shadow-[0_0_30px_rgba(255,69,0,0.2)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
                <div className={`h-6 w-6 ${signal ? 'text-[#FF4500]' : 'text-white/20 group-hover:text-white/60'} transition-colors`}>{icon}</div>
            </div>
            <div className="text-center space-y-1">
                <div className="text-[9px] font-mono text-white/10">{number}</div>
                <div className="text-[10px] font-black uppercase tracking-widest">{label}</div>
            </div>
        </div>
    );
}

function SystemCard({ title, value, desc, icon }: any) {
    return (
        <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-6 hover:bg-white/[0.03] transition-all">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{title}</span>
                    <span className="text-xl font-black font-mono text-white">{value}</span>
                </div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{desc}</p>
            </div>
        </div>
    );
}

function DashboardMockup({ state, freshness }: any) {
    return (
        <motion.div 
            style={{ transform: "perspective(1200px) rotateY(-15deg) rotateX(8deg)" }}
            className="w-full aspect-[4/3] rounded-3xl border border-white/10 bg-[#020617] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        >
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500/40" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
                    <div className="h-2 w-2 rounded-full bg-green-500/40" />
                </div>
                <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Engine_Monitor: glint-core/main</div>
            </div>

            <div className="flex-1 grid grid-cols-12 overflow-hidden">
                {/* Sidebar */}
                <div className="col-span-3 border-r border-white/5 p-6 space-y-4 bg-white/[0.01]">
                    <div className="h-3 w-3/4 rounded bg-white/5 animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-white/5" />
                    <div className="h-3 w-2/3 rounded bg-white/5" />
                    <div className="pt-8 space-y-2">
                        <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest">Repositories</div>
                        <div className="p-2 rounded bg-white/5 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <div className="text-[8px] font-bold text-white/40">Glintbase</div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-9 p-8 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                            <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-2">Freshness Score</div>
                            <div className="text-3xl font-black font-mono text-white">{freshness}%</div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                            <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-2">Status</div>
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${state === 'SYNCED' ? 'bg-green-500' : 'bg-[#FF4500] animate-pulse'}`} />
                                <div className="text-[10px] font-black text-white uppercase">{state}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 rounded-xl border border-white/5 bg-black/40 p-6 overflow-hidden relative">
                         <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest mb-4">Live_System_Logs</div>
                         <div className="space-y-1.5">
                            <LogLine active={state === 'SCANNING'}>[INF] AST_SCAN_INIT: glint-core/main</LogLine>
                            <LogLine active={state === 'DETECTING'}>[WARN] DRIFT_DETECTED: auth/login.ts</LogLine>
                            <LogLine active={state === 'DETECTING'}>[WARN] SIG_MISMATCH: protocol/adapter.tsx</LogLine>
                            <LogLine active={state === 'GENERATING'}>[AGENT] LLM_OP: Computing vector deltas...</LogLine>
                            <LogLine active={state === 'GENERATING'}>[AGENT] PR_DRAFT_READY: #142</LogLine>
                            <LogLine active={state === 'SYNCED'} success>[SUCCESS] SYNC_COMPLETE: Docs are current</LogLine>
                         </div>
                         <div className="absolute top-0 right-0 p-4">
                             <div className="text-[7px] font-mono text-[#FF4500] uppercase animate-pulse">Running_Pipeline_V1</div>
                         </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function LogLine({ children, active, success }: any) {
    return (
        <div className={`text-[9px] font-mono transition-colors duration-500 ${active ? 'text-white' : success ? 'text-green-500' : 'text-white/10'}`}>
            {children}
        </div>
    );
}

function PRPreviewComponent() {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded bg-[#2EA043] flex items-center justify-center">
                        <GitBranch className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-bold text-white">Fix auth docs + sync schema #142</span>
                </div>
                <div className="px-2 py-0.5 rounded border border-white/10 text-[8px] font-bold text-white/20">DRAFT</div>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-green-500/5 border border-green-500/10">
                        <span className="text-[8px] font-bold text-green-500">CON_SCORE: 98.4%</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#FF4500]/5 border border-[#FF4500]/10">
                        <span className="text-[8px] font-bold text-[#FF4500]">NODES_SYNCED: 7</span>
                    </div>
                </div>

                <div className="text-[10px] text-white/40 leading-relaxed">
                    Synced <span className="text-white/60">auth/login.ts</span> endpoint changes with <span className="text-white/60">auth.md</span> and updated the <span className="text-white/60">llms.txt</span> catalog.
                </div>

                <div className="rounded border border-white/5 bg-black/40 overflow-hidden">
                    <div className="px-3 py-1.5 bg-white/5 text-[9px] font-mono text-white/30 border-b border-white/5">docs/auth.md</div>
                    <div className="p-4 font-mono text-[9px] space-y-1">
                        <div className="text-white/10">- `validate(token: string)`</div>
                        <div className="text-green-500/60">+ `validate(credentials: OAuthToken)`</div>
                        <div className="text-white/30">  The system now validates via OAuth abstraction...</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AgentArtifactsPreview() {
    return (
        <div className="aspect-square rounded-3xl border border-white/10 bg-[#020617] p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,69,0,0.05),transparent)]" />
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest border-b border-white/5 pb-4">Machine_Readable_Catalog</div>
            
            <div className="flex-1 space-y-6">
                <div className="space-y-4">
                    <div className="text-[9px] font-black text-white/60 uppercase">llms.txt (Static Context)</div>
                    <div className="p-4 rounded-xl border border-white/5 bg-black/40 font-mono text-[9px] text-white/30 leading-relaxed">
                        # Glintbase API v2<br />
                        ## Endpoints<br />
                        - `POST /v2/sync` : Synchronize node state...<br />
                        - `GET /v2/health` : Inspect engine heartbeat...
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-[9px] font-black text-white/60 uppercase">mcp_card.json (Agent Protocol)</div>
                    <div className="p-4 rounded-xl border border-white/5 bg-black/40 font-mono text-[9px] text-white/30 leading-relaxed text-[#FF4500]/60">
                        {`{ "name": "GlintBot", "tools": [ { "name": "resolve_drift", "input": {...} } ] }`}
                    </div>
                </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-white/5">
                <div className="flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                </div>
                <div className="text-[8px] font-mono text-white/10 uppercase">Agent_Sync: ACTIVE</div>
            </div>
        </div>
    );
}
