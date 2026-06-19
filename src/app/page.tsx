"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  GitBranch, FileCode, RefreshCcw, Play, Cpu, 
  ChevronDown, ChevronRight, ArrowRight, Sparkles, 
  Check, XCircle, ExternalLink, Layers
} from "lucide-react";
import Link from "next/link";

// Type definitions for interactive pillars
type PillarKey = "CONNECT" | "GENERATE" | "MAINTAIN" | "VALIDATE" | "AGENT";

interface PillarData {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  heightClass: string; // Controls responsive min-height bounds
  status: string;
  color: string;
  glowClass: string;
  features: string[];
}

const PILLARS: Record<PillarKey, PillarData> = {
  CONNECT: {
    id: "01",
    title: "Repo Connect",
    shortDesc: "Connect GitHub/GitLab. Scan dependencies and signature trees.",
    longDesc: "Establish a secure hook connection to codebases, monitoring push events and scanning AST branch configurations in real time.",
    icon: <GitBranch className="h-4 w-4" />,
    heightClass: "lg:min-h-[380px] h-auto",
    status: "Sync Daemon Active",
    color: "#FF3300",
    glowClass: "from-[#FF3300]/20 via-[#FF3300]/5 to-transparent",
    features: [
      "Secure webhook integrations",
      "Real-time branch commit listeners",
      "AST signature mapping",
      "Automated repository handshake"
    ]
  },
  GENERATE: {
    id: "02",
    title: "Auto Generate",
    shortDesc: "Map AST configurations and translate code into MDX documents.",
    longDesc: "Direct parsing translates export signatures, parameter types, and endpoint structures into rich Markdown and MDX documents instantly.",
    icon: <FileCode className="h-4 w-4" />,
    heightClass: "lg:min-h-[340px] h-auto",
    status: "AST Engine Active",
    color: "#22d3ee",
    glowClass: "from-[#22d3ee]/20 via-[#22d3ee]/5 to-transparent",
    features: [
      "Zero-config AST parsing",
      "Direct code signature extraction",
      "Flexible MDX layouts",
      "Fully interactive API catalogs"
    ]
  },
  MAINTAIN: {
    id: "03",
    title: "Continuous Sync",
    shortDesc: "Compare AST delta changes and resolve document drift automatically.",
    longDesc: "Detect modification diffs in signatures, generate alignment commits, and automatically trigger pull requests to resolve drift.",
    icon: <RefreshCcw className="h-4 w-4" />,
    heightClass: "lg:min-h-[360px] h-auto",
    status: "Drift Monitor On",
    color: "#F59E0B",
    glowClass: "from-[#F59E0B]/20 via-[#F59E0B]/5 to-transparent",
    features: [
      "Real-time signature drift flags",
      "Automated PR generation",
      "Divergence delta analysis",
      "Parity notifications"
    ]
  },
  VALIDATE: {
    id: "04",
    title: "Sandbox Verify",
    shortDesc: "Run and test embedded documentation code examples in isolation.",
    longDesc: "Execute and test raw embedded script blocks inside safe, isolated node micro-sandboxes, flagging compile errors before deployment.",
    icon: <Play className="h-4 w-4" />,
    heightClass: "lg:min-h-[400px] h-auto",
    status: "Sandbox Secure",
    color: "#10b981",
    glowClass: "from-[#10b981]/20 via-[#10b981]/5 to-transparent",
    features: [
      "Isolated micro-node sandboxes",
      "Embedded code snippet execution",
      "Response parameter verification",
      "Pre-deployment failure flags"
    ]
  },
  AGENT: {
    id: "05",
    title: "Agent Discovery",
    shortDesc: "Generate llms.txt, MCP servers, and semantic embeddings.",
    longDesc: "Prepare code structures for Cursor, Claude Code, and Copilot by outputting machine-readable indices and tool context spaces.",
    icon: <Cpu className="h-4 w-4" />,
    heightClass: "lg:min-h-[440px] h-auto",
    status: "Agent Ready",
    color: "#8b5cf6",
    glowClass: "from-[#8b5cf6]/20 via-[#8b5cf6]/5 to-transparent",
    features: [
      "Standard llms.txt indexes",
      "Model Context Protocol maps",
      "Semantic vector integrations",
      "Discovery-ready structures"
    ]
  }
};

// Inline SVG Brand Logo from Image 3
const BrandLogo = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <mask id="navLogoMask">
        <rect width="100" height="100" fill="white" />
        {/* Tilted inner rounded square cutout */}
        <rect 
          x="28" y="28" width="44" height="44" rx="12" 
          fill="black" 
          transform="rotate(15 50 50)" 
        />
      </mask>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3300" />
        <stop offset="100%" stopColor="#FF1800" />
      </linearGradient>
    </defs>
    {/* Outer rounded square */}
    <rect 
      x="12" y="12" width="76" height="76" rx="22" 
      fill="url(#logoGrad)" 
      mask="url(#navLogoMask)" 
    />
  </svg>
);


