"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Check, ShieldAlert, Cpu, ArrowRight, Loader2, 
  Terminal, Zap, GitBranch, Share2, Eye, Lock,
  Activity, RefreshCcw, FileText, ChevronRight, AlertTriangle,
  Play, Globe, CheckCircle2, XCircle, Search, Server, FileCode,
  Sparkles, Code, TerminalSquare
} from "lucide-react";
import Link from "next/link";

// Define dashboard states and mock content for each pillar
type ActivePillar = "GENERATE" | "MAINTAIN" | "VALIDATE" | "DEPLOY" | "AGENTS";

const PILLARS_CONFIG = {
  GENERATE: {
    title: "Start with Code. End with Documentation.",
    description: "AST-driven parsing translates typescript signatures, endpoints, and file dependencies into production-grade Markdown and MDX documents instantly.",
    badge: "AST Engine Active",
    badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    color: "#22d3ee",
    logs: [
      "[SYS] Initializing codebase scan on repo: glint-core/main",
      "[SYS] Mapping AST node references for auth/login.ts",
      "[SYS] Resolved exports: authenticate(), getBearerToken()",
      "[GEN] Synthesizing architectural schemas...",
      "[SUCCESS] Created docs/auth.md and docs/api-reference.md"
    ]
  },
  MAINTAIN: {
    title: "Continuous Parity, Zero Drift.",
    description: "Glintbase watches your codebase, detects signature changes, compares diffs, and opens automated pull requests to align files in real time.",
    badge: "Sync Daemon Active",
    badgeColor: "bg-[#FF4500]/10 border-[#FF4500]/20 text-[#FF4500]",
    color: "#FF4500",
    logs: [
      "[SYNC] Webhook received: Push on branch main",
      "[WARN] DRIFT_DETECTED: auth/login.ts signature modified",
      "[SYNC] Comparing AST delta with docs/auth.md...",
      "[GEN] Modifying validate() description and signatures",
      "[SUCCESS] Pull Request #142 opened: Sync docs to main"
    ]
  },
  VALIDATE: {
    title: "Sandbox Example Validation.",
    description: "Documentation examples shouldn't lie. Glintbase executes code snippets inside an isolated sandbox to test and guarantee correctness before publishing.",
    badge: "Sandbox Guard Active",
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    color: "#10b981",
    logs: [
      "[VAL] Bootstrapping sandbox node container...",
      "[VAL] Extracting code snippets from docs/auth.md",
      "[VAL] Executing: authenticate(token)...",
      "[VAL] Test result: Exit code 0, signature verified",
      "[SUCCESS] All 12 examples validated successfully."
    ]
  },
  DEPLOY: {
    title: "Infrastructure-as-a-Doc Operations.",
    description: "Glintbase compiles and deploys responsive, blazing-fast, SEO-optimized documentation portals hosted on Edge CDN nodes, handling SSL, DNS, and search assets.",
    badge: "DocOps Infrastructure Active",
    badgeColor: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    color: "#8b5cf6",
    logs: [
      "[DEPLOY] Compiling MDX catalog to static site assets...",
      "[DEPLOY] Generating page routes and search indexing schemas",
      "[DEPLOY] Pushing build artifacts to Vercel/Cloudflare CDN Edge",
      "[DEPLOY] Checking SSL state for docs.glintbase.com",
      "[SUCCESS] Deployment complete. Cache purged worldwide."
    ]
  },
  AGENTS: {
    title: "Agent Readiness Infrastructure.",
    description: "Prepare your product for the new developer ecosystem. Glintbase structures codebases with machine-readable assets optimized for Cursor, Claude Code, and Copilot.",
    badge: "Agent System Active",
    badgeColor: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    color: "#f59e0b",
    logs: [
      "[AGENT] Formatting contextual catalog: llms.txt",
      "[AGENT] Synthesizing comprehensive index: llms-full.txt",
      "[AGENT] Exposing tool configurations: mcp_card.json",
      "[AGENT] Indexing semantic embeddings vector space",
      "[SUCCESS] AI Discovery Assets deployed to root."
    ]
  }
};

