import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, Moon, Plane, ArrowRight, Play, FileText, CheckCircle2, 
  BarChart, Zap, Clock, ShieldCheck, Check, Menu, X
} from 'lucide-react';

export function LandingPage({ onLogin, onSignup }: { onLogin: () => void, onSignup: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: 'BRD Generator',
      description: 'Generate comprehensive Business Requirements Documents with executive summaries, objectives, scope, stakeholders, and risk analysis.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'PRD Generator',
      description: 'Create Product Requirements Documents with product vision, personas, features, and functional requirements in seconds.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'User Story Generator',
      description: 'Produce structured user stories in the classic format: As a [role], I want [goal], so that [benefit].',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      title: 'Test Case Generator',
      description: 'Generate comprehensive test cases with clear pre-conditions, testing steps, and expected results for robust QA.',
      icon: <Check className="w-5 h-5" />
    },
    {
      title: 'Risk Analysis',
      description: 'Identify project risks, evaluate their potential impact, and develop smart mitigation strategies automatically.',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      title: 'Project Planning',
      description: 'Build project schedules, identify key milestones, and align your team around a comprehensive feature roadmap.',
      icon: <BarChart className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1121] text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 dark:bg-[#0B1121]/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="bg-[#3b82f6] text-white p-1.5 rounded-lg mr-2.5">
                <Plane className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                ProductPilot
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <button onClick={toggleTheme} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-1">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={onLogin}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={onSignup}
                className="bg-[#3b82f6] hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Get started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 dark:text-slate-200">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0B1121] border-b border-slate-200 dark:border-slate-800 pb-4 px-4 space-y-4">
            <a href="#features" className="block text-base font-medium text-slate-700 dark:text-slate-300">Features</a>
            <a href="#how-it-works" className="block text-base font-medium text-slate-700 dark:text-slate-300">How It Works</a>
            <a href="#pricing" className="block text-base font-medium text-slate-700 dark:text-slate-300">Pricing</a>
            <a href="#faq" className="block text-base font-medium text-slate-700 dark:text-slate-300">FAQ</a>
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={onLogin} className="w-full bg-[#1e293b] dark:bg-white/10 text-white dark:text-white text-base py-2.5 rounded-lg border border-transparent dark:border-white/10 font-medium font-sans text-center transition-colors">
                Log in
              </button>
              <button onClick={onSignup} className="w-full bg-[#3b82f6] text-white text-base py-2.5 rounded-lg font-medium font-sans text-center transition-colors">
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e] text-xs font-medium mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] mr-2"></div>
          AI-Powered Business Analysis Platform
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
          Turn Ideas Into<br className="hidden sm:block" />
          <span className="text-[#3b82f6]"> Complete Project Documentation</span> in Minutes
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          ProductPilot generates BRDs, PRDs, User Stories, Acceptance Criteria, Test Cases, and Risk Registers automatically. Built for Business Analysts, Product Managers, and Software Teams.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={onSignup} className="w-full sm:w-auto bg-[#3b82f6] hover:bg-blue-600 text-white font-medium px-8 py-3.5 rounded-lg flex items-center justify-center transition-colors tracking-wide">
            Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto bg-transparent border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 font-medium px-8 py-3.5 rounded-lg flex items-center justify-center transition-colors tracking-wide">
            <Play className="mr-2 w-4 h-4" /> View demo
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
          No credit card required. 14-day free trial.
        </p>

        {/* Hero Mockup */}
        <div className="w-full mt-10 md:mt-20 relative max-w-[1100px] h-[500px] md:h-auto md:aspect-[16/10] bg-[#eef2fa] dark:bg-[#1a2333] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transform md:rotate-1 md:hover:rotate-0 transition-transform duration-500">
          {/* Faux UI */}
          <div className="absolute inset-0 p-4 md:p-8 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center text-[#3b82f6]">
                 <Plane className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                 <span className="font-display font-bold text-lg md:text-xl text-slate-800 dark:text-slate-200">ProductPilot</span>
              </div>
              <div className="flex gap-4">
                <div className="hidden sm:block h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                <div className="h-2 w-12 bg-[#3b82f6] rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 md:mb-6 font-display text-left">Project Documentation</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 flex-1 min-h-0">
              {/* BRD Doc */}
              <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/50 flex flex-col text-left">
                <div className="font-semibold text-sm mb-4 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">BRD</div>
                <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full mb-2"></div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-2"></div>
                <div className="h-2 w-5/6 bg-slate-100 dark:bg-slate-800 rounded-full mb-6"></div>
                <div className="flex-1 flex items-center justify-center min-h-[100px]">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-8 border-[#3b82f6] border-t-[#22c55e] border-r-slate-200 dark:border-r-slate-700"></div>
                </div>
              </div>
              
              {/* PRD Doc */}
              <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/50 flex flex-col text-left hidden sm:flex">
                <div className="font-semibold text-sm mb-4 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">Stories</div>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-2">
                       <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center shrink-0">
                         <div className="w-2 h-2 bg-[#3b82f6] rounded-sm"></div>
                       </div>
                       <div className="flex-1 space-y-1.5 py-1">
                         <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                         <div className="h-1.5 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>

               {/* Chart Doc */}
               <div className="bg-white dark:bg-[#0f172a] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/50 flex flex-col text-left hidden md:flex">
                <div className="font-semibold text-sm mb-4 text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">Analytics</div>
                <div className="flex-1 flex items-end justify-between px-2 pt-2 h-full min-h-[100px]">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <div key={i} className="w-4 md:w-6 bg-[#3b82f6] rounded-t-sm" style={{ height: `${h}%`, opacity: 0.8 + (i*0.04) }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-[#0B1121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#3b82f6] font-medium text-sm tracking-widest uppercase block mb-3">Features</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white max-w-2xl mx-auto mb-6">
              Everything you need to document projects faster
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              From first idea to final deliverable, ProductPilot automates the repetitive documentation work so you can focus on strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-2xl p-8 hover:border-[#3b82f6]/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[#3b82f6] font-medium text-sm tracking-widest uppercase block mb-3">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
              From idea to documentation in four steps
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              No templates to fill out manually. Just describe your idea and let ProductPilot do the heavy lifting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create a Project",
                description: "Set up a new project with a name, industry, and description. ProductPilot organizes everything in one place."
              },
              {
                step: "02",
                title: "Describe Your Idea",
                description: "Paste a brief, sketch, or existing notes. Our AI understands context and requirements from any starting point."
              },
              {
                step: "03",
                title: "Generate Documentation",
                description: "Choose BRD, PRD, User Stories, Acceptance Criteria, or Test Cases. AI drafts structured documents in under 20 seconds."
              },
              {
                step: "04",
                title: "Export & Share",
                description: "Export polished PDFs or Markdown files. Share with stakeholders or drop into your existing tools and workflows."
              }
            ].map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line for desktop */}
                {i < 3 && <div className="hidden md:block absolute top-[28px] left-[60px] right-[-20px] h-[1px] bg-slate-200 dark:bg-white/10"></div>}
                <div className="text-sm font-medium text-[#3b82f6] mb-4">{step.step}</div>
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-[#1e293b]/50 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 relative z-10 text-[#3b82f6]">
                  {i === 0 ? <FileText className="w-5 h-5" /> : 
                   i === 1 ? <CheckCircle2 className="w-5 h-5" /> :
                   i === 2 ? <Zap className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 dark:bg-[#0B1121] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#3b82f6] font-medium text-sm tracking-widest uppercase block mb-3">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Built for speed and quality
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              ProductPilot helps teams ship better requirements with less manual effort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-2xl p-10 text-center flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-[#3b82f6]/10 flex items-center justify-center mb-6 text-[#3b82f6]">
                 <Clock className="w-5 h-5" />
               </div>
               <h3 className="text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">90%</h3>
               <div className="text-[#3b82f6] font-medium text-sm mb-4">Documentation time saved</div>
               <p className="text-slate-600 dark:text-slate-400 text-sm">Reduce hours of writing and formatting into minutes with AI-generated first drafts tailored to your project.</p>
            </div>
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-2xl p-10 text-center flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-[#3b82f6]/10 flex items-center justify-center mb-6 text-[#3b82f6]">
                 <CheckCircle2 className="w-5 h-5" />
               </div>
               <h3 className="text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">3x</h3>
               <div className="text-[#3b82f6] font-medium text-sm mb-4">Better requirement quality</div>
               <p className="text-slate-600 dark:text-slate-400 text-sm">Standardized structure, complete coverage, and consistent formatting improve clarity across every team.</p>
            </div>
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-2xl p-10 text-center flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-[#3b82f6]/10 flex items-center justify-center mb-6 text-[#3b82f6]">
                 <Plane className="w-5 h-5" />
               </div>
               <h3 className="text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">2x</h3>
               <div className="text-[#3b82f6] font-medium text-sm mb-4">Faster project delivery</div>
               <p className="text-slate-600 dark:text-slate-400 text-sm">Move from idea to development-ready requirements faster and reduce back-and-forth with stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <span className="text-[#3b82f6] font-medium text-sm tracking-widest uppercase block mb-3">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
              Simple pricing for every stage
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Start free and scale as your documentation needs grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Free */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold dark:text-white mb-2">Free</h3>
              <p className="text-slate-500 text-sm mb-6">For individuals exploring AI documentation.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">$0</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['3 projects', 'BRD & PRD generation', '10 AI generations per month', 'Markdown export', 'Community support'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-[#22c55e] mr-3" /> {item}
                  </li>
                ))}
              </ul>
              <button onClick={onSignup} className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Get started free
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white dark:bg-[#111827] border-2 border-[#3b82f6] rounded-3xl p-8 relative shadow-xl transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3b82f6] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most popular
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">Pro</h3>
              <p className="text-slate-500 text-sm mb-6">For professionals and small teams.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">$29</span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Unlimited projects', 'All document types', 'Unlimited AI generations', 'PDF & Markdown export', 'Document history', 'Priority support'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-[#22c55e] mr-3" /> {item}
                  </li>
                ))}
              </ul>
              <button onClick={onSignup} className="w-full py-3 rounded-lg bg-[#3b82f6] hover:bg-blue-600 text-white font-medium transition-colors">
                Start 14-day trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold dark:text-white mb-2">Enterprise</h3>
              <p className="text-slate-500 text-sm mb-6">For organizations with advanced needs.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold dark:text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Everything in Pro', 'SSO & SAML', 'Custom AI training', 'Advanced security', 'Dedicated success manager', 'SLA & audit logs'].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-5 h-5 text-[#22c55e] mr-3" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Form */}
      <section className="py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#3b82f6] rounded-[2rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                 Ready to document your next project in minutes?
               </h2>
               <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                 Join thousands of Business Analysts and Product Managers who use ProductPilot to turn ideas into structured project documentation.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button onClick={onSignup} className="bg-white text-[#3b82f6] font-medium px-8 py-3.5 rounded-lg flex items-center justify-center transition-colors">
                   Start free trial <ArrowRight className="ml-2 w-4 h-4" />
                 </button>
                 <button className="bg-blue-600 hover:bg-blue-700 border border-blue-500 text-white font-medium px-8 py-3.5 rounded-lg flex items-center justify-center transition-colors">
                   Schedule a demo
                 </button>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-[#060a14] border-t border-slate-200 dark:border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                 <div className="bg-[#3b82f6] text-white p-1 rounded-lg mr-2">
                  <Plane className="w-5 h-5" />
                 </div>
                 <span className="font-display font-bold text-xl text-slate-900 dark:text-white">ProductPilot</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                AI-powered documentation for Business Analysts, Product Managers, and Software Teams.
              </p>
              <div className="flex gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center opacity-60">
                    <div className="w-4 h-4 text-slate-500 dark:text-slate-400">#</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-6 tracking-wide">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-6 tracking-wide">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-500">
            <p>© 2026 ProductPilot. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