// Vertical strides with a downward sliding glowing fire wave background in neon red-orange
const HeroStridesBackground = () => {
  const stridesCount = 10;
  
  const getGlowStyle = (index: number) => {
    const distFromCenter = Math.abs(index - 4.5);
    const t = distFromCenter / 4.5;
    const heightFactor = t * t;
    
    // Parabolic height alignment: dips down in the middle, rises at the edges
    const bottomOffset = 5 + heightFactor * 55;
    const glowHeight = 160 + heightFactor * 160; 
    const opacity = 0.22 + heightFactor * 0.38;

    return {
      bottom: `${bottomOffset}%`,
      height: `${glowHeight}px`,
      opacity: opacity,
    };
  };

  return (
    <div className="absolute inset-0 w-full left-0 right-0 h-full flex justify-between pointer-events-none z-0 overflow-hidden">
      
      {/* Radial black gradient filters at left/right edges to fade out borders and prevent conspicuous lines */}
      <div className="absolute left-0 top-0 bottom-0 w-56 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-56 bg-gradient-to-l from-black via-black/85 to-transparent z-10" />
      
      {Array.from({ length: stridesCount }).map((_, idx) => {
        const glowStyle = getGlowStyle(idx);
        return (
          <div 
            key={idx} 
            className="relative flex-1 h-full border-r border-white/[0.03] flex flex-col justify-end"
          >
            {/* Pulsing glow block inside the stride boundary */}
            <motion.div 
              animate={{ 
                opacity: [glowStyle.opacity, glowStyle.opacity * 1.3, glowStyle.opacity],
                y: [0, -12, 0]
              }}
              transition={{ 
                duration: 5 + (idx % 4), 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: idx * 0.15
              }}
              className="absolute left-[1px] right-[1px] bg-gradient-to-t from-[#FF3300] via-[#FF5500] to-transparent rounded-full blur-[45px]"
              style={{
                bottom: glowStyle.bottom,
                height: glowStyle.height,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const GitHubIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const CursorIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg">
    <title>Cursor</title>
    <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"/>
  </svg>
);

const ASTParserIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <title>AST Parser</title>
    <circle cx="12" cy="5" r="2.5" fill="currentColor" />
    <circle cx="6" cy="19" r="2.5" fill="currentColor" />
    <circle cx="18" cy="19" r="2.5" fill="currentColor" />
    <path d="M12 7.5v4c0 1 1 2 2 2h2m-6 0H8c-1 0-2-1-2-2v-4" />
    <path d="M12 11.5v5" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" strokeWidth="0" />
  </svg>
);

const ClaudeIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
    <title>Claude</title>
    <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"/>
  </svg>
);

const ChatGPTIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
    <title>ChatGPT</title>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const VercelIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
    <title>Vercel</title>
    <path d="M12 0l12 20.785H0L12 0z"/>
  </svg>
);

const CopilotIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
    <title>Copilot</title>
    <path d="M9 23l.073-.001a2.53 2.53 0 01-2.347-1.838l-.697-2.433a2.529 2.529 0 00-2.426-1.839h-.497l-.104-.002c-4.485 0-2.935-5.278-1.75-9.225l.162-.525C2.412 3.99 3.883 1 6.25 1h8.86c1.12 0 2.106.745 2.422 1.829l.715 2.453a2.53 2.53 0 002.247 1.823l.147.005.534.001c3.557.115 3.088 3.745 2.156 7.206l-.113.413c-.154.548-.315 1.089-.47 1.607l-.163.525C21.588 20.01 20.116 23 17.75 23h-8.75zm8.22-15.89l-3.856.001a2.526 2.526 0 00-2.35 1.615L9.21 15.04a2.529 2.529 0 01-2.43 1.847l3.853.002c1.056 0 1.992-.661 2.361-1.644l1.796-6.287a2.529 2.529 0 012.43-1.848z"/>
  </svg>
);

const MCPIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg">
    <title>Model Context Protocol</title>
    <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z"/>
    <path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z"/>
  </svg>
);

const LlmsTxtIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <title>llms.txt</title>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const EmbeddingsIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <title>Vector Embeddings</title>
    <line x1="4" y1="20" x2="4" y2="4" />
    <line x1="4" y1="20" x2="20" y2="20" />
    <line x1="4" y1="20" x2="16" y2="8" strokeDasharray="3 3" />
    <circle cx="16" cy="8" r="2.5" fill="currentColor" />
    <circle cx="10" cy="14" r="1.5" fill="currentColor" strokeWidth="0" />
    <circle cx="18" cy="16" r="1.5" fill="currentColor" strokeWidth="0" />
  </svg>
);

interface SpiralNode {
  id: string;
  label: string;
  type: "agent" | "tool";
  x: number;
  y: number;
  icon: React.ReactNode;
  color: string;
  desc: string;
}

const SPIRAL_NODES_DATA = [
  {
    id: "llmstxt",
    label: "llms.txt",
    type: "tool" as const,
    t: 0.35,
    icon: <LlmsTxtIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#fb7185]" />,
    color: "#fb7185",
    desc: "Synthesizes prompt-optimized markdown files in the project root."
  },
  {
    id: "github",
    label: "GitHub",
    type: "tool" as const,
    t: 0.417,
    icon: <GitHubIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
    color: "#ffffff",
    desc: "Syncs codebase branch updates and AST divergence hooks."
  },
  {
    id: "cursor",
    label: "Cursor",
    type: "agent" as const,
    t: 0.483,
    icon: <CursorIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#38bdf8]" />,
    color: "#38bdf8",
    desc: "Injects live context maps directly into agent prompt scopes."
  },
  {
    id: "scanner",
    label: "AST Parser",
    type: "tool" as const,
    t: 0.55,
    icon: <ASTParserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#f59e0b]" />,
    color: "#f59e0b",
    desc: "Evaluates TypeScript structures and export schemas."
  },
  {
    id: "claude",
    label: "Claude Code",
    type: "agent" as const,
    t: 0.617,
    icon: <ClaudeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#e05c38]" />,
    color: "#e05c38",
    desc: "Feeds structured codebase representations for deep synthesis."
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    type: "agent" as const,
    t: 0.683,
    icon: <ChatGPTIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#10a37f]" />,
    color: "#10a37f",
    desc: "Converses and generates documentation updates using model intelligence."
  },
  {
    id: "vercel",
    label: "Vercel CDN",
    type: "tool" as const,
    t: 0.75,
    icon: <VercelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
    color: "#ffffff",
    desc: "Prerenders and deploys agent-ready doc pages to the Edge."
  },
  {
    id: "copilot",
    label: "Copilot",
    type: "agent" as const,
    t: 0.817,
    icon: <CopilotIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#6366f1]" />,
    color: "#6366f1",
    desc: "Streams AST divergence references directly into autocomplete caches."
  },
  {
    id: "mcp",
    label: "MCP Server",
    type: "tool" as const,
    t: 0.883,
    icon: <MCPIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#c084fc]" />,
    color: "#c084fc",
    desc: "Provides model tools to let coding agents query documentation."
  },
  {
    id: "embeddings",
    label: "Embeddings",
    type: "tool" as const,
    t: 0.95,
    icon: <EmbeddingsIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF3300]" />,
    color: "#FF3300",
    desc: "Generates vector indices for semantic documentation search."
  }
];