export default function SystemOverhaulWaitlist() {
  const [step, setStep] = useState<"IDLE" | "SUCCESS">("IDLE");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Interactive states
  const [activePillar, setActivePillar] = useState<ActivePillar>("GENERATE");
  const [playgroundTab, setPlaygroundTab] = useState<"llms" | "mcp" | "embeddings">("llms");
  const [aiChatState, setAiChatState] = useState<"IDLE" | "TYPING" | "COMPLETED">("IDLE");

  // Run a mock typing animation for the AI Discovery chat
  useEffect(() => {
    setAiChatState("IDLE");
    const timer = setTimeout(() => {
      setAiChatState("TYPING");
      const completeTimer = setTimeout(() => {
        setAiChatState("COMPLETED");
      }, 2500);
      return () => clearTimeout(completeTimer);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#020617] to-[#020617] pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF4500]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[50%] bg-[#8b5cf6]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#020617]/85 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-[#FF4500] shadow-[0_0_20px_rgba(255,69,0,0.4)] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500">
              <div className="h-4 w-4 bg-[#020617] rounded-sm rotate-12" />
            </div>
            <span className="text-sm font-black tracking-[0.3em] uppercase">
              Glint<span className="text-white/20">base</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <a 
              href="https://scan.glintbase.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-amber-400 hover:text-amber-300 uppercase tracking-widest hidden sm:flex items-center gap-1.5 bg-amber-500/5 px-3 py-1.5 rounded border border-amber-500/20 hover:bg-amber-500/10 transition-all font-bold"
            >
              <Sparkles className="h-3 w-3 animate-pulse" /> Scanner (Free)
            </a>
            <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest hidden md:block">
              Network: <span className="text-green-500 animate-pulse">Ready</span>
            </span>
            <button 
              onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#FF4500] hover:bg-[#FF4500]/90 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,69,0,0.2)]"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-32">
        {/* HERO SECTION */}
        <section className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-36">
          <div className="lg:col-span-12 xl:col-span-6 space-y-6 lg:space-y-8 text-center xl:text-left z-10">
            <a 
              href="https://scan.glintbase.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-amber-500/20 bg-amber-500/5 text-[10px] font-mono text-amber-400 uppercase tracking-widest hover:bg-amber-500/10 transition-all cursor-pointer w-fit mx-auto xl:mx-0"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              Free: Analyze Your AI Agent Readiness Score &rarr;
            </a>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] text-white">
              Agent-Ready <br />
              <span className="text-white/20 italic">Documentation</span> <br />
              Infrastructure.
            </h1>
            <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-xl mx-auto xl:mx-0">
              Glintbase automatically creates, maintains, validates, deploys, and optimizes documentation for both human developers and autonomous AI agents. Start with code. End with trusted intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center xl:justify-start">
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-[#FF4500] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF4500]/95 transition-all shadow-[0_0_30px_rgba(255,69,0,0.3)]"
              >
                Join Waitlist
              </button>
              <a 
                href="https://scan.glintbase.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Scan Your Docs (Free) &rarr;
              </a>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-6 relative scale-95 md:scale-100">
            <div className="absolute inset-0 bg-[#FF4500]/5 blur-[120px] rounded-full pointer-events-none" />
            <InteractiveDashboard mockupState={activePillar} onTabChange={setActivePillar} />
          </div>
        </section>

        {/* SECTION 1: THE CRISIS (PROBLEM) */}
        <section className="py-20 lg:py-28 border-t border-white/5 bg-black/10">
          <div className="px-6 max-w-7xl mx-auto space-y-16">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h2 className="text-[10px] font-mono text-[#FF4500] uppercase tracking-[0.4em]">The Core Problem</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">Your product is not ready for AI agents</h3>
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                Traditional static documentation is built for manual browser reading. It fails in the developer ecosystem of autonomous agents because of four fundamental blind spots:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CrisisCard 
                title="Documentation Drift" 
                desc="API signatures change daily, but docs update monthly. Stale documentation results in prompt errors, broken integrations, and code translation failure."
                icon={<RefreshCcw className="text-[#FF4500]" />}
              />
              <CrisisCard 
                title="Broken Code Examples" 
                desc="Markdown example blocks are rarely run in production. Outdated parameters cause AI assistants to write broken boilerplates that compile with errors."
                icon={<XCircle className="text-red-400" />}
              />
              <CrisisCard 
                title="Zero Machine Structure" 
                desc="Agents cannot parse raw, infinite HTML folders efficiently. Without semantic structures like llms.txt, assistants waste tokens and context window."
                icon={<Terminal className="text-cyan-400" />}
              />
              <CrisisCard 
                title="Invisible To Ecosystems" 
                desc="New systems search semantic spaces, not Google. If your API lacks agent-ready configurations (MCP schema), LLMs will hallucinate or overlook it."
                icon={<ShieldAlert className="text-amber-400" />}
              />
            </div>
          </div>
        </section>

        {/* SECTION: FREE AGENT READINESS SCANNER CARD */}
        <section className="py-12 border-y border-white/5 bg-gradient-to-b from-black/20 to-black/40 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl border border-amber-500/25 bg-[#080d1a] p-8 md:p-12 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)]">
              {/* Decorative grid pattern inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b05_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b05_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-amber-500/30 bg-amber-500/5 text-[9px] font-mono text-amber-400 uppercase tracking-widest">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    Free Diagnostic Utility
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-none">
                    Test your documentation&apos;s AI compatibility instantly
                  </h3>
                  <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                    How easily can coding systems like **Cursor, Claude Code, and Copilot** query, parse, and write code against your product? Enter your docs URL to receive an instant compatibility audit.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1">
                      <div className="text-xs font-black text-amber-400 uppercase font-mono">01 / Instant Score</div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">Get a composite score (0-100) across 5 criteria bands.</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-black text-amber-400 uppercase font-mono">02 / Diagnostic Audit</div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">Identify missing llms.txt, high token bloat, and invalid syntax.</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-black text-amber-400 uppercase font-mono">03 / Copy-Paste Fixes</div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">Acquire immediate prompt templates to fix and patch failures.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center items-stretch space-y-4 bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <Terminal className="h-4 w-4 text-amber-400" />
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Scanner Terminal Console</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Documentation URL Target</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        disabled 
                        placeholder="https://docs.yourproduct.com" 
                        className="w-full bg-[#050912] border border-white/10 px-4 py-3 rounded-lg font-mono text-[10px] text-white/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <a 
                    href="https://scan.glintbase.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl text-center font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 font-mono"
                  >
                    <span>Scan Documentation Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  
                  <div className="text-[8px] font-mono text-center text-white/20 uppercase tracking-widest">
                    External link to scan.glintbase.xyz
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY IT MATTERS (THE DISCOVERY PARADIGM SHIFT) */}
        <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-[10px] font-mono text-[#FF4500] uppercase tracking-[0.4em]">Developer Discovery</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">The New Discovery Paradigm</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Developers increasingly learn products, libraries, and web APIs directly inside workspace environments through tools like **Cursor**, **Claude Code**, and **GitHub Copilot**.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#FF4500]" />
                  <span className="text-xs font-bold text-white">Accelerate Developer Adoption</span>
                </div>
                <p className="text-[11px] text-white/30 leading-normal pl-7">
                  If coding agents can effortlessly read and parse your product&apos;s API framework, your repository integrations and API usage will grow rapidly.
                </p>
              </div>
            </div>

            {/* Chat Simulation Visual Widget */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#070b19] p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-[#FF4500]" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Agent_Query: Claude Code v1</span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                </div>
                
                <div className="space-y-4 text-xs font-mono">
                  {/* Prompt */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="text-white/30">prompt$</span> use glintbase to authenticate request and check status
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Without Glintbase */}
                    <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/15 space-y-3">
                      <div className="flex items-center gap-2 text-red-400 font-bold text-[10px]">
                        <XCircle className="h-3 w-3" /> TRADITIONAL STATIC DOCS
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        Scanning docs/auth... file not found. Falling back to Google search. Stalling... Auth API parameter mismatch. 
                      </p>
                      <div className="text-[9px] text-red-400 bg-red-400/5 px-2 py-1 rounded">
                        Result: Compilation failure. Example uses deprecated method.
                      </div>
                    </div>

                    {/* With Glintbase */}
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/15 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px]">
                        <CheckCircle2 className="h-3 w-3" /> GLINTBASE PROTOCAL
                      </div>
                      <p className="text-[10px] text-white/40 leading-relaxed">
                        Reading /llms.txt... Found match: authenticate(req). Exposes schema parameter definition. Initiating verify.
                      </p>
                      <div className="text-[9px] text-emerald-400 bg-emerald-400/5 px-2 py-1 rounded">
                        Result: Executed correctly first try. Imports generated successfully.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE GLINT PROTOCOL PIPELINE */}
        <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto space-y-16 border-t border-white/5">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-mono text-[#FF4500] uppercase tracking-[0.5em]">The Glint Engine</h2>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">The Self-Healing Documentation Pipeline</h3>
            <p className="text-xs sm:text-sm text-white/40 max-w-xl mx-auto">
              How the platform automatically synchronizes codebase logic with both humans and machine clients in real time.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.08),transparent)] -translate-y-1/2 hidden lg:block" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
              <LoopStep number="01" label="Repo Connect" icon={<GitBranch />} description="Glintbase connects to GitHub / Gitlab" />
              <LoopStep number="02" label="Generate" icon={<FileCode />} description="Extracts AST patterns & creates docs structure" />
              <LoopStep number="03" label="Maintain" icon={<Activity />} description="Detects codebase drift in real-time" />
              <LoopStep number="04" label="Validate" icon={<Play />} description="Runs snippets in isolated test sandboxes" />
              <LoopStep number="05" label="Deploy" icon={<Globe />} description="Deploys fast web portal hosted at edge" />
              <LoopStep number="06" label="Agent Readiness" icon={<Cpu />} description="Exposes llms.txt & MCP server integrations" signal />
            </div>
          </div>
        </section>

        {/* SECTION 4: THE FIVE PILLARS (BENTO GRID) */}
        <section className="py-20 lg:py-32 bg-black/10 border-y border-white/5 px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-[10px] font-mono text-[#FF4500] uppercase tracking-[0.4em]">Platform Capabilities</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">The Five Pillars of Documentation Intelligence</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Pillar 1: Generate */}
              <div className="lg:col-span-8 p-8 rounded-2xl border border-white/5 bg-[#020617] flex flex-col justify-between group hover:border-cyan-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.03),transparent)]" />
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-cyan-500/5 border border-cyan-500/15 flex items-center justify-center">
                    <FileCode className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Pillar 01 / Generation</span>
                    <h4 className="text-xl font-black text-white mt-1 uppercase">Start with Code. End with Documentation.</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed max-w-xl">
                    No documentation? No problem. Glintbase maps code hierarchies, AST parameters, and dependencies automatically. It translates raw developer codebases into detailed manuals, guides, API layouts, and readmes out of the box.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">AST-Driven Generation Engine</span>
                  <span className="text-xs font-black text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">Configure Generation <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>

              {/* Pillar 2: Maintain */}
              <div className="lg:col-span-4 p-8 rounded-2xl border border-white/5 bg-[#020617] flex flex-col justify-between group hover:border-[#FF4500]/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,69,0,0.03),transparent)]" />
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-[#FF4500]/5 border border-[#FF4500]/15 flex items-center justify-center">
                    <RefreshCcw className="h-5 w-5 text-[#FF4500]" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#FF4500] uppercase tracking-widest">Pillar 02 / Maintenance</span>
                    <h4 className="text-xl font-black text-white mt-1 uppercase">Continuous Sync</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Glintbase tracks codebase modifications, compares AST delta trees against existing files, drafts PR modifications, and triggers warning flags when drift is detected.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Drift Monitor</span>
                  <span className="text-xs font-black text-[#FF4500] group-hover:translate-x-1 transition-transform flex items-center gap-1">Learn More <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>

              {/* Pillar 3: Validate */}
              <div className="lg:col-span-4 p-8 rounded-2xl border border-white/5 bg-[#020617] flex flex-col justify-between group hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent)]" />
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center">
                    <Play className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Pillar 03 / Validation</span>
                    <h4 className="text-xl font-black text-white mt-1 uppercase">Sandbox Testing</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Verify code snippets written inside document headers. Automatically launch isolated sandbox node systems, run testing calls, check return layouts, and flag issues.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Compiler Guard</span>
                  <span className="text-xs font-black text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">Check sandbox <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>

              {/* Pillar 4: Deploy */}
              <div className="lg:col-span-4 p-8 rounded-2xl border border-white/5 bg-[#020617] flex flex-col justify-between group hover:border-violet-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.03),transparent)]" />
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-violet-500/5 border border-violet-500/15 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-violet-400 uppercase tracking-widest">Pillar 04 / Deployment</span>
                    <h4 className="text-xl font-black text-white mt-1 uppercase">DocOps Infrastructure</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Build and compile optimized static pages with layout components. Deploy direct documentation portfolios globally at the Edge, managing hosting pipelines automatically.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Edge CDN Delivery</span>
                  <span className="text-xs font-black text-violet-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">Review hosting <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>

              {/* Pillar 5: Enable Agents */}
              <div className="lg:col-span-4 p-8 rounded-2xl border border-white/5 bg-[#020617] flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.03),transparent)]" />
                <div className="space-y-4 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/5 border border-amber-500/15 flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest">Pillar 05 / Agents</span>
                    <h4 className="text-xl font-black text-white mt-1 uppercase">Agent Infrastructure</h4>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Bridge the human-machine documentation divide. Autogenerate machine-readable config descriptors, structured semantic indexes, and tool discovery assets.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">AI Agent Parity</span>
                  <span className="text-xs font-black text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">Verify schemas <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE AGENT READINESS PLAYGROUND */}
        <section className="py-20 lg:py-32 px-6 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-[10px] font-mono text-[#FF4500] uppercase tracking-[0.4em]">Engine Output</h2>
              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-none">Ecosystem Integration Outputs</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Glintbase generates optimized configuration assets directly in the root of your application, enabling instant developer integration by coding agents.
              </p>
              
              <div className="space-y-4">
                <PlaygroundSelector 
                  active={playgroundTab === "llms"} 
                  onClick={() => setPlaygroundTab("llms")}
                  title="llms.txt" 
                  desc="Structured index and catalog for LLM search context" 
                />
                <PlaygroundSelector 
                  active={playgroundTab === "mcp"} 
                  onClick={() => setPlaygroundTab("mcp")}
                  title="mcp.json" 
                  desc="Model Context Protocol config for tool discovery" 
                />
                <PlaygroundSelector 
                  active={playgroundTab === "embeddings"} 
                  onClick={() => setPlaygroundTab("embeddings")}
                  title="Semantic Embeddings" 
                  desc="Vector database inputs for Retrieval Augmented Generation" 
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#020617] shadow-2xl overflow-hidden min-h-[380px] flex flex-col">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">output_file: {playgroundTab === 'llms' ? 'llms.txt' : playgroundTab === 'mcp' ? 'mcp.json' : 'embeddings.json'}</span>
                  </div>
                  <span className="text-[8px] font-mono text-white/20 uppercase">Target: AI CLIENT</span>
                </div>
                
                <div className="flex-1 p-6 font-mono text-xs text-white/60 leading-relaxed overflow-x-auto bg-[#030712]">
                  <AnimatePresence mode="wait">
                    {playgroundTab === "llms" && (
                      <motion.pre 
                        key="llms" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="whitespace-pre-wrap"
                      >
                        {`# Glintbase Core API

## System Endpoints
- POST /v1/scan : Initiate AST evaluation
- GET /v1/drift : Retrieve divergence statistics

## Schema Definitions
- Request: { repo_url: string, commit_sha: string }
- Response: { status: 'diverged' | 'aligned', score: number }

## Authentication
Authorization: Bearer <publishable_key>`}
                      </motion.pre>
                    )}

                    {playgroundTab === "mcp" && (
                      <motion.pre 
                        key="mcp" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="whitespace-pre-wrap text-amber-300/80"
                      >
                        {`{
  "name": "glintbase-intelligence-server",
  "version": "1.0.4",
  "tools": [
    {
      "name": "resolve_drift",
      "description": "Trigger code synthesis and update stale documentation markdown references",
      "inputSchema": {
        "type": "object",
        "properties": {
          "file_path": { "type": "string" }
        },
        "required": ["file_path"]
      }
    }
  ]
}`}
                      </motion.pre>
                    )}

                    {playgroundTab === "embeddings" && (
                      <motion.pre 
                        key="embeddings" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="whitespace-pre-wrap text-cyan-300/80"
                      >
                        {`[
  {
    "id": "node_auth_login",
    "vector": [0.0124, -0.9841, 0.4851, 0.1205, ...],
    "metadata": {
      "file": "src/auth/login.ts",
      "description": "JSON Web Token evaluation and verification endpoints",
      "checksum": "8b5cf6e8"
    }
  }
]`}
                      </motion.pre>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNUP SECTION */}
        <section id="signup" className="py-24 lg:py-40 px-6 max-w-3xl mx-auto text-center space-y-12 lg:space-y-16">
          <AnimatePresence mode="wait">
            {step === "IDLE" ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 lg:space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter">Reserve Node</h2>
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
                    <div className="absolute -bottom-12 left-0 right-0 text-[#FF4500] text-[10px] uppercase font-black tracking-widest bg-[#FF4500]/10 py-2 rounded-lg border border-[#FF4500]/20">
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
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">Queue Reserved</h2>
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">Identity synchronized. You will receive a transmission once node capacity becomes available.</p>
                <button 
                  onClick={() => setStep("IDLE")} 
                  className="inline-block text-[10px] font-mono text-white/20 hover:text-white uppercase tracking-[0.5em] transition-colors pt-10"
                >
                  Register another node
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/20 backdrop-blur-3xl">
        <div className="text-[10px] font-mono text-white/10 uppercase tracking-widest">© 2026 Glintbase Protocol</div>
        <div className="flex gap-12">
          {["GitHub", "Documentation", "Twitter"].map(item => (
            <a key={item} href="#" className="text-[10px] font-mono text-white/20 hover:text-[#FF4500] uppercase tracking-widest transition-colors">{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

// Subcomponents

function CrisisCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all space-y-4">
      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-black text-white uppercase tracking-wider">{title}</h4>
        <p className="text-[11px] text-white/30 uppercase tracking-wide leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function LoopStep({ number, label, icon, description, signal }: any) {
  return (
    <div className="flex flex-col items-center gap-4 group text-center relative z-10">
      <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${signal ? 'bg-[#FF4500]/5 border-[#FF4500]/40 shadow-[0_0_30px_rgba(255,69,0,0.2)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}>
        <div className={`h-6 w-6 ${signal ? 'text-[#FF4500]' : 'text-white/20 group-hover:text-white/60'} transition-colors`}>{icon}</div>
      </div>
      <div className="space-y-1">
        <div className="text-[9px] font-mono text-white/20">{number}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-white">{label}</div>
        <p className="text-[9px] text-white/30 uppercase tracking-widest max-w-[120px] mx-auto leading-normal">{description}</p>
      </div>
    </div>
  );
}

function PlaygroundSelector({ active, onClick, title, desc }: { active: boolean, onClick: () => void, title: string, desc: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${active ? 'bg-white/[0.03] border-white/10' : 'bg-transparent border-transparent hover:bg-white/[0.01]'}`}
    >
      <div className="space-y-1">
        <div className={`text-xs font-mono uppercase tracking-widest ${active ? 'text-amber-400 font-bold' : 'text-white/40 group-hover:text-white/60'}`}>{title}</div>
        <div className="text-[10px] text-white/30 uppercase tracking-widest">{desc}</div>
      </div>
      <ChevronRight className={`h-4 w-4 transition-all ${active ? 'text-amber-400 translate-x-1' : 'text-white/10'}`} />
    </button>
  );
}

// Upgraded Mockup Dashboard with Interactive Tabs
function InteractiveDashboard({ mockupState, onTabChange }: { mockupState: ActivePillar, onTabChange: (pillar: ActivePillar) => void }) {
  const currentPillar = PILLARS_CONFIG[mockupState];

  return (
    <div 
      style={{ transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)" }}
      className="w-full aspect-[4/3] rounded-3xl border border-white/10 bg-[#020617] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col"
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500/40" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
          <div className="h-2 w-2 rounded-full bg-green-500/40" />
        </div>
        <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
          DocOps_Monitor: v1.0.4
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Navigation Sidebar (Interactive Tabs) */}
        <div className="col-span-4 border-r border-white/5 p-4 space-y-2 bg-[#040815]">
          <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-3 pl-2">Platform Pillars</div>
          {(Object.keys(PILLARS_CONFIG) as ActivePillar[]).map(key => {
            const isActive = mockupState === key;
            return (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isActive ? 'bg-white/5 border-white/15 text-white' : 'bg-transparent border-transparent text-white/30 hover:text-white/60 hover:bg-white/[0.01]'}`}
              >
                <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: isActive ? PILLARS_CONFIG[key].color : "rgba(255,255,255,0.15)" }} />
                <span className="text-[9px] font-mono tracking-widest truncate">{key}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Panel */}
        <div className="col-span-8 p-6 flex flex-col gap-4 overflow-y-auto bg-[#020617]">
          {/* Header Info */}
          <div className="flex items-center justify-between">
            <div className={`px-2 py-0.5 rounded text-[8px] font-mono border ${currentPillar.badgeColor}`}>
              {currentPillar.badge}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: currentPillar.color }} />
              <span className="text-[9px] font-mono text-white/30 uppercase">Node Sync: OK</span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase text-white tracking-wide">{currentPillar.title}</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-wider leading-relaxed">{currentPillar.description}</p>
          </div>

          {/* System Terminal Simulator */}
          <div className="flex-1 rounded-xl border border-white/5 bg-[#030712] p-4 font-mono text-[9px] text-white/30 space-y-2 select-none">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="text-[8px] text-white/10 uppercase">System Logs</span>
              <span className="text-[8px] text-white/10 uppercase">Type: Interactive</span>
            </div>
            
            <div className="space-y-1">
              {currentPillar.logs.map((log, idx) => {
                let logColor = "text-white/20";
                if (log.includes("[SUCCESS]")) logColor = "text-green-400/80 font-bold";
                if (log.includes("[WARN]")) logColor = "text-red-400/80 font-bold";
                if (log.includes("[GEN]") || log.includes("[VAL]")) logColor = "text-cyan-400/80";
                return (
                  <div key={idx} className={`${logColor} tracking-wide leading-normal`}>
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