const LOOPS = 3.2;

const SPIRAL_NODES: SpiralNode[] = SPIRAL_NODES_DATA.map(node => {
  const angle = node.t * LOOPS * 2 * Math.PI;
  const r = node.t * 47; // Winding radius up to 47%
  const x = 50 + r * Math.cos(angle - Math.PI / 2);
  const y = 50 + r * Math.sin(angle - Math.PI / 2);
  return {
    id: node.id,
    label: node.label,
    type: node.type,
    x: parseFloat(x.toFixed(2)),
    y: parseFloat(y.toFixed(2)),
    icon: node.icon,
    color: node.color,
    desc: node.desc
  };
});

const generateSpiralPath = () => {
  let path = "M 50 50";
  const numPoints = 200;
  for (let i = 1; i <= numPoints; i++) {
    const t = i / numPoints;
    const angle = t * LOOPS * 2 * Math.PI;
    const r = t * 47; // Winding radius up to 47%
    const x = 50 + r * Math.cos(angle - Math.PI / 2);
    const y = 50 + r * Math.sin(angle - Math.PI / 2);
    path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return path;
};

export default function SystemRedesignWaitlist() {
  const [step, setStep] = useState<"IDLE" | "SUCCESS">("IDLE");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // UI Interactive States
  const [activePillar, setActivePillar] = useState<PillarKey>("CONNECT");
  const [activeDropdown, setActiveDropdown] = useState<"TOOLS" | "PRODUCTS" | null>(null);
  const [playgroundTab, setPlaygroundTab] = useState<"llms" | "mcp" | "embeddings">("llms");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Derive the active node from hover or active playground tab
  const activeNodeId = hoveredNode || (
    playgroundTab === "llms" ? "llmstxt" :
    playgroundTab === "mcp" ? "mcp" :
    "embeddings"
  );
  
  const activeNodeData = SPIRAL_NODES.find(n => n.id === activeNodeId);


  // Click outside listener to close navigation dropdowns
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="relative min-h-screen bg-black text-[#F1F5F9] font-sans selection:bg-[#FF3300]/30 overflow-x-hidden">
      
      {/* Background Grids and Perspective Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black to-black pointer-events-none" />
      
      {/* Visual Perspective Lines from Hand-drawn Sketch */}
      <svg className="absolute top-0 left-0 w-full h-[80%] stroke-white/[0.02] stroke-[1] fill-none pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="15%" x2="50%" y2="45%" />
        <line x1="100%" y1="15%" x2="50%" y2="45%" />
        <line x1="50%" y1="45%" x2="50%" y2="95%" />
        <line x1="10%" y1="100%" x2="45%" y2="55%" />
        <line x1="90%" y1="100%" x2="55%" y2="55%" />
      </svg>

      {/* Decorative Glow Highlights */}
      <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] bg-[#FF3300]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[50%] h-[50%] bg-[#FF3300]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-[#8b5cf6]/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Sticky Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/75 backdrop-blur-xl px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-10 md:gap-14">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer z-50">
              <BrandLogo className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
              <span className="text-sm font-black tracking-widest uppercase text-white font-sans">
                Glint<span className="text-white/30">base</span>
              </span>
            </Link>

            {/* Navigation Links with Popover Dropdowns */}
            <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-white/50 relative">
              <Link href="/" className="hover:text-white transition-colors text-white">Home</Link>
              
              {/* Tools Dropdown */}
              <div className="relative py-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "TOOLS" ? null : "TOOLS");
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Tools <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'TOOLS' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "TOOLS" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-9 left-1/2 -translate-x-1/2 w-56 p-3 rounded-xl bg-black/95 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 space-y-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href="https://scan.glintbase.xyz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/5 group transition-all"
                      >
                        <Sparkles className="h-4.5 w-4.5 text-amber-400 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                            Scanner <ExternalLink className="h-3 w-3 opacity-45" />
                          </div>
                          <p className="text-[10px] text-white/40 leading-normal mt-0.5">Audit files for AI compatibility.</p>
                        </div>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Dropdown */}
              <div className="relative py-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === "PRODUCTS" ? null : "PRODUCTS");
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Products <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'PRODUCTS' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "PRODUCTS" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-9 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-black/95 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 space-y-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/5 group transition-all cursor-pointer">
                        <RefreshCcw className="h-4.5 w-4.5 text-[#FF3300] mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider">Drift Sync</div>
                          <p className="text-[10px] text-white/40 leading-normal mt-0.5">Automated PR alignment & drift correction.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/5 group transition-all cursor-pointer">
                        <Layers className="h-4.5 w-4.5 text-cyan-400 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-white uppercase tracking-wider">DocOps Platform</div>
                          <p className="text-[10px] text-white/40 leading-normal mt-0.5">Deploy documentation sites directly to Edge CDN.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/blog" className="hover:text-white transition-colors">Journal</Link>
            </div>
          </div>

          {/* Action CTA Header Button */}
          <div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-white/90 text-black px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Join Beta
            </button>
          </div>
        </div>
      </nav>

      {/* Main Landing Wrapper */}
      <main className="relative pt-20 pb-16 z-10 flex flex-col items-center">
        
        {/* HERO SECTION - Realigned and scaled up to fit the screen frame beautifully */}
        <section className="px-4 sm:px-6 w-full max-w-7xl flex flex-col items-center text-center mt-4 mb-20 relative py-10 overflow-hidden min-h-[500px] justify-center">
          
          {/* Vertical strides with a downward sliding glowing fire wave background in neon red-orange */}
          <HeroStridesBackground />

          <div className="space-y-8 relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center py-4">
            {/* Sub Header Badge */}
            <a 
              href="https://scan.glintbase.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-[#FF3300]/30 bg-[#FF3300]/5 text-[10px] font-sans text-[#FF3300] uppercase tracking-widest hover:bg-[#FF3300]/10 transition-all cursor-pointer font-bold shadow-[0_0_15px_rgba(255,51,0,0.05)]"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Empower AI Coding Agents &rarr;
            </a>

            {/* Title - "Documentation Infrastructure for the Agentic Era" (Scaled Up) */}
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[1.05] font-sans max-w-5xl text-white">
              Documentation <br className="hidden sm:inline" />
              Infrastructure for <br className="hidden sm:inline" />
              the <span className="bg-gradient-to-r from-[#FF3300] via-[#FF5500] to-amber-400 bg-clip-text text-transparent italic">Agentic Era</span>
            </h1>

            {/* Description (Scaled Up) */}
            <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-3xl leading-relaxed font-sans">
              Automatically generate, maintain, validate, and deploy documentation assets optimized for both human engineers and AI systems like Cursor, Claude Code, and Copilot.
            </p>

            {/* Side-by-Side Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4.5 pt-6 w-full max-w-xs sm:max-w-md">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#FF3300] to-[#FF5500] text-white px-9 py-4 rounded-full font-black text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_30px_rgba(255,51,0,0.35)] active:scale-98"
              >
                Join Waitlist
              </button>
              <a 
                href="https://scan.glintbase.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white px-9 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all"
              >
                Scan Docs Free &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-b from-black via-[#04060d] to-black border-y border-white/[0.02]">
          {/* Faint subtle grid pattern specific to this section */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-30" />
          
          {/* Subtle radial glow in the center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF3300]/3 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-12">
            
            {/* Section Header */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-[#FF3300]/80 uppercase tracking-[0.4em] font-mono">
                OUR MISSION
              </span>
              {/* Primary Statement */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-2xl mx-auto pt-2">
                Making software understandable to humans and AI.
              </h2>
            </div>

            {/* Supporting Narrative */}
            <div className="space-y-6 text-sm sm:text-base text-white/50 leading-relaxed max-w-2xl mx-auto font-sans font-medium">
              <p>
                For decades, software was built to be understood by humans. Documentation, SDKs, onboarding guides, and references existed solely to help people learn and operate products.
              </p>
              <p>
                Today, AI systems are becoming active participants in software workflows. Cursor, Claude Code, GitHub Copilot, and autonomous agents increasingly rely on documentation and operational knowledge to understand and operate products.
              </p>
              <p>
                Most software was never designed for this reality. <span className="text-white font-semibold">Glintbase exists to bridge that gap.</span>
              </p>
            </div>

            {/* Simple Animated Conceptual Diagram */}
            <div className="w-full max-w-lg py-4 flex justify-center">
              {/* Elegant SVG Diagram */}
              <div className="relative w-full max-w-[360px] aspect-[4/3] rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden shadow-inner flex items-center justify-center">
                
                {/* SVG Connection Paths */}
                <svg viewBox="0 0 360 270" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                  {/* Connection lines */}
                  <path d="M 180 210 L 180 120" stroke="url(#lineGrad1)" strokeWidth="1.5" />
                  <path d="M 180 100 L 80 60" stroke="url(#lineGrad2)" strokeWidth="1.5" />
                  <path d="M 180 100 L 280 60" stroke="url(#lineGrad3)" strokeWidth="1.5" />

                  {/* Animated Glowing Dots */}
                  <circle r="3.5" fill="#FF5500">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M 180 210 L 180 120" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  </circle>
                  <circle r="3.5" fill="#FF8800">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M 180 100 L 80 60" keyPoints="0;1" keyTimes="0;1" calcMode="linear" begin="1.5s" />
                  </circle>
                  <circle r="3.5" fill="#8B5CF6">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M 180 100 L 280 60" keyPoints="0;1" keyTimes="0;1" calcMode="linear" begin="1.5s" />
                  </circle>
                  
                  <defs>
                    <linearGradient id="lineGrad1" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#FF3300" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#FF5500" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="lineGrad2" x1="1" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#FF5500" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFaa00" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="lineGrad3" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FF5500" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Absolute Labels */}
                {/* Humans */}
                <div 
                  className="absolute left-[20%] sm:left-[22.2%] top-[22.2%] -translate-x-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/90 font-mono shadow-md backdrop-blur-sm"
                >
                  Humans
                </div>

                {/* AI Agents */}
                <div 
                  className="absolute left-[80%] sm:left-[77.8%] top-[22.2%] -translate-x-1/2 -translate-y-1/2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/90 font-mono shadow-md backdrop-blur-sm"
                >
                  AI Agents
                </div>

                {/* Understanding */}
                <div 
                  className="absolute left-1/2 top-[40.7%] -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4.5 py-1.5 sm:py-2.5 rounded-xl border border-[#FF3300]/20 bg-[#FF3300]/5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#FF3300] shadow-[0_0_20px_rgba(255,51,0,0.1)] backdrop-blur-sm"
                >
                  Understanding
                </div>

                {/* Glintbase */}
                <div 
                  className="absolute left-1/2 top-[77.8%] -translate-x-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl border border-white/10 bg-black flex items-center gap-1.5 sm:gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
                >
                  <BrandLogo className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-white font-mono">Glintbase</span>
                </div>

              </div>
            </div>

            {/* Transition Statement */}
            <p className="text-xs sm:text-sm text-white/40 max-w-xl mx-auto italic font-sans leading-relaxed pt-8 border-t border-white/5 w-full">
              To make that possible, Glintbase continuously transforms code changes into operational knowledge, documentation, and AI-readable understanding.
            </p>

          </div>
        </section>

        {/* INTERACTIVE PIPELINE WAVE COLUMNS (THE WAVE PATTERN) */}
        <section className="w-full max-w-7xl px-6 relative mt-6 flex flex-col items-center">
          
          {/* Section Heading */}
          <div className="text-center space-y-2.5 mb-16">
            <span className="text-[10px] font-bold text-[#FF3300] uppercase tracking-[0.4em]">Pipeline</span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">The Self-Healing Documentation Sync</h2>
          </div>

          {/* The Wave Column Container */}
          <div className="w-full relative">
            {/* Grid of Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-20 items-end">
              {(Object.keys(PILLARS) as PillarKey[]).map(key => {
                const pillar = PILLARS[key];
                const isActive = activePillar === key;
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setActivePillar(key)}
                    onClick={() => setActivePillar(key)}
                    className={`relative rounded-2xl border transition-all duration-500 flex flex-col justify-between group p-6 cursor-pointer ${pillar.heightClass} ${isActive ? 'bg-[#060913] border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)]' : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10'}`}
                  >
                    {/* Glowing status dot at the top center of each column */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                      <div 
                        className="h-3.5 w-3.5 rounded-full border-[3.5px] border-black transition-all duration-300"
                        style={{ 
                          backgroundColor: pillar.color,
                          boxShadow: isActive ? `0 0 16px 4px ${pillar.color}` : `0 0 8px 1px ${pillar.color}40`
                        }}
                      />
                    </div>

                    {/* Glowing vertical aura backdrop rising from the bottom */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${pillar.glowClass} opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />

                    {/* Content */}
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/30 font-bold">{pillar.id}</span>
                        <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          {pillar.icon}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xs font-black uppercase text-white tracking-wider">{pillar.title}</h3>
                        <p className="text-[10px] text-white/40 leading-relaxed tracking-wide uppercase">{pillar.shortDesc}</p>
                      </div>
                    </div>

                    {/* Bottom Status & Small Accent */}
                    <div className="pt-8 mt-auto border-t border-white/5 relative z-10 flex items-center justify-between">
                      <span className="text-[8px] font-sans font-semibold text-white/30 uppercase tracking-widest">{pillar.status}</span>
                      <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-white/15'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Showcase Panel replacing the old Command Line Terminal logs */}
          <div className="w-full max-w-5xl mt-10 rounded-2xl border border-white/10 bg-[#02040b]/90 backdrop-blur-2xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-30 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <span 
                  className="px-2.5 py-1 rounded text-[10px] font-bold tracking-widest uppercase border font-sans"
                  style={{ 
                    color: PILLARS[activePillar].color, 
                    borderColor: `${PILLARS[activePillar].color}30`,
                    backgroundColor: `${PILLARS[activePillar].color}08`
                  }}
                >
                  {PILLARS[activePillar].status}
                </span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white font-sans">
                {PILLARS[activePillar].title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-sans">
                {PILLARS[activePillar].longDesc}
              </p>
              
              {/* Checklists describing features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {PILLARS[activePillar].features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/70">
                    <Check className="h-4 w-4 shrink-0" style={{ color: PILLARS[activePillar].color }} />
                    <span className="font-sans font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Mini Graphic Layout */}
            <div className="w-full md:w-80 h-48 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3300]/5 to-transparent pointer-events-none" />
              {activePillar === "CONNECT" && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <GitBranch className="h-10 w-10 text-[#FF3300] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">Secure Handshake Sync</span>
                </div>
              )}
              {activePillar === "GENERATE" && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <FileCode className="h-10 w-10 text-cyan-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">AST Translation Engine</span>
                </div>
              )}
              {activePillar === "MAINTAIN" && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <RefreshCcw className="h-10 w-10 text-amber-500 animate-spin-slow" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">Parity Drift Correction</span>
                </div>
              )}
              {activePillar === "VALIDATE" && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <Play className="h-10 w-10 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">Secure Sandbox Host</span>
                </div>
              )}
              {activePillar === "AGENT" && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <Cpu className="h-10 w-10 text-violet-400 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 font-sans">Agentic Discovery Output</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* INTERACTIVE AGENT INTEGRATION PLAYGROUND */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold text-[#FF3300] uppercase tracking-[0.4em]">Metadata</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">AI Asset Outputs</h2>
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
              Glintbase automatically formats discovery assets directly in your root folder so that coding engines can parse and write against your API without stalling.
            </p>
            
            <div className="space-y-3 pt-2">
              <button 
                onClick={() => setPlaygroundTab("llms")}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${playgroundTab === "llms" ? 'bg-white/[0.03] border-white/15' : 'bg-transparent border-transparent hover:bg-white/[0.01]'}`}
              >
                <div className="space-y-0.5">
                  <div className={`text-xs font-semibold uppercase tracking-wider ${playgroundTab === 'llms' ? 'text-amber-400 font-bold' : 'text-white/40'}`}>llms.txt</div>
                  <p className="text-[9px] text-white/30 uppercase">Structured documentation index for LLMs</p>
                </div>
                <ChevronRight className={`h-4 w-4 transition-all ${playgroundTab === 'llms' ? 'text-amber-400 translate-x-1' : 'text-white/10'}`} />
              </button>

              <button 
                onClick={() => setPlaygroundTab("mcp")}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${playgroundTab === "mcp" ? 'bg-white/[0.03] border-white/15' : 'bg-transparent border-transparent hover:bg-white/[0.01]'}`}
              >
                <div className="space-y-0.5">
                  <div className={`text-xs font-semibold uppercase tracking-wider ${playgroundTab === 'mcp' ? 'text-amber-400 font-bold' : 'text-white/40'}`}>mcp.json</div>
                  <p className="text-[9px] text-white/30 uppercase">Model Context Protocol config for tool discovery</p>
                </div>
                <ChevronRight className={`h-4 w-4 transition-all ${playgroundTab === 'mcp' ? 'text-amber-400 translate-x-1' : 'text-white/10'}`} />
              </button>

              <button 
                onClick={() => setPlaygroundTab("embeddings")}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${playgroundTab === "embeddings" ? 'bg-white/[0.03] border-white/15' : 'bg-transparent border-transparent hover:bg-white/[0.01]'}`}
              >
                <div className="space-y-0.5">
                  <div className={`text-xs font-semibold uppercase tracking-wider ${playgroundTab === 'embeddings' ? 'text-amber-400 font-bold' : 'text-white/40'}`}>Embeddings</div>
                  <p className="text-[9px] text-white/30 uppercase">Vector database embeddings for semantic RAG</p>
                </div>
                <ChevronRight className={`h-4 w-4 transition-all ${playgroundTab === 'embeddings' ? 'text-amber-400 translate-x-1' : 'text-white/10'}`} />
              </button>
            </div>
          </div>

          {/* Visual Grid Spiral showing Glintbase connecting to coding agents and tools */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[480px] sm:h-[500px] md:h-[520px] border border-white/10 bg-[#02040b]/90 rounded-2xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col items-center justify-start pt-8">
              
              {/* Spiral & Orbit Area Container */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[260px] sm:w-[320px] md:w-[380px] aspect-square">
                
                {/* Rotating Wrapper (contains spiral paths and orbiting nodes) */}
                <div className="absolute inset-0 w-full h-full animate-orbit">
                  
                  {/* SVG Connection Paths */}
                  <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Background spiral path */}
                    <motion.path
                      d={generateSpiralPath()}
                      stroke="#FF3300"
                      strokeWidth={0.8}
                      strokeOpacity={0.15}
                      fill="none"
                    />
                    {/* Animated glowing segment moving along the spiral */}
                    <motion.path
                      d={generateSpiralPath()}
                      stroke="#FF5500"
                      strokeWidth={1.8}
                      strokeOpacity={0.8}
                      fill="none"
                      initial={{ pathLength: 0.1, pathOffset: 0 }}
                      animate={{ pathOffset: [0, 1] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                    {/* Connection rays from Center to nodes, highlighted on hover */}
                    {SPIRAL_NODES.map(node => {
                      const isHovered = activeNodeId === node.id;
                      
                      // Curved paths using quadratic Bezier curves for a spiral-like curving flow
                      const midX = (50 + node.x) / 2;
                      const midY = (50 + node.y) / 2;
                      const dx = node.x - 50;
                      const dy = node.y - 50;
                      
                      // Spiral curvature offset
                      const perpX = -dy * 0.12;
                      const perpY = dx * 0.12;
                      const ctrlX = midX + perpX;
                      const ctrlY = midY + perpY;
                      
                      const pathD = `M 50 50 Q ${ctrlX} ${ctrlY} ${node.x} ${node.y}`;
                      
                      return (
                        <g key={node.id}>
                          {/* Background path line */}
                          <motion.path
                            d={pathD}
                            stroke={isHovered ? node.color : "#FF3300"}
                            strokeWidth={isHovered ? 1.5 : 0.8}
                            strokeOpacity={isHovered ? 0.35 : 0.05}
                            fill="none"
                            transition={{ duration: 0.3 }}
                          />
                          {/* Glowing moving segment along the path */}
                          <motion.path
                            d={pathD}
                            stroke={isHovered ? node.color : "#FF5500"}
                            strokeWidth={isHovered ? 2.2 : 1.2}
                            strokeOpacity={isHovered ? 0.95 : 0.25}
                            fill="none"
                            initial={{ pathLength: 0.15, pathOffset: 0 }}
                            animate={{ pathOffset: [0, 1] }}
                            transition={{
                              duration: isHovered ? 1.5 : 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </g>
                      );
                    })}
                  </svg>
                  
                  {/* Orbiting Nodes positioned absolutely */}
                  {SPIRAL_NODES.map(node => {
                    const isHovered = activeNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        style={{
                          position: "absolute",
                          left: `${node.x}%`,
                          top: `${node.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        className="z-20"
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className={`h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-black/90 border flex items-center justify-center cursor-pointer transition-all duration-300 relative ${isHovered ? 'border-[var(--glow)] shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-white/10 hover:border-white/20'}`}
                          style={{
                            "--glow": node.color,
                            boxShadow: isHovered ? `0 0 15px ${node.color}35` : 'none',
                          } as React.CSSProperties}
                        >
                          {/* Inner icon with counter-rotation animation to stay upright */}
                          <div className="animate-counter-orbit flex items-center justify-center w-full h-full">
                            {node.icon}
                          </div>
                          
                          {/* Status Active Indicator Dot */}
                          <div 
                            className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-black transition-all duration-300"
                            style={{ 
                              backgroundColor: node.color,
                              boxShadow: isHovered ? `0 0 8px ${node.color}` : 'none'
                            }}
                          />
                        </motion.div>
                      </div>
                    );
                  })}

                </div>

                {/* Center Hub: Glintbase (placed outside the rotating wrapper to stay static and upright) */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                >
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center select-none">
                    <div className="absolute inset-0 bg-[#FF3300]/30 rounded-2xl blur-md animate-pulse" />
                    <div className="absolute inset-0 bg-[#FF3300]/10 border border-[#FF3300]/30 rounded-2xl animate-ping" style={{ animationDuration: '3s' }} />
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-black rounded-xl border-2 border-[#FF3300] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,51,0,0.5)]">
                      <BrandLogo className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Node Status detail overlay at the bottom */}
              <div className="absolute bottom-4 left-4 right-4 h-20 sm:h-16 bg-black/90 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3.5 backdrop-blur-xl z-30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                {activeNodeData ? (
                  <>
                    <div 
                      className="h-8.5 w-8.5 rounded-lg border flex items-center justify-center shrink-0 transition-colors duration-300"
                      style={{ borderColor: `${activeNodeData.color}30`, backgroundColor: `${activeNodeData.color}08` }}
                    >
                      {activeNodeData.icon}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1.5 flex-wrap">
                        {activeNodeData.label} 
                        <span 
                          className="text-[7.5px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-widest"
                          style={{ color: activeNodeData.color, backgroundColor: `${activeNodeData.color}15` }}
                        >
                          {activeNodeData.type}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-white/50 leading-tight font-sans truncate sm:whitespace-normal">{activeNodeData.desc}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-white/30 text-[9.5px] font-mono select-none">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/25 animate-pulse" />
                    Hover over any node in the grid to trace connectivity...
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* REGISTRATION MODAL OVERLAY - Clean SaaS Design */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-md bg-[#050914] rounded-2xl border border-white/10 p-8 shadow-[0_25px_50px_rgba(0,0,0,0.95)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors z-50"
                aria-label="Close modal"
              >
                <XCircle className="h-5.5 w-5.5" />
              </button>

              {/* Accent Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF3300] to-transparent" />

              {/* Form Title */}
              <div className="text-center space-y-2 mb-8 mt-2">
                <h3 className="text-2xl font-black uppercase text-white tracking-tight font-sans">Request Access</h3>
                <p className="text-xs text-white/40 max-w-[280px] mx-auto leading-relaxed font-sans">
                  Join the queue for the Glintbase synchronization program.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {step === "IDLE" ? (
                  <motion.form 
                    key="modal-idle-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 font-sans tracking-wide">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 px-4 py-3.5 rounded-xl text-xs text-white placeholder-white/35 focus:outline-none focus:border-[#FF3300]/50 transition-all font-sans"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#FF3300] to-[#FF5500] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,51,0,0.2)] active:scale-98"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-3.5 w-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Request Access
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>

                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-[#FF3300] bg-[#FF3300]/5 border border-[#FF3300]/20 p-3 rounded-xl font-sans font-medium text-center"
                      >
                        {errorMsg}
                      </motion.div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div 
                    key="modal-success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-5"
                  >
                    <div className="h-12 w-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold uppercase text-white tracking-wider font-sans">Spot Reserved</h3>
                      <p className="text-xs text-white/40 max-w-[280px] mx-auto leading-relaxed font-sans">
                        {"Thank you! We've saved your slot and will send an invitation email once capacity becomes available."}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setStep("IDLE");
                        setEmail("");
                      }}
                      className="text-xs font-semibold text-white/40 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-xl bg-white/[0.01]"
                    >
                      Reset Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 backdrop-blur-3xl relative z-20">
        <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">© 2026 Glintbase Protocol</div>
        <div className="flex gap-10">
          {[
            { label: "GitHub", href: "https://github.com/glintbase" },
            { label: "Journal", href: "/blog" },
            { label: "Documentation", href: "#" },
            { label: "Twitter", href: "#" }
          ].map(item => (
            <a key={item.label} href={item.href} className="text-[9px] font-mono text-white/35 hover:text-[#FF3300] uppercase tracking-widest transition-colors">{item.label}</a>
          ))}
        </div>
      </footer>

    </div>
  );
}
